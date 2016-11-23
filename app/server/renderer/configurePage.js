import {createStore, applyMiddleware} from 'redux';
import batchThunk from '../../common/midlewares/batchThunk';
import crashReporter from '../../common/midlewares/crashReporter';
import actionLogger from '../../common/midlewares/actionLogger';
import React, {createElement} from 'react';
import {Provider} from 'react-redux';
import reducers from '../../reducers/reducers';
import App from '../../containers/App';
import {routeTo} from '../../actions/actions';
import {createApi, addMethods} from '../../common/api';
import {marketApiMethods} from '../../common/router/router';
import {renderToString} from 'react-dom/server';
import api from '../api/api';
import {createLogger} from '../logger';
import {DEFAULT_SETTINGS} from '../../common/constants';
import {getSettings} from '../../common/helpers';

const log = createLogger(module, {console: true});


export default function configurePage(route, req) {

    return new Promise(resolve => {

        const settings = getSettingsFromCookie(req);

        const {serverRenderingOn, preloadDataOnServer} = settings;

        if (!serverRenderingOn && !preloadDataOnServer) {
            return resolve();
        }

        const store = createStore(
            reducers,
            {api: createPageApi(req), settings},
            applyMiddleware(batchThunk, crashReporter)
        );

        const {getState, subscribe, dispatch} = store;

        const resolvePage = () => {

            if (getState().router.loading) {
                return;
            }

            let html = '';
            let initialState = getState();

            if (serverRenderingOn) {
                try {
                    html = renderToString(
                        createElement(
                            Provider,
                            {store},
                            createElement(App)
                        )
                    );
                } catch (error) {
                    log.error('render page on server error', error);
                }
            }

            resolve({html, initialState});
        };

        if (preloadDataOnServer) {
            subscribe(() => resolvePage());
            dispatch(routeTo({route}));
        } else {
            resolvePage();
        }

    })
}

function createPageApi(req) {

    const pageApi = createApi();

    addMethods(pageApi, marketApiMethods.reduce((methods, name) => {

        methods[name] = params => api[name]({params, ip: req.ip});

        return methods;

    }, {}));

    return pageApi;
}

function getSettingsFromCookie({cookies: {settings} = {}}) {
    if (!settings) {
        return DEFAULT_SETTINGS;
    }

    try {
        return getSettings(JSON.parse(settings));
    } catch (error) {
        return DEFAULT_SETTINGS;
    }
}
