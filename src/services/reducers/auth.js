import { SET_EXPECTING_RESPONSE, SET_AUTH_CHECK_STATUS, SET_LOGGED_IN_STATUS, SET_PROFILE_DATA } from "../actions/auth";

const initialState = {
  userIsLoggedIn: false,
  expectingRespone: false,
  authIsChecked: false,
  profileData: {}
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EXPECTING_RESPONSE:
      return {
        ...state,
        expectingRespone: action.status
      };
    case SET_AUTH_CHECK_STATUS:
      return {
        ...state,
        authIsChecked: action.status
      };
    case SET_LOGGED_IN_STATUS:
      return {
        ...state,
        userIsLoggedIn: action.status
      };
    default:
      return state
  };
}

export default authReducer;