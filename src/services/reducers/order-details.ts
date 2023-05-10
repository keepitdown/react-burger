import { SET_SENDING_ORDER, SET_ORDER_SUCCEEDED, SET_ORDER_FAILED, SET_ORDER_NUMBER, SHOW_ORDER_DETAILS, HIDE_ORDER_DETAILS, HIDE_LOADER } from '../actions/order-details';
import { TOrderConfirmationActions, TOrderConfirmationState } from '../types/order-details';

const initialState = {
  sendingData: false,
  failedToSend: false,
  orderNumber: null,
  showDetails: false,
  showLoader: false
};

const OrderConfirmationReducer = (state: TOrderConfirmationState = initialState, action: TOrderConfirmationActions) => {
  switch (action.type) {
    case SET_SENDING_ORDER:
      return {
        ...state,
        sendingData: true,
        failedToSend: false,
        showLoader: true
      }
    case SET_ORDER_SUCCEEDED:
      return {
        ...state,
        sendingData: false,
        showLoader: false
      }
    case SET_ORDER_FAILED:
      return {
        ...state,
        failedToSend: true,
        sendingData: false,
        showLoader: false
      }
    case SET_ORDER_NUMBER:
      return {
        ...state,
        orderNumber: action.number
      }
    case SHOW_ORDER_DETAILS:
      return {
        ...state,
        showDetails: true
      };
    case HIDE_ORDER_DETAILS:
      return {
        ...state,
        showDetails: false
      };
    case HIDE_LOADER:
      return {
        ...state,
        showLoader: false
      }
    default:
      return state;
  }
};

export default OrderConfirmationReducer;