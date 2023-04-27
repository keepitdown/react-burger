import { PROFILE_DATA_URL } from '../../utils/constants';
import { logError } from '../../utils/functions';
import { requestWithToken, setAuthCheckStatus, setLoggedInStatus } from './auth';

const SET_PROFILE_DATA = 'SET_PROFILE_DATA';
const SET_PROFILE_EDITED = 'SET_PROFILE_EDITED';

const setProfileData = (data) => ({
  type: SET_PROFILE_DATA,
  data
});

const setProfileEdited = (status) => ({
  type: SET_PROFILE_EDITED,
  status
});

const getProfileData = () => dispatch => {
  dispatch(setLoggedInStatus(false));
  dispatch(setAuthCheckStatus(false));
  dispatch(requestWithToken(PROFILE_DATA_URL, { method: 'GET' }))
    .then(response => {
      dispatch(setProfileData(response.user));
      dispatch(setLoggedInStatus(true));
    })
    .catch(error => logError(error))
    .finally(() => {
      dispatch(setAuthCheckStatus(true));
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
      dispatch(setProfileData(response.user));
      dispatch(setProfileEdited(true));
    })
    .catch(error => logError(error));
};

export { SET_PROFILE_DATA, SET_PROFILE_EDITED, setProfileData, setProfileEdited, getProfileData, editProfileData };