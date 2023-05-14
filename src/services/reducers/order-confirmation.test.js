import orderConfirmationReducer, { initialState } from "./order-confirmation";
import {
  setSendingOrder, setOrderSucceeded, setOrderFailed, setOrderNumber,
  showOrderConfirmation, hideOrderConfirmation, hideLoader
} from '../actions/order-confirmation';

describe('order-confirmation reducer', () => {
  it('should return the initial state', () => {
    expect(orderConfirmationReducer(undefined, {}))
      .toEqual(initialState);
  });

  it('should handle setSendingOrder', () => {
    expect(orderConfirmationReducer(initialState, setSendingOrder()))
      .toEqual({
        ...initialState,
        sendingData: true,
        showLoader: true
      });

    expect(orderConfirmationReducer({ ...initialState, failedToSend: true }, setSendingOrder()))
      .toEqual({
        ...initialState,
        sendingData: true,
        failedToSend: false,
        showLoader: true
      });
  });

  it('should handle setOrderSucceeded', () => {
    expect(orderConfirmationReducer({
      ...initialState,
      sendingData: true,
      showLoader: true
    }, setOrderSucceeded()))
      .toEqual({
        ...initialState,
        sendingData: false,
        showLoader: false
      });
  });

  it('should handle setOrderFailed', () => {
    expect(orderConfirmationReducer({
      ...initialState,
      sendingData: true,
      showLoader: true
    }, setOrderFailed()))
      .toEqual({
        ...initialState,
        sendingData: false,
        failedToSend: true,
        showLoader: false
      });
  });

  it('should handle setOrderNumber', () => {
    expect(orderConfirmationReducer(initialState, setOrderNumber(123)))
      .toEqual({ ...initialState, orderNumber: 123 });

    expect(orderConfirmationReducer({ ...initialState, orderNumber: 123 }, setOrderNumber(null)))
      .toEqual({ ...initialState, orderNumber: null });
  });

  it('should handle showOrderConfirmation', () => {
    expect(orderConfirmationReducer(initialState, showOrderConfirmation()))
      .toEqual({ ...initialState, showConfirmation: true });
  });

  it('should handle hideOrderConfirmation', () => {
    expect(orderConfirmationReducer({ ...initialState, showConfirmation: true }, hideOrderConfirmation()))
      .toEqual({ ...initialState, showConfirmation: false });
  });

  it('should handle hideLoader', () => {
    expect(orderConfirmationReducer({ ...initialState, showLoader: true }, hideLoader()))
      .toEqual({ ...initialState, showLoader: false });
  });
});