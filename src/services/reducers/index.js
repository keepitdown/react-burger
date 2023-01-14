import { combineReducers } from "redux";
import burgerIngredientsReducer from "./burger-ingredients";


const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer
});

export default rootReducer;