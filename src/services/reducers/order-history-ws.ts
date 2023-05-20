import { HISTORY_WS_CONNECTED, HISTORY_WS_ERROR, HISTORY_WS_GET_ORDERS, HISTORY_WS_WAS_CLOSED } from '../actions/order-history-ws';
import { THistoryWsActions, THistoryWsState } from '../types/order-history-ws';


const initialState = {
  connected: false,
  error: false,
  history: null
};

const historyWsReducer = (state: THistoryWsState = initialState, action: THistoryWsActions) => {
  switch (action.type) {
    case HISTORY_WS_CONNECTED:
      return {
        ...state,
        connected: true,
        error: false
      };
    case HISTORY_WS_ERROR:
      return {
        ...state,
        connected: false,
        error: true
      };
    case HISTORY_WS_GET_ORDERS:
      return {
        ...state,
        history: [...action.data.orders].reverse(),
      }
    case HISTORY_WS_WAS_CLOSED:
      return {
        ...state,
        connected: false,
        history: null
      }
    default:
      return state;
  }
};

export default historyWsReducer;
export { initialState };