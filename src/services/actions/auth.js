import { BASE_URL, SIGN_UP_URL, LOG_IN_URL, PROFILE_DATA_URL, accessToken, refreshToken, accessTokenMaxAge, refreshTokenMaxAge } from "../../utils/constants";
import { checkApiResponse, getCookie, setCookie } from "../../utils/functions";

const SET_EXPECTING_RESPONSE = 'SET_EXPECTING_RESPONSE';
const SET_AUTH_CHECK_STATUS = 'SET_AUTH_CHECK_STATUS';
const SET_LOGGED_IN_STATUS = 'SET_LOGGED_IN_STATUS';
const SET_PROFILE_DATA = 'SET_PROFILE_DATA';

const sendSignUpRequest = ({ email, password, name }) => dispatch => {
  dispatch({
    type: SET_AUTH_CHECK_STATUS,
    status: false
  });
  fetch(`${BASE_URL}${SIGN_UP_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password, name })
  })
    .then(checkApiResponse)
    .then(data => {
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
  fetch(`${BASE_URL}${LOG_IN_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(checkApiResponse)
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
    type: SET_LOGGED_IN_STATUS,
    status: false
  });
  dispatch({
    type: SET_AUTH_CHECK_STATUS,
    status: false
  });
  fetch(`${BASE_URL}${PROFILE_DATA_URL}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${getCookie(accessToken)}`
    }
  })
    .then(checkApiResponse)
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
    .catch(error => console.log(error))
    .finally(() => {
      dispatch({
        type: SET_AUTH_CHECK_STATUS,
        status: true
      });
    });
};

export { SET_EXPECTING_RESPONSE, SET_AUTH_CHECK_STATUS, SET_LOGGED_IN_STATUS, SET_PROFILE_DATA, sendSignUpRequest, sendLogInRequest, getProfileData };