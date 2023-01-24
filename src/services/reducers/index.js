import { combineReducers } from "redux";
import burgerIngredientsReducer from "./burger-ingredients";
import ingredientDetailsReducer from "./ingredient-details";
import burgerConstructorReducer from "./burger-constructor";
import orderDetailsReducer from "./order-details";


const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  burgerConstructor: burgerConstructorReducer,
  orderDetails: orderDetailsReducer
});

export default rootReducer;