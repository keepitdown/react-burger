import { store } from "../../index";
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { TAuthActions } from "./auth";
import { TBurgerConstructorActions } from "./burger-constructor";
import { TBurgerIngredientsActions } from "./burger-ingredients";
import { TOrderDetailsActions } from "./order-details";
import { TProfileActions } from "./profile";

type RootState = ReturnType<typeof store.getState>;

type TAppActions =
  | TAuthActions
  | TBurgerConstructorActions
  | TBurgerIngredientsActions
  | TOrderDetailsActions
  | TProfileActions;

type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, RootState, Action, TAppActions>
>;

type AppDispatch = typeof store.dispatch;


export type { RootState, AppThunk, AppDispatch };