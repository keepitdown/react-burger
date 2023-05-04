import { ORDER_URL } from "../../utils/constants";
import { request } from "../../utils/functions";
import {
  TSetSendingOrderAction, TSetOrderSucceededAction, TSetOrderFailedAction,
  TSetOrderNumberAction, TShowOrderConfirmationAction, THideOrderConfirmationAction, TOrderResponseBody
} from '../types/order-details';
import { AppThunk } from "../types";

const SET_SENDING_ORDER = 'SET_SENDING_ORDER';
const SET_ORDER_SUCCEEDED = 'SET_ORDER_SUCCEEDED';
const SET_ORDER_FAILED = 'SET_ORDER_FAILED';
const SET_ORDER_NUMBER = 'SET_ORDER_NUMBER';
const SHOW_ORDER_DETAILS = 'SHOW_ORDER_DETAILS';
const HIDE_ORDER_DETAILS = 'HIDE_ORDER_DETAILS';

const setSendingOrder = (): TSetSendingOrderAction => ({
  type: SET_SENDING_ORDER
});

const setOrderSucceeded = (): TSetOrderSucceededAction => ({
  type: SET_ORDER_SUCCEEDED
});

const setOrderFailed = (): TSetOrderFailedAction => ({
  type: SET_ORDER_FAILED
});

const setOrderNumber = (number: number | null): TSetOrderNumberAction => ({
  type: SET_ORDER_NUMBER,
  number
});

const showOrderConfirmation = (): TShowOrderConfirmationAction => ({
  type: SHOW_ORDER_DETAILS
});

const hideOrderConfirmation = (): THideOrderConfirmationAction => ({
  type: HIDE_ORDER_DETAILS
});

const sendOrder: AppThunk = () => (dispatch, getState) => {
  dispatch(setSendingOrder());
  const orderData = [getState().burgerConstructor.data.bun!._id, ...getState().burgerConstructor.data.middle.map(item => item._id), getState().burgerConstructor.data.bun!._id];
  request<TOrderResponseBody>(ORDER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ingredients: orderData })
  })
    .then((orderData: TOrderResponseBody) => {
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
  setSendingOrder, setOrderSucceeded, setOrderFailed, setOrderNumber, showOrderConfirmation, hideOrderConfirmation, sendOrder
};