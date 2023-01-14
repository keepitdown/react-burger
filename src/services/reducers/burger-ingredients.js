import {
  SET_BURGER_INGREDIENTS, SET_LOADED_STATUS, SET_FAILED_STATUS,
  INCREASE_INGREDIENT_QUANTITY, DECREASE_INGREDIENT_QUANTITY
} from "../actions/burger-ingredients";

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
      };
    case SET_FAILED_STATUS:
      return {
        ...state,
        requestHasFailed: true
      };
    case INCREASE_INGREDIENT_QUANTITY: {

      const updatedData = Object.keys(state.data).reduce((processedData, categoryKey) => {

        const updatedCategory = state.data[categoryKey].map(
          item => item._id === action.id
            ? { ...item, quantity: item.quantity + action.increaseAmount }
            : { ...item });

        return {
          ...processedData,
          [categoryKey]: updatedCategory
        }

      }, {});

      return {
        ...state,
        data: updatedData
      }
    }
    case DECREASE_INGREDIENT_QUANTITY: {

      const updatedData = Object.keys(state.data).reduce((processedData, categoryKey) => {

        const updatedCategory = state.data[categoryKey].map(
          item => item._id === action.id
            ? { ...item, quantity: (item.quantity - action.decreaseAmount) > 0 ? (item.quantity - action.decreaseAmount) : 0 }
            : { ...item }
        );

        return {
          ...processedData,
          [categoryKey]: updatedCategory
        }

      }, {});

      return {
        ...state,
        data: updatedData
      }
    }
    default:
      return state;
  }
};

export default burgerIngredientsReducer;