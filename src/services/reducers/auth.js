import { SET_AUTH_CHECK_STATUS, SET_LOGGED_IN_STATUS, SET_FORM_STATUS } from "../actions/auth";

const initialState = {
  userIsLoggedIn: false,
  authIsChecked: false,
  forms: {
    recover: { isSubmitted: false },
    reset: { isSubmitted: false }
  }
};

const authReducer = (state = initialState, action) => {
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
    case SET_FORM_STATUS:
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
    default:
      return state
  };
}

export default authReducer;