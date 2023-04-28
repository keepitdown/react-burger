import { SET_SENDING_ORDER, SET_ORDER_SUCCEEDED, SET_ORDER_FAILED, SET_ORDER_NUMBER, SHOW_ORDER_DETAILS, HIDE_ORDER_DETAILS } from '../actions/order-details';

type TOrderDetailsState = {
  sendingData: boolean;
  failedToSend: boolean;
  orderNumber: number | null;
  showDetails: boolean;
};

type TSetSendingOrderAction = {
  readonly type: typeof SET_SENDING_ORDER;
};

type TSetOrderSucceededAction = {
  readonly type: typeof SET_ORDER_SUCCEEDED;
};

type TSetOrderFailedAction = {
  readonly type: typeof SET_ORDER_FAILED;
};

type TSetOrderNumberAction = {
  readonly type: typeof SET_ORDER_NUMBER;
  readonly number: number;
};

type TShowOrderDetailsAction = {
  readonly type: typeof SHOW_ORDER_DETAILS;
};

type THideOrderDetailsAction = {
  readonly type: typeof HIDE_ORDER_DETAILS;
};

type TOrderDetailsActions =
  | TSetSendingOrderAction
  | TSetOrderSucceededAction
  | TSetOrderFailedAction
  | TSetOrderNumberAction
  | TShowOrderDetailsAction
  | THideOrderDetailsAction;

export type {
  TOrderDetailsState, TSetSendingOrderAction, TSetOrderSucceededAction,
  TSetOrderFailedAction, TSetOrderNumberAction, TShowOrderDetailsAction,
  THideOrderDetailsAction, TOrderDetailsActions
};