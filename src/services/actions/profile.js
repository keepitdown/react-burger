import { PROFILE_DATA_URL } from '../../utils/constants';
import { logError } from '../../utils/functions';
import { SET_AUTH_CHECK_STATUS, SET_LOGGED_IN_STATUS, requestWithToken } from './auth';

const SET_PROFILE_DATA = 'SET_PROFILE_DATA';
const SET_PROFILE_EDITED = 'SET_PROFILE_EDITED';

const getProfileData = () => dispatch => {
  dispatch({
    type: SET_LOGGED_IN_STATUS,
    status: false
  });
  dispatch({
    type: SET_AUTH_CHECK_STATUS,
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
    .catch(error => logError(error))
    .finally(() => {
      dispatch({
        type: SET_AUTH_CHECK_STATUS,
        status: true
      });
    });
};

const editProfileData = changes => dispatch => {
  dispatch(requestWithToken(PROFILE_DATA_URL, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(changes)
  }))
    .then(response => {
      dispatch({
        type: SET_PROFILE_DATA,
        data: response.user
      });
      dispatch({
        type: SET_PROFILE_EDITED,
        status: true
      })
    })
    .catch(error => logError(error));
};

export { SET_PROFILE_DATA, SET_PROFILE_EDITED, getProfileData, editProfileData };