import { SENDING_ORDER_DATA, ORDER_IS_SECCESSFUL, FAILED_TO_SEND, SET_ORDER_NUMBER, SHOW_ORDER_DETAILS, HIDE_ORDER_DETAILS } from '../actions/order-details';

const initialState = {
  sendingData: false,
  failedToSend: false,
  orderNumber: null,
  showDetails: false
};

const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SENDING_ORDER_DATA:
      return {
        ...state,
        sendingData: true,
        failedToSend: false
      }
    case ORDER_IS_SECCESSFUL:
      return {
        ...state,
        sendingData: false
      }
    case FAILED_TO_SEND:
      return {
        ...state,
        failedToSend: true,
        sendingData: false
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
    default:
      return state;
  }
};

export default orderDetailsReducer;