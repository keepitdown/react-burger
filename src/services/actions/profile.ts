import { PROFILE_DATA_URL } from '../../utils/constants';
import { logError, requestWithToken } from '../../utils/functions';
import { setLoggedInStatus, setAuthCheckStatus } from './auth';
import { TProfileDataResponseBody, TSetProfileDataAction, TRemoveProfileDataAction, TSetProfileEditedAction } from '../types/profile';
import { AppThunk } from "../types";
import { TProfile, TProfileChanges } from '../../utils/types';

const SET_PROFILE_DATA = 'SET_PROFILE_DATA';
const REMOVE_PROFILE_DATA = 'REMOVE_PROFILE_DATA';
const SET_PROFILE_EDITED = 'SET_PROFILE_EDITED';

const setProfileData = (data: TProfile): TSetProfileDataAction => ({
  type: SET_PROFILE_DATA,
  data
});

const removeProfileData = (): TRemoveProfileDataAction => ({
  type: REMOVE_PROFILE_DATA
});

const setProfileEdited = (status: boolean): TSetProfileEditedAction => ({
  type: SET_PROFILE_EDITED,
  status
});

const getProfileData: AppThunk = () => dispatch => {
  dispatch(setLoggedInStatus(false));
  dispatch(setAuthCheckStatus(false));
  requestWithToken<TProfileDataResponseBody>(PROFILE_DATA_URL, { method: 'GET' })
    .then((response: TProfileDataResponseBody) => {
      dispatch(setProfileData(response.user));
      dispatch(setLoggedInStatus(true));
    })
    .catch(error => logError(error))
    .finally(() => {
      dispatch(setAuthCheckStatus(true));
    });
};

const editProfileData: AppThunk = (changes: TProfileChanges) => dispatch => {
  requestWithToken<TProfileDataResponseBody>(PROFILE_DATA_URL, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(changes)
  })
    .then((response: TProfileDataResponseBody) => {
      dispatch(setProfileData(response.user));
      dispatch(setProfileEdited(true));
    })
    .catch(error => logError(error));
};

export { SET_PROFILE_DATA, REMOVE_PROFILE_DATA, SET_PROFILE_EDITED, setProfileData, removeProfileData, setProfileEdited, getProfileData, editProfileData };