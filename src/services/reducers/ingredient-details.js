import { SET_INGREDIENT_DETAILS, REMOVE_INGREDIENT_DETAILS, SHOW_DETAILS, HIDE_DETAILS, SET_DETAILS_FAILED_STATUS } from "../actions/ingredient-details";

const initialState = {
  showDetails: false,
  detailsRequestHasFailed: false,
  data: {}
};

const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENT_DETAILS:
      return {
        ...state,
        data: { ...action.data }
      };
    case REMOVE_INGREDIENT_DETAILS:
      return {
        ...state,
        data: {}
      };
    case SHOW_DETAILS:
      return {
        ...state,
        showDetails: true
      }
    case HIDE_DETAILS:
      return {
        ...state,
        showDetails: false
      }
    default:
      return state
    case SET_DETAILS_FAILED_STATUS:
      return {
        ...state,
        detailsRequestHasFailed: true
      }
  };
}

export default ingredientDetailsReducer;