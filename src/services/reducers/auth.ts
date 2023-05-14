import { SET_AUTH_CHECK_STATUS, SET_LOGGED_IN_STATUS, SET_FORM_SUBMIT_STATUS, SET_FORM_FAIL_STATUS } from "../actions/auth";
import { TAuthActions, TAuthState } from "../types/auth";

const initialState = {
  userIsLoggedIn: false,
  authIsChecked: false,
  forms: {
    login: { hasFailed: false },
    recover: { isSubmitted: false },
    reset: { isSubmitted: false, hasFailed: false }
  }
};

const authReducer = (state: TAuthState = initialState, action: TAuthActions) => {
  switch (action.type) {
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
    case SET_FORM_SUBMIT_STATUS:
      return {
        ...state,
        forms: {
          ...state.forms,
          [action.form]: {
            ...state.forms[action.form],
            isSubmitted: action.status
          }
        }
      }
    case SET_FORM_FAIL_STATUS:
      return {
        ...state,
        forms: {
          ...state.forms,
          [action.form]: {
            ...state.forms[action.form],
            hasFailed: action.status
          }
        }
      }
    default:
      return state;
  };
}

export default authReducer;
export { initialState };