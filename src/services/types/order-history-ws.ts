import { TOrder, TResponseBody } from '../../utils/types';
import { HISTORY_WS_START, HISTORY_WS_CLOSE, HISTORY_WS_CONNECTED, HISTORY_WS_ERROR, HISTORY_WS_GET_ORDERS, HISTORY_WS_WAS_CLOSED } from '../actions/order-history-ws';

type THistoryWsState = {
  connected: boolean;
  error: boolean;
  history: TOrder[] | null;
};

type THistoryWsActionTypes = {
  start: typeof HISTORY_WS_START;
  close: typeof HISTORY_WS_CLOSE;
  onOpen: typeof HISTORY_WS_CONNECTED;
  onError: typeof HISTORY_WS_ERROR;
  onMessage: typeof HISTORY_WS_GET_ORDERS;
  onClose: typeof HISTORY_WS_WAS_CLOSED;
}

type THistoryWsStartAction = {
  readonly type: typeof HISTORY_WS_START;
};

type THistoryWsCloseAction = {
  readonly type: typeof HISTORY_WS_CLOSE;
}

type THistoryWsConnectedAction = {
  readonly type: typeof HISTORY_WS_CONNECTED;
  readonly event: Event;
};

type THistoryWsErrorAction = {
  readonly type: typeof HISTORY_WS_ERROR;
  readonly event: Event;
};

type THistoryWsGetOrdersAction = {
  readonly type: typeof HISTORY_WS_GET_ORDERS;
  readonly data: THistoryWsMessage;
};

type THistoryWsWasClosedAction = {
  readonly type: typeof HISTORY_WS_WAS_CLOSED;
  readonly event: CloseEvent;
};


type THistoryWsActions =
  | THistoryWsStartAction
  | THistoryWsCloseAction
  | THistoryWsConnectedAction
  | THistoryWsErrorAction
  | THistoryWsGetOrdersAction
  | THistoryWsWasClosedAction;

type THistoryWsMessage = TResponseBody & {
  readonly orders: TOrder[];
  readonly total: number;
  readonly totalToday: number;
}

export type {
  THistoryWsState, THistoryWsActionTypes, THistoryWsStartAction, THistoryWsCloseAction, THistoryWsConnectedAction,
  THistoryWsErrorAction, THistoryWsGetOrdersAction, THistoryWsActions, THistoryWsMessage
};