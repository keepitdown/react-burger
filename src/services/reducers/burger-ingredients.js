import { SET_BURGER_INGREDIENTS, SET_LOADED_STATUS, SET_FAILED_STATUS } from "../actions/burger-ingredients";

const initialState = {
  dataIsLoaded: false,
  requestHasFailed: false,
  data: {}
};

const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BURGER_INGREDIENTS:
      return {
        ...state,
        data: { ...action.data }
      };
    case SET_LOADED_STATUS:
      return {
        ...state,
        dataIsLoaded: true
      }
    case SET_FAILED_STATUS:
      return {
        ...state,
        requestHasFailed: true
      }
    default:
      return state;
  }
};

export default burgerIngredientsReducer;