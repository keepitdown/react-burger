import { TProfile, TResponseBody } from "../../utils/types";
import { REMOVE_PROFILE_DATA, SET_PROFILE_DATA, SET_PROFILE_EDITED } from "../actions/profile";

type TProfileState = {
  data: TProfile | null;
  profileWasEdited: boolean;
};

type TSetProfileDataAction = {
  readonly type: typeof SET_PROFILE_DATA;
  readonly data: TProfile;
};

type TRemoveProfileDataAction = {
  readonly type: typeof REMOVE_PROFILE_DATA;
};

type TSetProfileEditedAction = {
  readonly type: typeof SET_PROFILE_EDITED;
  readonly status: boolean;
};

type TProfileActions =
  | TSetProfileDataAction
  | TRemoveProfileDataAction
  | TSetProfileEditedAction;

type TProfileDataResponseBody = TResponseBody & {
  readonly user: TProfile;
};

export type { TProfileState, TSetProfileDataAction, TRemoveProfileDataAction, TSetProfileEditedAction, TProfileActions, TProfileDataResponseBody };