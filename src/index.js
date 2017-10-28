import React from 'react';
import { render } from 'react-dom';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { sessionService } from 'redux-react-session';
import thunk from 'redux-thunk';

import reducer from './reducers'
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { createWebSocketMiddleware, initializeWebSocket } from './middlewares/websocket'

const store = createStore(
    reducer,
    applyMiddleware(
        thunk,
        createWebSocketMiddleware(initializeWebSocket(process.env.NODE_ENV))
    )
)

sessionService.initSessionService(store, {driver: 'COOKIES'} )

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
