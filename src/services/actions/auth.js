import { LOG_OUT_URL } from "../../utils/constants";
import { SIGN_UP_URL, LOG_IN_URL, accessToken, refreshToken, accessTokenMaxAge, refreshTokenMaxAge, REFRESH_TOKEN_URL, RESET_URL, RECOVER_URL } from "../../utils/constants";
import { request, getCookie, setCookie, removeCookie, logError } from "../../utils/functions";
import { SET_PROFILE_DATA } from "./profile";

const SET_EXPECTING_RESPONSE = 'SET_EXPECTING_RESPONSE';
const SET_AUTH_CHECK_STATUS = 'SET_AUTH_CHECK_STATUS';
const SET_LOGGED_IN_STATUS = 'SET_LOGGED_IN_STATUS';
const SET_FORM_SUBMIT_STATUS = 'SET_FORM_SUBMIT_STATUS';
const SET_FORM_FAIL_STATUS = 'SET_FORM_FAIL_STATUS';

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
  dispatch({
    type: SET_AUTH_CHECK_STATUS,
    status: false
  });
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

      dispatch({
        type: SET_AUTH_CHECK_STATUS,
        status: true
      });
      dispatch({
        type: SET_LOGGED_IN_STATUS,
        status: true
      });
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

      dispatch({
        type: SET_AUTH_CHECK_STATUS,
        status: true
      });
      dispatch({
        type: SET_LOGGED_IN_STATUS,
        status: true
      });

      dispatch({
        type: SET_PROFILE_DATA,
        data: response.user
      });
    })
    .catch(error => {
      if (error?.message === 'email or password are incorrect') {
        dispatch({
          type: SET_FORM_FAIL_STATUS,
          form: 'login',
          status: true
        });
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
      dispatch({
        type: SET_FORM_SUBMIT_STATUS,
        form: 'recover',
        status: true
      })
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
      dispatch({
        type: SET_FORM_SUBMIT_STATUS,
        form: 'reset',
        status: true
      })
    })
    .catch(error => {
      if (error?.message === 'Incorrect reset token') {
        dispatch({
          type: SET_FORM_FAIL_STATUS,
          form: 'reset',
          status: true
        });
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
      dispatch({
        type: SET_LOGGED_IN_STATUS,
        status: false
      });
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
  SET_EXPECTING_RESPONSE, SET_AUTH_CHECK_STATUS, SET_LOGGED_IN_STATUS, SET_FORM_SUBMIT_STATUS, SET_FORM_FAIL_STATUS,
  requestWithToken, sendSignUpRequest, sendLogInRequest, sendRecoverRequest, sendResetRequest,
  sendLogOurRequest
};