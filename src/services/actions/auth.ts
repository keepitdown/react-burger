import { SIGN_UP_URL, LOG_IN_URL, LOG_OUT_URL, login, accessToken, refreshToken, accessTokenMaxAge, refreshTokenMaxAge, RESET_URL, RECOVER_URL, recover, reset } from "../../utils/constants";
import { request, getCookie, setCookie, removeCookie, logError } from "../../utils/functions";
import { removeProfileData, setProfileData } from "./profile";
import { TSetAuthCheckStatusAction, TSetLoggedInStatusAction, TSetFormSubmitStatusAction, TSetFormFailStatusAction, TLogInResponseBody } from '../types/auth';
import { AppThunk } from "../types";
import { TAuthData, TRecoveryForm, TResetForm, TResponseBodyWithMessage, TSignInForm } from "../../utils/types";

const SET_AUTH_CHECK_STATUS = 'SET_AUTH_CHECK_STATUS';
const SET_LOGGED_IN_STATUS = 'SET_LOGGED_IN_STATUS';
const SET_FORM_SUBMIT_STATUS = 'SET_FORM_SUBMIT_STATUS';
const SET_FORM_FAIL_STATUS = 'SET_FORM_FAIL_STATUS';

const setAuthCheckStatus = (status: boolean): TSetAuthCheckStatusAction => ({
  type: SET_AUTH_CHECK_STATUS,
  status
});

const setLoggedInStatus = (status: boolean): TSetLoggedInStatusAction => ({
  type: SET_LOGGED_IN_STATUS,
  status
});

const setFormSubmitStatus = (form: typeof recover | typeof reset, status: boolean): TSetFormSubmitStatusAction => ({
  type: SET_FORM_SUBMIT_STATUS,
  form,
  status
});

const setFormFailStatus = (form: typeof login | typeof reset, status: boolean): TSetFormFailStatusAction => ({
  type: SET_FORM_FAIL_STATUS,
  form,
  status
});

const sendSignUpRequest: AppThunk = ({ email, password, name }: TAuthData) => dispatch => {
  dispatch(setAuthCheckStatus(false));
  request<TLogInResponseBody>(SIGN_UP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password, name })
  })
    .then((response: TLogInResponseBody) => {

      setCookie(accessToken, response.accessToken.split('Bearer ')[1], accessTokenMaxAge);
      setCookie(refreshToken, response.refreshToken, refreshTokenMaxAge);

      dispatch(setAuthCheckStatus(true));
      dispatch(setLoggedInStatus(true));
      dispatch(setProfileData(response.user));
    })
    .catch(error => logError(error));
};

const sendLogInRequest: AppThunk = ({ email, password }: TSignInForm) => dispatch => {
  request<TLogInResponseBody>(LOG_IN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then((response: TLogInResponseBody) => {

      setCookie(accessToken, response.accessToken.split('Bearer ')[1], accessTokenMaxAge);
      setCookie(refreshToken, response.refreshToken, refreshTokenMaxAge);

      dispatch(setAuthCheckStatus(true));
      dispatch(setLoggedInStatus(true));

      dispatch(setProfileData(response.user));
    })
    .catch(error => {
      if (error?.message === 'email or password are incorrect') {
        dispatch(setFormFailStatus(login, true));
      }
      logError(error);
    });
};

const sendRecoverRequest: AppThunk = ({ email }: TRecoveryForm) => dispatch => {
  request<TResponseBodyWithMessage>(RECOVER_URL, {
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

const sendResetRequest: AppThunk = ({ token, password }: TResetForm) => dispatch => {
  request<TResponseBodyWithMessage>(RESET_URL, {
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

const sendLogOurRequest: AppThunk = () => dispatch => {
  const storedRefreshToken = getCookie(refreshToken);
  if (!storedRefreshToken) {
    return Promise.reject({ message: 'refresh token not found' });
  }
  return request<TResponseBodyWithMessage>(LOG_OUT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: storedRefreshToken })
  })
    .then(() => {
      dispatch(setLoggedInStatus(false));
      dispatch(removeProfileData());
      removeCookie(accessToken);
      removeCookie(refreshToken);
    })
    .catch(error => logError(error));
};

export {
  SET_AUTH_CHECK_STATUS, SET_LOGGED_IN_STATUS, SET_FORM_SUBMIT_STATUS, SET_FORM_FAIL_STATUS,
  setAuthCheckStatus, setLoggedInStatus, setFormSubmitStatus, setFormFailStatus,
  sendSignUpRequest, sendLogInRequest, sendRecoverRequest, sendResetRequest,
  sendLogOurRequest
};