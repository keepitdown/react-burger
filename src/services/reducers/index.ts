import { combineReducers } from "redux";
import burgerIngredientsReducer from "./burger-ingredients";
import burgerConstructorReducer from "./burger-constructor";
import orderConfirmationReducer from "./order-confirmation";
import profileReducer from "./profile";
import authReducer from "./auth";
import feedWsReducer from "./order-feed-ws";
import historyWsReducer from "./order-history-ws";


const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  OrderConfirmation: orderConfirmationReducer,
  profile: profileReducer,
  auth: authReducer,
  feedWs: feedWsReducer,
  historyWs: historyWsReducer
});

export default rootReducer;