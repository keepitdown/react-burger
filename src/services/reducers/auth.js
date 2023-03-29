import { SET_EXPECTING_RESPONSE, SET_AUTH_CHECK_STATUS, SET_SIGNED_IN_STATUS } from "../actions/auth";

const initialState = {
  userIsSigned: false,
  expectingRespone: false,
  authIsChecked: false
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
    case SET_SIGNED_IN_STATUS:
      return {
        ...state,
        userIsSigned: action.status
      };
    default:
      return state
  };
}

export default authReducer;