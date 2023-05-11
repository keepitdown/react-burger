import { TAvaliableIngredients } from "../../utils/types";
import {
  SET_BURGER_INGREDIENTS, SET_LOADED_STATUS, SET_FAILED_STATUS,
  INCREASE_INGREDIENT_QUANTITY, DECREASE_INGREDIENT_QUANTITY, RESET_ALL_QUANTITIES
} from "../actions/burger-ingredients";
import { TBurgerIngredientsActions, TBurgerIngredientsState } from "../types/burger-ingredients";

const initialState = {
  dataIsLoaded: false,
  requestHasFailed: false,
  data: {}
};

const burgerIngredientsReducer = (state: TBurgerIngredientsState = initialState, action: TBurgerIngredientsActions) => {
  switch (action.type) {
    case SET_BURGER_INGREDIENTS:
      return {
        ...state,
        data: { ...action.data }
      };
    case SET_LOADED_STATUS:
      return {
        ...state,
        dataIsLoaded: action.status
      };
    case SET_FAILED_STATUS:
      return {
        ...state,
        requestHasFailed: action.status
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

      }, {} as TAvaliableIngredients);

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

      }, {} as TAvaliableIngredients);

      return {
        ...state,
        data: updatedData
      }
    }
    case RESET_ALL_QUANTITIES: {

      const updatedData = Object.keys(state.data).reduce((processedData, categoryKey) => {
        const updatedCategory = state.data[categoryKey].map(
          item => ({ ...item, quantity: 0 })
        );

        return {
          ...processedData,
          [categoryKey]: updatedCategory
        }
      }, {} as TAvaliableIngredients);

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