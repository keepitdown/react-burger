import { TOrder, TResponseBody } from '../../utils/types';
import { FEED_WS_CLOSE, FEED_WS_CONNECTED, FEED_WS_ERROR, FEED_WS_GET_ORDERS, FEED_WS_START, FEED_WS_WAS_CLOSED } from '../actions/order-feed-ws';

type TFeedWsState = {
  connected: boolean;
  error: boolean;
  feed: TOrder[] | null;
  total: number | null;
  totalToday: number | null;
};

type TFeedWsActionTypes = {
  start: typeof FEED_WS_START;
  close: typeof FEED_WS_CLOSE;
  onOpen: typeof FEED_WS_CONNECTED;
  onError: typeof FEED_WS_ERROR;
  onMessage: typeof FEED_WS_GET_ORDERS;
  onClose: typeof FEED_WS_WAS_CLOSED;
}

type TFeedWsStartAction = {
  readonly type: typeof FEED_WS_START;
};

type TFeedWsCloseAction = {
  readonly type: typeof FEED_WS_CLOSE;
}

type TFeedWsConnectedAction = {
  readonly type: typeof FEED_WS_CONNECTED;
  readonly event: Event;
};

type TFeedWsErrorAction = {
  readonly type: typeof FEED_WS_ERROR;
  readonly event: Event;
};

type TFeedWsGetOrdersAction = {
  readonly type: typeof FEED_WS_GET_ORDERS;
  readonly data: TFeedWsMessage;
};

type TFeedWsWasClosedAction = {
  readonly type: typeof FEED_WS_WAS_CLOSED;
  readonly event: CloseEvent;
};


type TFeedWsActions =
  | TFeedWsStartAction
  | TFeedWsCloseAction
  | TFeedWsConnectedAction
  | TFeedWsErrorAction
  | TFeedWsGetOrdersAction
  | TFeedWsWasClosedAction;

type TFeedWsMessage = TResponseBody & {
  readonly orders: TOrder[];
  readonly total: number;
  readonly totalToday: number;
}

export type {
  TFeedWsState, TFeedWsActionTypes, TFeedWsStartAction, TFeedWsCloseAction, TFeedWsConnectedAction,
  TFeedWsErrorAction, TFeedWsGetOrdersAction, TFeedWsActions, TFeedWsMessage
};