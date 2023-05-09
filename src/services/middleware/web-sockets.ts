import type { Middleware, MiddlewareAPI } from 'redux';
import type { AppDispatch, RootState, TAppActions } from '../types';
import { getCookie } from '../../utils/functions';
import { accessToken } from '../../utils/constants';
import { feedWsActionTypes } from '../actions/order-feed-ws';
import { historyWsActionTypes } from '../actions/order-history-ws';

const webSocketMiddleware = (url: string, wsActionTypes: typeof feedWsActionTypes | typeof historyWsActionTypes, sendToken?: boolean): Middleware => {
  return ({ dispatch }: MiddlewareAPI<AppDispatch, RootState>) => {
    let wsConnection: WebSocket | null = null;
    return (next) => (action: TAppActions) => {
      if (action.type === wsActionTypes.start) {
        if (sendToken) {
          wsConnection = new WebSocket(`${url}?token=${getCookie(accessToken)}`);
        } else {
          wsConnection = new WebSocket(url);
        }

        wsConnection.onopen = event => dispatch({ type: wsActionTypes.onOpen, event });
        wsConnection.onerror = event => dispatch({ type: wsActionTypes.onError, event });
        wsConnection.onmessage = event => {
          const parsedMessage = JSON.parse(event.data);
          dispatch({ type: wsActionTypes.onMessage, data: parsedMessage });
        };
        wsConnection.onclose = event => dispatch({ type: wsActionTypes.onClose, event });
      }

      if (action.type === wsActionTypes.close) {
        (wsConnection as WebSocket).close();
      }
      next(action);
    }
  };
};

export { webSocketMiddleware };