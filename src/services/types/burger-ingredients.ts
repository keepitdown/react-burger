import { TAvaliableIngredients } from "../../utils/types";
import {
  SET_BURGER_INGREDIENTS, SET_LOADED_STATUS, SET_FAILED_STATUS,
  INCREASE_INGREDIENT_QUANTITY, DECREASE_INGREDIENT_QUANTITY, RESET_ALL_QUANTITIES
} from "../actions/burger-ingredients";

type TSetBurgerIngredientsAction = {
  readonly type: typeof SET_BURGER_INGREDIENTS;
  readonly data: TAvaliableIngredients;
};

type TSetLoadedStatusAction = {
  readonly type: typeof SET_LOADED_STATUS;
  readonly status: boolean;
};

type TSetFailedStatusAction = {
  readonly type: typeof SET_FAILED_STATUS;
  readonly status: boolean;
}

type TIncreaseIngredientQuantityAction = {
  readonly type: typeof INCREASE_INGREDIENT_QUANTITY;
  readonly id: string;
  readonly increaseAmount: 1 | 2;
};

type TDecreaseIngredientQuantityAction = {
  readonly type: typeof DECREASE_INGREDIENT_QUANTITY;
  readonly id: string;
  readonly decreaseAmount: 1 | 2;
};

type TResetAllQuantitiesAction = {
  readonly type: typeof RESET_ALL_QUANTITIES;
};

type TBurgerIngredientsActions =
  | TSetBurgerIngredientsAction
  | TSetLoadedStatusAction
  | TSetFailedStatusAction
  | TIncreaseIngredientQuantityAction
  | TDecreaseIngredientQuantityAction
  | TResetAllQuantitiesAction;

export type {
  TSetBurgerIngredientsAction, TSetLoadedStatusAction, TSetFailedStatusAction,
  TIncreaseIngredientQuantityAction, TDecreaseIngredientQuantityAction, TResetAllQuantitiesAction,
  TBurgerIngredientsActions
};