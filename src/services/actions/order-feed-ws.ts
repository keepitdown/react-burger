import { TFeedWsActionTypes, TFeedWsCloseAction, TFeedWsStartAction } from "../types/order-feed-ws";

const FEED_WS_START = 'FEED_WS_START';
const FEED_WS_CLOSE = 'FEED_WS_CLOSE';
const FEED_WS_CONNECTED = 'FEED_WS_CONNECTED';
const FEED_WS_ERROR = 'FEED_WS_ERROR';
const FEED_WS_GET_ORDERS = 'FEED_WS_GET_ORDERS';
const FEED_WS_WAS_CLOSED = 'FEED_WS_WAS_CLOSED';

const feedWsActionTypes: TFeedWsActionTypes = {
  start: FEED_WS_START,
  close: FEED_WS_CLOSE,
  onOpen: FEED_WS_CONNECTED,
  onError: FEED_WS_ERROR,
  onMessage: FEED_WS_GET_ORDERS,
  onClose: FEED_WS_WAS_CLOSED
};

const feedWsStart = (): TFeedWsStartAction => ({
  type: FEED_WS_START
});

const feedWsClose = (): TFeedWsCloseAction => ({
  type: FEED_WS_CLOSE
});

export { FEED_WS_START, FEED_WS_CLOSE, FEED_WS_CONNECTED, FEED_WS_ERROR, FEED_WS_GET_ORDERS, FEED_WS_WAS_CLOSED, feedWsActionTypes, feedWsStart, feedWsClose };