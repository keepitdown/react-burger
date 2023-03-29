import { BASE_URL, SIGN_UP_URL, LOG_IN_URL } from "../../utils/constants";
import { checkApiResponse, getCookie, setCookie } from "../../utils/functions";
import { SET_PROFILE_DATA } from "./profile";

const SET_EXPECTING_RESPONSE = 'SET_EXPECTING_RESPONSE';
const SET_AUTH_CHECK_STATUS = 'SET_AUTH_CHECK_STATUS';
const SET_SIGNED_IN_STATUS = 'SET_SIGNED_IN_STATUS';

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
        type: SET_SIGNED_IN_STATUS,
        status: true
      });
      console.log(data)
    })
    .catch(error => console.log(error));
};

const sendLogInRequest = ({ email, password }) => dispatch => {
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
        type: SET_SIGNED_IN_STATUS,
        status: true
      });
      dispatch({
        type: SET_PROFILE_DATA,
        data: response.user
      })
      setCookie('accessToken', response.accessToken.split('Bearer ')[1], 1200);
      setCookie('refreshToken', response.refreshToken, 2592000);
      console.log(response);
      console.log(getCookie('accessToken'));
      console.log(getCookie('refreshToken'));
    })
    .catch(error => console.log(error));
};

export { SET_EXPECTING_RESPONSE, SET_AUTH_CHECK_STATUS, SET_SIGNED_IN_STATUS, sendSignUpRequest, sendLogInRequest };