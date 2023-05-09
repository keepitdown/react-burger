import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import rootReducer from './services/reducers';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { webSocketMiddleware } from './services/middleware/web-sockets';
import { FEED_WS_URL, HISTORY_WS_URL } from './utils/constants';
import { feedWsActionTypes } from './services/actions/order-feed-ws';
import { historyWsActionTypes } from './services/actions/order-history-ws';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, webSocketMiddleware(FEED_WS_URL, feedWsActionTypes), webSocketMiddleware(HISTORY_WS_URL, historyWsActionTypes, true)));

const store = createStore(rootReducer, enhancer);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();

export { store };