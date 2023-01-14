import { combineReducers } from "redux";
import burgerIngredientsReducer from "./burger-ingredients";
import ingredientDetailsReducer from "./ingredient-details";


const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  ingredientDetails: ingredientDetailsReducer
});

export default rootReducer;