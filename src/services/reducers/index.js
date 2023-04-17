import { combineReducers } from "redux";
import burgerIngredientsReducer from "./burger-ingredients";
import ingredientDetailsReducer from "./ingredient-details";
import burgerConstructorReducer from "./burger-constructor";
import orderDetailsReducer from "./order-details";
import profileReducer from "./profile";
import authReducer from "./auth";


const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  burgerConstructor: burgerConstructorReducer,
  orderDetails: orderDetailsReducer,
  profile: profileReducer,
  auth: authReducer
});

export default rootReducer;