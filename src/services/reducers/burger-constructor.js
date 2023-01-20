import { ADD_CONSTRUCTOR_ITEM, REMOVE_CONSTRUCTOR_ITEM, MOVE_CONSTRUCTOR_ITEM } from "../actions/burger-constructor";

const initialState = {
  data: {
    bun: {},
    middle: []
  },
  nextConstructorId: 0
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
          middle: action.updatedArray
        }
      }
    }
    default:
      return state;
  }
};

export default burgerConstructorReducer;