import { login, recover, reset } from "../../utils/constants";
import { TProfile, TResponseBody, TUpdateTokensResponseBody } from "../../utils/types";
import { SET_AUTH_CHECK_STATUS, SET_LOGGED_IN_STATUS, SET_FORM_SUBMIT_STATUS, SET_FORM_FAIL_STATUS } from "../actions/auth";

type TAuthState = {
  userIsLoggedIn: boolean;
  authIsChecked: boolean;
  forms: {
    login: { hasFailed: boolean };
    recover: { isSubmitted: boolean };
    reset: { isSubmitted: boolean, hasFailed: boolean };
  };
};

type TSetAuthCheckStatusAction = {
  readonly type: typeof SET_AUTH_CHECK_STATUS;
  readonly status: boolean;
};

type TSetLoggedInStatusAction = {
  readonly type: typeof SET_LOGGED_IN_STATUS;
  readonly status: boolean;
};

type TSetFormSubmitStatusAction = {
  readonly type: typeof SET_FORM_SUBMIT_STATUS;
  readonly form: typeof recover | typeof reset;
  readonly status: boolean;
};

type TSetFormFailStatusAction = {
  readonly type: typeof SET_FORM_FAIL_STATUS;
  readonly form: typeof login | typeof reset;
  readonly status: boolean;
};

type TAuthActions =
  | TSetAuthCheckStatusAction
  | TSetLoggedInStatusAction
  | TSetFormSubmitStatusAction
  | TSetFormFailStatusAction;

type TLogInResponseBody = TUpdateTokensResponseBody & {
  readonly user: TProfile;
};

export type {
  TAuthState, TSetAuthCheckStatusAction, TSetLoggedInStatusAction, TSetFormSubmitStatusAction,
  TSetFormFailStatusAction, TAuthActions, TLogInResponseBody
};