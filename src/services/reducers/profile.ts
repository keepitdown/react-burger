import { SET_PROFILE_DATA, REMOVE_PROFILE_DATA, SET_PROFILE_EDITED } from "../actions/profile";
import { TProfileActions, TProfileState } from "../types/profile";

const initialState = {
  data: null,
  profileWasEdited: false
};

const profileReducer = (state: TProfileState = initialState, action: TProfileActions) => {
  switch (action.type) {
    case SET_PROFILE_DATA:
      return {
        ...state,
        data: { ...action.data }
      };
    case REMOVE_PROFILE_DATA:
      return {
        ...state,
        data: null
      }
    case SET_PROFILE_EDITED: {
      return {
        ...state,
        profileWasEdited: action.status
      }
    }
    default:
      return state
  };
}

export default profileReducer;
export { initialState };