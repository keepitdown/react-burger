import { ADD_CONSTRUCTOR_INGREDIENT, REMOVE_CONSTRUCTOR_INGREDIENT } from "../actions/burger-constructor";

import { testData } from "../../data/test-burger-data";

const initialState = { data: { top: {}, middle: [...testData.middle], bottom: {} }, nextConstructorId: 2 };

const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONSTRUCTOR_INGREDIENT: {
      if (action.data.type === 'bun') {
        return {
          ...state,
          data: {
            ...state.data,
            top: { ...action.data },
            bottom: { ...action.data }
          }
        }
      }
      return {
        ...state,
        data: {
          ...state.data,
          middle: [...state.data.middle, { ...action.data, constructorId: state.nextConstructorId }]
        },
        nextConstructorId: state.nextConstructorId + 1
      }
    }
    case REMOVE_CONSTRUCTOR_INGREDIENT:
      return {
        ...state,
        data: {
          ...state.data,
          middle: state.data.middle.filter(item => item.constructorId !== action.id)
        }
      };
    default:
      return state;
  }
};

export default burgerConstructorReducer;