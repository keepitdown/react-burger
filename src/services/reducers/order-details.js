import { SET_SENDING_ORDER, SET_ORDER_SUCCEEDED, SET_ORDER_FAILED, SET_ORDER_NUMBER, SHOW_ORDER_DETAILS, HIDE_ORDER_DETAILS } from '../actions/order-details';

const initialState = {
  sendingData: false,
  failedToSend: false,
  orderNumber: null,
  showDetails: false
};

const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SENDING_ORDER:
      return {
        ...state,
        sendingData: true,
        failedToSend: false
      }
    case SET_ORDER_SUCCEEDED:
      return {
        ...state,
        sendingData: false
      }
    case SET_ORDER_FAILED:
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