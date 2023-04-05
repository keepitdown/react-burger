import { SIGN_UP_URL, LOG_IN_URL, PROFILE_DATA_URL, accessToken, refreshToken, accessTokenMaxAge, refreshTokenMaxAge, REFRESH_TOKEN_URL } from "../../utils/constants";
import { request, getCookie, setCookie } from "../../utils/functions";
import { SET_PROFILE_DATA } from "./profile";

const SET_EXPECTING_RESPONSE = 'SET_EXPECTING_RESPONSE';
const SET_AUTH_CHECK_STATUS = 'SET_AUTH_CHECK_STATUS';
const SET_LOGGED_IN_STATUS = 'SET_LOGGED_IN_STATUS';

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
    .then(() => {
      dispatch({
        type: SET_AUTH_CHECK_STATUS,
        status: true
      });
      dispatch({
        type: SET_LOGGED_IN_STATUS,
        status: true
      });
    })
    .catch(error => console.log(error));
};

const sendLogInRequest = ({ email, password }) => dispatch => {
  dispatch({
    type: SET_LOGGED_IN_STATUS,
    status: false
  });
  dispatch({
    type: SET_AUTH_CHECK_STATUS,
    status: false
  });
  request(LOG_IN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(response => {
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
      })
      setCookie(accessToken, response.accessToken.split('Bearer ')[1], accessTokenMaxAge);
      setCookie(refreshToken, response.refreshToken, refreshTokenMaxAge);
    })
    .catch(error => console.log(error));
};

const getProfileData = () => dispatch => {
  dispatch({
    type: SET_AUTH_CHECK_STATUS,
    status: false
  });
  dispatch({
    type: SET_LOGGED_IN_STATUS,
    status: false
  });
  dispatch(requestWithToken(PROFILE_DATA_URL, { method: 'GET' }))
    .then(response => {
      dispatch({
        type: SET_PROFILE_DATA,
        data: response.user
      });
      dispatch({
        type: SET_LOGGED_IN_STATUS,
        status: true
      });
    })
    .catch(error =>
      console.log(`Error ${error.code}: ${error.description}\n${error.message ?? ''}`)
    )
    .finally(() => {
      dispatch({
        type: SET_AUTH_CHECK_STATUS,
        status: true
      });
    });
};

export { SET_EXPECTING_RESPONSE, SET_AUTH_CHECK_STATUS, SET_LOGGED_IN_STATUS, SET_PROFILE_DATA, sendSignUpRequest, sendLogInRequest, getProfileData };