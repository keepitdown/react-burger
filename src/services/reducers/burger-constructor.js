import { moveArrayItem } from "../../utils/functions";
import { ADD_CONSTRUCTOR_ITEM, REMOVE_CONSTRUCTOR_ITEM, MOVE_CONSTRUCTOR_ITEM, SHOW_BUN_ERROR, HIDE_BUN_ERROR, RESET_CONSTRUCTOR } from "../actions/burger-constructor";

const initialState = {
  data: {
    bun: {},
    middle: []
  },
  nextConstructorId: 0,
  showBunError: false
};

const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONSTRUCTOR_ITEM: {
      if (action.data.type === 'bun') {
        return {
          ...state,
          data: {
            ...state.data,
            bun: { ...action.data }
          }
        };
      }
      return {
        ...state,
        data: {
          ...state.data,
          middle: [...state.data.middle, { ...action.data, constructorId: state.nextConstructorId }]
        },
        nextConstructorId: state.nextConstructorId + 1
      };
    }
    case REMOVE_CONSTRUCTOR_ITEM:
      return {
        ...state,
        data: {
          ...state.data,
          middle: state.data.middle.filter(item => item.constructorId !== action.id)
        }
      };
    case MOVE_CONSTRUCTOR_ITEM: {
      return {
        ...state,
        data: {
          ...state.data,
          middle: moveArrayItem(action.movedItemIndex, action.targetIndex, state.data.middle)
        }
      }
    }
    case SHOW_BUN_ERROR: {
      return {
        ...state,
        showBunError: true
      }
    }
    case HIDE_BUN_ERROR: {
      return {
        ...state,
        showBunError: false
      }
    }
    case RESET_CONSTRUCTOR:
      return {
        ...state,
        data: {
          bun: {},
          middle: []
        },
        nextConstructorId: 0,
        showBunError: false
      }
    default:
      return state;
  }
};

export default burgerConstructorReducer;