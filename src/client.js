import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import createRoutes from './routes';
import { configureStore } from './store';

const initialState = window.__INITIAL_STATE__;

const store = configureStore(initialState);
const routes = createRoutes(store);

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('approot'));
