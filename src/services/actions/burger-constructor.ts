import { TIngredient } from '../../utils/types';
import {
  TAddConstructorItemAction, TRemoveConstructorItemAction,
  TMoveConstructorItemAction, TShowBunErrorAction, THideBunErrorAction, TResetConstructorAction
} from '../types/burger-constructor';

const ADD_CONSTRUCTOR_ITEM = 'ADD_CONSTRUCTOR_ITEM';
const REMOVE_CONSTRUCTOR_ITEM = 'REMOVE_CONSTRUCTOR_ITEM';
const MOVE_CONSTRUCTOR_ITEM = 'MOVE_CONSTRUCTOR_ITEM';
const SHOW_BUN_ERROR = 'SHOW_BUN_ERROR';
const HIDE_BUN_ERROR = 'HIDE_BUN_ERROR';
const RESET_CONSTRUCTOR = 'RESET_CONSTRUCTOR';

const addConstructorItem = (data: TIngredient): TAddConstructorItemAction => ({
  type: ADD_CONSTRUCTOR_ITEM,
  data
});

const removeConstructorItem = (id: number): TRemoveConstructorItemAction => ({
  type: REMOVE_CONSTRUCTOR_ITEM,
  id
});

const moveConstructorItem = (movedItemIndex: number, targetIndex: number): TMoveConstructorItemAction => ({
  type: MOVE_CONSTRUCTOR_ITEM,
  movedItemIndex,
  targetIndex
});

const showBunError = (): TShowBunErrorAction => ({
  type: SHOW_BUN_ERROR
});

const hideBunError = (): THideBunErrorAction => ({
  type: HIDE_BUN_ERROR
});

const resetConstructor = (): TResetConstructorAction => ({
  type: RESET_CONSTRUCTOR
});

export {
  ADD_CONSTRUCTOR_ITEM, REMOVE_CONSTRUCTOR_ITEM, MOVE_CONSTRUCTOR_ITEM, SHOW_BUN_ERROR, HIDE_BUN_ERROR, RESET_CONSTRUCTOR,
  addConstructorItem, removeConstructorItem, moveConstructorItem, showBunError, hideBunError, resetConstructor
};