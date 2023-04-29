import { INGREDIENTS_URL } from "../../utils/constants";
import { addProperty, groupByType, request } from "../../utils/functions";
import {
  TSetBurgerIngredientsAction, TSetLoadedStatusAction, TSetFailedStatusAction,
  TIncreaseIngredientQuantityAction, TDecreaseIngredientQuantityAction, TResetAllQuantitiesAction, TBurgerIngredientsResponseBody
} from '../types/burger-ingredients';
import { AppThunk } from "../types";
import { TAvaliableIngredients, TIngredient, TRawIngredient } from "../../utils/types";

const SET_BURGER_INGREDIENTS = 'SET_BURGER_INGREDIENTS';
const SET_LOADED_STATUS = 'SET_LOADED_STATUS';
const SET_FAILED_STATUS = 'SET_FAILED_STATUS';
const INCREASE_INGREDIENT_QUANTITY = 'INCREASE_INGREDIENT_QUANTITY';
const DECREASE_INGREDIENT_QUANTITY = 'DECREASE_INGREDIENT_QUANTITY';
const RESET_ALL_QUANTITIES = 'RESET_ALL_QUANTITIES';

const setBurgerIngredients = (data: TAvaliableIngredients): TSetBurgerIngredientsAction => ({
  type: SET_BURGER_INGREDIENTS,
  data
});

const setLoadedStatus = (status: boolean): TSetLoadedStatusAction => ({
  type: SET_LOADED_STATUS,
  status
});

const setFailedStatus = (status: boolean): TSetFailedStatusAction => ({
  type: SET_FAILED_STATUS,
  status
});

const increaseIngredientQuantity = (id: string, increaseAmount: 1 | 2): TIncreaseIngredientQuantityAction => ({
  type: INCREASE_INGREDIENT_QUANTITY,
  id,
  increaseAmount
});

const decreaseIngredientQuantity = (id: string, decreaseAmount: 1 | 2): TDecreaseIngredientQuantityAction => ({
  type: DECREASE_INGREDIENT_QUANTITY,
  id,
  decreaseAmount
});

const resetAllQuantities = (): TResetAllQuantitiesAction => ({
  type: RESET_ALL_QUANTITIES
});

const getIngredients: AppThunk = () => dispatch => {
  dispatch(setLoadedStatus(false));
  dispatch(setFailedStatus(false));

  request<TBurgerIngredientsResponseBody>(INGREDIENTS_URL)
    .then(({ data: serverData }: {data: TRawIngredient[]}) => {
      const processedData = groupByType(addProperty<number>(serverData, 'quantity', 0) as TIngredient[]);
      dispatch(setBurgerIngredients(processedData));
      dispatch(setLoadedStatus(true));
    })
    .catch(error => {
      dispatch(setFailedStatus(true));
      console.log(error);
    });
}

export {
  SET_BURGER_INGREDIENTS, SET_LOADED_STATUS, SET_FAILED_STATUS, INCREASE_INGREDIENT_QUANTITY,
  DECREASE_INGREDIENT_QUANTITY, RESET_ALL_QUANTITIES, setBurgerIngredients, setLoadedStatus,
  setFailedStatus, increaseIngredientQuantity, decreaseIngredientQuantity, resetAllQuantities,
  getIngredients
};