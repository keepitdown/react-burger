import { orderDispatchUrl } from "../../utils/constants";
import { checkApiResponse } from "../../utils/functions";

const SENDING_ORDER_DATA = 'SENDING_ORDER_DATA';
const ORDER_IS_SECCESSFUL = 'ORDER_IS_SECCESSFUL';
const FAILED_TO_SEND = 'FAILED_TO_SEND';
const SET_ORDER_NUMBER = 'SET_ORDER_NUMBER';
const SHOW_ORDER_DETAILS = 'SHOW_ORDER_DETAILS';
const HIDE_ORDER_DETAILS = 'HIDE_ORDER_DETAILS';

const sendOrder = () => (dispatch, getState) => {
  dispatch({
    type: SENDING_ORDER_DATA
  });
  const orderData = [getState().burgerConstructor.data.bun._id, ...getState().burgerConstructor.data.middle.map(item => item._id), getState().burgerConstructor.data.bun._id];
  fetch(orderDispatchUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ingredients: orderData })
  })
    .then(checkApiResponse)
    .then(orderData => {
      dispatch({
        type: ORDER_IS_SECCESSFUL
      });
      dispatch({
        type: SET_ORDER_NUMBER,
        number: orderData.order.number
      });
    })
    .catch(error => {
      dispatch({
        type: SET_ORDER_NUMBER,
        number: null
      });
      dispatch({ type: FAILED_TO_SEND });
      console.log(error);
    })
}

export { SENDING_ORDER_DATA, ORDER_IS_SECCESSFUL, FAILED_TO_SEND, SET_ORDER_NUMBER, SHOW_ORDER_DETAILS, HIDE_ORDER_DETAILS, sendOrder };