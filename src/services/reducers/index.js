import { combineReducers } from "redux";
import burgerIngredientsReducer from "./burger-ingredients";
import ingredientDetailsReducer from "./ingredient-details";
import burgerConstructorReducer from "./burger-constructor";


const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  burgerConstructor: burgerConstructorReducer
});

export default rootReducer;