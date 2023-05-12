import historyWsReducer, { initialState } from './order-history-ws';
import { HISTORY_WS_CONNECTED, HISTORY_WS_ERROR, HISTORY_WS_GET_ORDERS, HISTORY_WS_WAS_CLOSED } from '../actions/order-history-ws';
import { testOrders } from '../../utils/test-data';

describe('order-history web-sockets middleware reducer', () => {
  it('should return the initial state', () => {
    expect(historyWsReducer(undefined, {}))
      .toEqual(initialState);
  });

  it('should handle HISTORY_WS_CONNECTED', () => {
    expect(historyWsReducer(initialState, { type: HISTORY_WS_CONNECTED }))
      .toEqual({
        ...initialState,
        connected: true
      });

    expect(historyWsReducer({
      ...initialState,
      connected: false,
      error: true
    }, { type: HISTORY_WS_CONNECTED, event: {} }))
      .toEqual({
        ...initialState,
        connected: true,
        error: false
      });
  });

  it('should handle HISTORY_WS_ERROR', () => {
    expect(historyWsReducer({
      ...initialState,
      connected: true
    }, { type: HISTORY_WS_ERROR, event: {} }))
      .toEqual({
        ...initialState,
        connected: false,
        error: true
      });
  });

  it('should handle HISTORY_WS_GET_ORDERS', () => {
    expect(historyWsReducer({ ...initialState, connected: true }, {
      type: HISTORY_WS_GET_ORDERS,
      data: { success: true, orders: testOrders, total: 500, totalToday: 50 }
    }))
      .toEqual({
        ...initialState,
        connected: true,
        history: testOrders.reverse()
      });
  });

  it('should handle HISTORY_WS_WAS_CLOSED', () => {
    expect(historyWsReducer({ ...initialState, connected: true }, { type: HISTORY_WS_WAS_CLOSED }))
      .toEqual({
        ...initialState,
        connected: false
      });

    expect(historyWsReducer({ ...initialState, connected: true, history: testOrders }, { type: HISTORY_WS_WAS_CLOSED }))
      .toEqual({
        ...initialState,
        connected: false,
        history: testOrders
      });
  });
});