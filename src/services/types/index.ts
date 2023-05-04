import { store } from "../../index";
import { ThunkAction } from 'redux-thunk';
import { ActionCreator } from 'redux';
import { TAuthActions } from "./auth";
import { TBurgerConstructorActions } from "./burger-constructor";
import { TBurgerIngredientsActions } from "./burger-ingredients";
import { TOrderConfirmationActions } from "./order-details";
import { TProfileActions } from "./profile";

type RootState = ReturnType<typeof store.getState>;

type TAppActions =
  | TAuthActions
  | TBurgerConstructorActions
  | TBurgerIngredientsActions
  | TOrderConfirmationActions
  | TProfileActions;

type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, RootState, unknown, TAppActions>
>;

type AppDispatch = typeof store.dispatch;


export type { RootState, AppThunk, AppDispatch };