import { THistoryWsActionTypes, THistoryWsCloseAction, THistoryWsStartAction } from "../types/order-history-ws";

const HISTORY_WS_START = 'HISTORY_WS_START';
const HISTORY_WS_CLOSE = 'HISTORY_WS_CLOSE';
const HISTORY_WS_CONNECTED = 'HISTORY_WS_CONNECTED';
const HISTORY_WS_ERROR = 'HISTORY_WS_ERROR';
const HISTORY_WS_GET_ORDERS = 'HISTORY_WS_GET_ORDERS';
const HISTORY_WS_WAS_CLOSED = 'HISTORY_WS_WAS_CLOSED';

const historyWsActionTypes: THistoryWsActionTypes = {
  start: HISTORY_WS_START,
  close: HISTORY_WS_CLOSE,
  onOpen: HISTORY_WS_CONNECTED,
  onError: HISTORY_WS_ERROR,
  onMessage: HISTORY_WS_GET_ORDERS,
  onClose: HISTORY_WS_WAS_CLOSED
};

const historyWsStart = (): THistoryWsStartAction => ({
  type: HISTORY_WS_START
});

const historyWsClose = (): THistoryWsCloseAction => ({
  type: HISTORY_WS_CLOSE
});

export { HISTORY_WS_START, HISTORY_WS_CLOSE, HISTORY_WS_CONNECTED, HISTORY_WS_ERROR, HISTORY_WS_GET_ORDERS, HISTORY_WS_WAS_CLOSED, historyWsActionTypes, historyWsStart, historyWsClose };