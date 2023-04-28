import { TProfile } from "../../utils/types";
import { SET_PROFILE_DATA, SET_PROFILE_EDITED } from "../actions/profile";

type TSetProfileDataAction = {
  readonly type: typeof SET_PROFILE_DATA;
  readonly data: TProfile;
};

type TSetProfileEditedAction = {
  readonly type: typeof SET_PROFILE_EDITED;
  readonly status: boolean;
};

type TProfileActions =
  | TSetProfileDataAction
  | TSetProfileEditedAction;

export type { TSetProfileDataAction, TSetProfileEditedAction, TProfileActions };