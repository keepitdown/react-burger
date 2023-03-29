import { SET_PROFILE_DATA } from "../actions/profile";

const initialState = {
  data: {}
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE_DATA:
      return {
        ...state,
        data: { ...action.data }
      };
    default:
      return state
  };
}

export default profileReducer;