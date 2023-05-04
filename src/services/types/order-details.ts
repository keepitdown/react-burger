import { TResponseBody } from '../../utils/types';
import { SET_SENDING_ORDER, SET_ORDER_SUCCEEDED, SET_ORDER_FAILED, SET_ORDER_NUMBER, SHOW_ORDER_DETAILS, HIDE_ORDER_DETAILS } from '../actions/order-details';

type TOrderConfirmationState = {
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
  readonly number: number | null;
};

type TShowOrderConfirmationAction = {
  readonly type: typeof SHOW_ORDER_DETAILS;
};

type THideOrderConfirmationAction = {
  readonly type: typeof HIDE_ORDER_DETAILS;
};

type TOrderConfirmationActions =
  | TSetSendingOrderAction
  | TSetOrderSucceededAction
  | TSetOrderFailedAction
  | TSetOrderNumberAction
  | TShowOrderConfirmationAction
  | THideOrderConfirmationAction;

type TOrderResponseBody = TResponseBody & {
  name: string;
  order: { number: number };
}

export type {
  TOrderConfirmationState, TSetSendingOrderAction, TSetOrderSucceededAction,
  TSetOrderFailedAction, TSetOrderNumberAction, TShowOrderConfirmationAction,
  THideOrderConfirmationAction, TOrderConfirmationActions, TOrderResponseBody
};