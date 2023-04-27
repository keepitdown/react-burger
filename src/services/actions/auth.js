import { SIGN_UP_URL, LOG_IN_URL, LOG_OUT_URL, login, accessToken, refreshToken, accessTokenMaxAge, refreshTokenMaxAge, REFRESH_TOKEN_URL, RESET_URL, RECOVER_URL, recover, reset } from "../../utils/constants";
import { request, getCookie, setCookie, removeCookie, logError } from "../../utils/functions";
import { SET_PROFILE_DATA } from "./profile";

const SET_AUTH_CHECK_STATUS = 'SET_AUTH_CHECK_STATUS';
const SET_LOGGED_IN_STATUS = 'SET_LOGGED_IN_STATUS';
const SET_FORM_SUBMIT_STATUS = 'SET_FORM_SUBMIT_STATUS';
const SET_FORM_FAIL_STATUS = 'SET_FORM_FAIL_STATUS';

const setAuthCheckStatus = (status) => ({
  type: SET_AUTH_CHECK_STATUS,
  status
});

const setLoggedInStatus = (status) => ({
  type: SET_LOGGED_IN_STATUS,
  status
});

const setFormSubmitStatus = (form, status) => ({
  type: SET_FORM_SUBMIT_STATUS,
  form,
  status
});

const setFormFailStatus = (form, status) => ({
  type: SET_FORM_FAIL_STATUS,
  form,
  status
});

const requestWithToken = (urlPath, options) => dispatch => {
  const retryFetch = () => dispatch(requestWithToken(urlPath, options));
  const storedAccessToken = getCookie(accessToken);
  if (!storedAccessToken) {
    return dispatch(updateTokens(retryFetch)).then(retryFetch);
  }

  return request(urlPath, {
    ...options,
    headers: {
      ...options.headers,
      authorization: `Bearer ${storedAccessToken}`
    }
  })
    .catch(error => {
      if (error.message === 'jwt expired') {
        return dispatch((updateTokens(retryFetch))).then(retryFetch);
      } else {
        return Promise.reject(error);
      }
    });
};

const updateTokens = () => () => {
  const storedRefreshToken = getCookie(refreshToken);
  if (!storedRefreshToken) {
    return Promise.reject({ message: 'tokens not found' });
  }
  return request(REFRESH_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: storedRefreshToken })
  })
    .then(response => {
      setCookie(accessToken, response.accessToken.split('Bearer ')[1], accessTokenMaxAge);
      setCookie(refreshToken, response.refreshToken, refreshTokenMaxAge);
    });
}

const sendSignUpRequest = ({ email, password, name }) => dispatch => {
  dispatch(setAuthCheckStatus(false));
  request(SIGN_UP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password, name })
  })
    .then((response) => {

      setCookie(accessToken, response.accessToken.split('Bearer ')[1], accessTokenMaxAge);
      setCookie(refreshToken, response.refreshToken, refreshTokenMaxAge);

      dispatch(setAuthCheckStatus(true));
      dispatch(setLoggedInStatus(true));
      dispatch({
        type: SET_PROFILE_DATA,
        data: response.user
      });
    })
    .catch(error => logError(error));
};

const sendLogInRequest = ({ email, password }) => dispatch => {
  request(LOG_IN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(response => {

      setCookie(accessToken, response.accessToken.split('Bearer ')[1], accessTokenMaxAge);
      setCookie(refreshToken, response.refreshToken, refreshTokenMaxAge);

      dispatch(setAuthCheckStatus(true));
      dispatch(setLoggedInStatus(true));

      dispatch({
        type: SET_PROFILE_DATA,
        data: response.user
      });
    })
    .catch(error => {
      if (error?.message === 'email or password are incorrect') {
        dispatch(setFormFailStatus(login, true));
      }
      logError(error);
    });
};

const sendRecoverRequest = ({ email }) => dispatch => {
  request(RECOVER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  })
    .then(() => {
      dispatch(setFormSubmitStatus(recover, true));
    })
    .catch(error => logError(error));
};

const sendResetRequest = ({ token, password }) => dispatch => {
  request(RESET_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token, password })
  })
    .then(() => {
      dispatch(setFormSubmitStatus(reset, true));
    })
    .catch(error => {
      if (error?.message === 'Incorrect reset token') {
        dispatch(setFormFailStatus(reset, true));
      }
      logError(error);
    });
};

const sendLogOurRequest = () => dispatch => {
  const storedRefreshToken = getCookie(refreshToken);
  if (!storedRefreshToken) {
    return Promise.reject({ message: 'refresh token not found' });
  }
  return request(LOG_OUT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: storedRefreshToken })
  })
    .then(() => {
      dispatch(setLoggedInStatus(false));
      dispatch({
        type: SET_PROFILE_DATA,
        data: {}
      });
      removeCookie(accessToken);
      removeCookie(refreshToken);
    })
    .catch(error => logError(error));
};

export {
  SET_AUTH_CHECK_STATUS, SET_LOGGED_IN_STATUS, SET_FORM_SUBMIT_STATUS, SET_FORM_FAIL_STATUS,
  setAuthCheckStatus, setLoggedInStatus, setFormSubmitStatus, setFormFailStatus, requestWithToken,
  sendSignUpRequest, sendLogInRequest, sendRecoverRequest, sendResetRequest,
  sendLogOurRequest
};