import { TIngredient } from "../../utils/types";
import { ADD_CONSTRUCTOR_ITEM, REMOVE_CONSTRUCTOR_ITEM, MOVE_CONSTRUCTOR_ITEM, SHOW_BUN_ERROR, HIDE_BUN_ERROR, RESET_CONSTRUCTOR } from "../actions/burger-constructor";

type TAddConstructorItemAction = {
  readonly type: typeof ADD_CONSTRUCTOR_ITEM;
  readonly data: TIngredient;
};

type TRemoveConstructorItemAction = {
  readonly type: typeof REMOVE_CONSTRUCTOR_ITEM;
  readonly id: number;
};

type TMoveConstructorItemAction = {
  readonly type: typeof MOVE_CONSTRUCTOR_ITEM;
  readonly movedItemIndex: number;
  readonly targetIndex: number;
};

type TShowBunErrorAction = {
  readonly type: typeof SHOW_BUN_ERROR;
};

type THideBunErrorAction = {
  readonly type: typeof HIDE_BUN_ERROR;
};

type TResetConstructorAction = {
  readonly type: typeof RESET_CONSTRUCTOR;
};

type TBurgerConstructorActions =
  | TAddConstructorItemAction
  | TRemoveConstructorItemAction
  | TMoveConstructorItemAction
  | TShowBunErrorAction
  | THideBunErrorAction
  | TResetConstructorAction;

export type {
  TAddConstructorItemAction, TRemoveConstructorItemAction, TMoveConstructorItemAction,
  TShowBunErrorAction, THideBunErrorAction, TResetConstructorAction, TBurgerConstructorActions
};