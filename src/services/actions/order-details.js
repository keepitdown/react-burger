import { ORDER_URL } from "../../utils/constants";
import { request } from "../../utils/functions";

const SET_SENDING_ORDER = 'SET_SENDING_ORDER';
const SET_ORDER_SUCCEEDED = 'SET_ORDER_SUCCEEDED';
const SET_ORDER_FAILED = 'SET_ORDER_FAILED';
const SET_ORDER_NUMBER = 'SET_ORDER_NUMBER';
const SHOW_ORDER_DETAILS = 'SHOW_ORDER_DETAILS';
const HIDE_ORDER_DETAILS = 'HIDE_ORDER_DETAILS';

const setSendingOrder = () => ({
  type: SET_SENDING_ORDER
});

const setOrderSucceeded = () => ({
  type: SET_ORDER_SUCCEEDED
});

const setOrderFailed = () => ({
  type: SET_ORDER_FAILED
});

const setOrderNumber = (number) => ({
  type: SET_ORDER_NUMBER,
  number
});

const showOrderDetails = () => ({
  type: SHOW_ORDER_DETAILS
});

const hideOrderDetails = () => ({
  type: HIDE_ORDER_DETAILS
});

const sendOrder = () => (dispatch, getState) => {
  dispatch(setSendingOrder());
  const orderData = [getState().burgerConstructor.data.bun._id, ...getState().burgerConstructor.data.middle.map(item => item._id), getState().burgerConstructor.data.bun._id];
  request(ORDER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ingredients: orderData })
  })
    .then(orderData => {
      dispatch(setOrderSucceeded());
      dispatch(setOrderNumber(orderData.order.number));
    })
    .catch(error => {
      dispatch(setOrderNumber(null));
      dispatch(setOrderFailed());
      console.log(error);
    })
}

export {
  SET_SENDING_ORDER, SET_ORDER_SUCCEEDED, SET_ORDER_FAILED, SET_ORDER_NUMBER, SHOW_ORDER_DETAILS, HIDE_ORDER_DETAILS,
  setSendingOrder, setOrderSucceeded, setOrderFailed, setOrderNumber, showOrderDetails, hideOrderDetails, sendOrder
};