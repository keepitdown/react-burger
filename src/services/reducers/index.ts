import { combineReducers } from "redux";
import burgerIngredientsReducer from "./burger-ingredients";
import burgerConstructorReducer from "./burger-constructor";
import OrderConfirmationReducer from "./order-details";
import profileReducer from "./profile";
import authReducer from "./auth";
import { feedWsReducer } from "./order-feed-ws";


const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  OrderConfirmation: OrderConfirmationReducer,
  profile: profileReducer,
  auth: authReducer,
  feedWs: feedWsReducer
});

export default rootReducer;