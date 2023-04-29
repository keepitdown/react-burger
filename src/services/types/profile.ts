import { TProfile, TResponseBody } from "../../utils/types";
import { SET_PROFILE_DATA, SET_PROFILE_EDITED } from "../actions/profile";

type TProfileState = {
  data: TProfile | null;
  profileWasEdited: boolean;
};

type TSetProfileDataAction = {
  readonly type: typeof SET_PROFILE_DATA;
  readonly data: TProfile | null;
};

type TSetProfileEditedAction = {
  readonly type: typeof SET_PROFILE_EDITED;
  readonly status: boolean;
};

type TProfileActions =
  | TSetProfileDataAction
  | TSetProfileEditedAction;

type TProfileDataResponseBody = TResponseBody & {
  readonly user: TProfile;
};

export type { TProfileState, TSetProfileDataAction, TSetProfileEditedAction, TProfileActions, TProfileDataResponseBody };