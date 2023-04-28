import { login, recover, reset } from "../../utils/constants";
import { SET_AUTH_CHECK_STATUS, SET_LOGGED_IN_STATUS, SET_FORM_SUBMIT_STATUS, SET_FORM_FAIL_STATUS } from "../actions/auth";


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

export type { TSetAuthCheckStatusAction, TSetLoggedInStatusAction, TSetFormSubmitStatusAction, TSetFormFailStatusAction, TAuthActions };