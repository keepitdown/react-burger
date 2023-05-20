import feedWsReducer, { initialState } from './order-feed-ws';
import { FEED_WS_CONNECTED, FEED_WS_ERROR, FEED_WS_GET_ORDERS, FEED_WS_WAS_CLOSED } from '../actions/order-feed-ws';
import { testOrders } from '../../utils/test-data';

describe('order-feed web-sockets middleware reducer', () => {
  it('should return the initial state', () => {
    expect(feedWsReducer(undefined, {}))
      .toEqual(initialState);
  });

  it('should handle FEED_WS_CONNECTED', () => {
    expect(feedWsReducer(initialState, { type: FEED_WS_CONNECTED }))
      .toEqual({
        ...initialState,
        connected: true
      });

    expect(feedWsReducer({
      ...initialState,
      connected: false,
      error: true
    }, { type: FEED_WS_CONNECTED, event: {} }))
      .toEqual({
        ...initialState,
        connected: true,
        error: false
      });
  });

  it('should handle FEED_WS_ERROR', () => {
    expect(feedWsReducer({
      ...initialState,
      connected: true
    }, { type: FEED_WS_ERROR, event: {} }))
      .toEqual({
        ...initialState,
        connected: false,
        error: true
      });
  });

  it('should handle FEED_WS_GET_ORDERS', () => {
    expect(feedWsReducer({ ...initialState, connected: true }, {
      type: FEED_WS_GET_ORDERS,
      data: { success: true, orders: testOrders, total: 500, totalToday: 50 }
    }))
      .toEqual({
        ...initialState,
        connected: true,
        feed: testOrders,
        total: 500,
        totalToday: 50
      });
  });

  it('should handle FEED_WS_WAS_CLOSED', () => {
    expect(feedWsReducer({ ...initialState, connected: true }, { type: FEED_WS_WAS_CLOSED }))
      .toEqual({
        ...initialState,
        connected: false
      });

    expect(feedWsReducer({ ...initialState, connected: true, feed: testOrders }, { type: FEED_WS_WAS_CLOSED }))
      .toEqual({
        ...initialState,
        connected: false,
        feed: null
      });
  });
});