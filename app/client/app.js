import {createStore, applyMiddleware} from 'redux';
import {createElement} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createLogger} from './logger';
import reducers from '../reducers/reducers';
import router from './router';
import AppContainer from '../containers/App';
import crashReporter from '../common/midlewares/crashReporter';
import actionLogger from '../common/midlewares/actionLogger';
import batchThunk from '../common/midlewares/batchThunk';
import api from './api/api';
import {getSettingsFromCookie, subscribeSettings} from './cookie';

const log = createLogger(module);

const settings = getSettingsFromCookie();

const getDefaultState = () => Object.assign(window.__INITIAL_STATE__ || {}, {api, settings});

export function initApp(middleware = []) {
    const store = createStore(
        reducers,
        getDefaultState(),
        applyMiddleware(crashReporter, batchThunk, actionLogger, ...middleware)
    );

    router(store);
    subscribeSettings(store);

    const rootDOMNode = document.getElementById('app');

    render(
        createElement(Provider, {store}, createElement(AppContainer)),
        rootDOMNode
    );
}
