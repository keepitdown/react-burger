import { FEED_WS_CONNECTED, FEED_WS_ERROR, FEED_WS_GET_ORDERS, FEED_WS_WAS_CLOSED } from '../actions/order-feed-ws';
import { TFeedWsActions, TFeedWsState } from '../types/order-feed-ws';


const initialState = {
  connected: false,
  error: false,
  feed: null,
  total: null,
  totalToday: null
};

const feedWsReducer = (state: TFeedWsState = initialState, action: TFeedWsActions) => {
  switch (action.type) {
    case FEED_WS_CONNECTED:
      return {
        ...state,
        connected: true,
        error: false
      };
    case FEED_WS_ERROR:
      return {
        ...state,
        connected: false,
        error: true
      };
    case FEED_WS_GET_ORDERS:
      console.log(action.data.orders[0]);
      return {
        ...state,
        feed: action.data.orders,
        total: action.data.total,
        totalToday: action.data.totalToday
      }
    case FEED_WS_WAS_CLOSED:
      return {
        ...state,
        connected: false
      }
    default:
      return state;
  }
};

export { feedWsReducer };