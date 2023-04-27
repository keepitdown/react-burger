const ADD_CONSTRUCTOR_ITEM = 'ADD_CONSTRUCTOR_ITEM';
const REMOVE_CONSTRUCTOR_ITEM = 'REMOVE_CONSTRUCTOR_ITEM';
const MOVE_CONSTRUCTOR_ITEM = 'MOVE_CONSTRUCTOR_ITEM';
const SHOW_BUN_ERROR = 'SHOW_BUN_ERROR';
const HIDE_BUN_ERROR = 'HIDE_BUN_ERROR';
const RESET_CONSTRUCTOR = 'RESET_CONSTRUCTOR';

const addConstructorItem = (data) => ({
  type: ADD_CONSTRUCTOR_ITEM,
  data
});

const removeConstructorItem = (id) => ({
  type: REMOVE_CONSTRUCTOR_ITEM,
  id
});

const moveConstructorItem = (movedItemIndex, targetIndex) => ({
  type: MOVE_CONSTRUCTOR_ITEM,
  movedItemIndex,
  targetIndex
});

const showBunError = () => ({
  type: SHOW_BUN_ERROR
});

const hideBunError = () => ({
  type: HIDE_BUN_ERROR
});

const resetConstructor = () => ({
  type: RESET_CONSTRUCTOR
});

export {
  ADD_CONSTRUCTOR_ITEM, REMOVE_CONSTRUCTOR_ITEM, MOVE_CONSTRUCTOR_ITEM, SHOW_BUN_ERROR, HIDE_BUN_ERROR, RESET_CONSTRUCTOR,
  addConstructorItem, removeConstructorItem, moveConstructorItem, showBunError, hideBunError, resetConstructor
};