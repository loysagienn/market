import {methodExists} from '../../common/api';
import api from './api';
import {createLogger} from '../../common/logger';
import {routeKeys} from '../../common/router/router';

const log = createLogger(module);

const defaultErrors = {
    methodNotFond: {
        code: 404,
        description: 'not found'
    },
    serverError: {
        code: 500,
        description: 'server error'
    }
};

export default (route, {ip}) => new Promise(resolve => {

    if (route === null) {
        sendNotFound(resolve);
        return;
    }

    const key = getApiKey(route);

    if (!methodExists(api, key)) {
        sendNotFound(resolve);
        return;
    }

    api[key](getMethodParams(route, ip))
        .then(data => sendData(resolve, data))
        .catch((errors, code = 500) => sendError(resolve, errors, code));
});

function getApiKey(route) {

    switch(route.key) {

        case routeKeys.marketApiMethod:

            return route.methodName;
    }

    return route.key;
}

function getMethodParams({key, queryParams: params}, ip) {
    switch(key) {

        case routeKeys.marketApiMethod:

            return {params, ip};
    }

    return params;
}

function sendNotFound(resolve) {
    sendError(resolve, [defaultErrors.methodNotFond.description], defaultErrors.methodNotFond.code);
}

function sendData(resolve, data) {
    try {
        const body = JSON.stringify({result: data});
        resolve({
            headers: {
                'Content-Type': 'application/json'
            },
            body,
            code: 200
        });
    } catch (error) {
        log.error(error);
        sendError(resolve, [defaultErrors.serverError], 500);
    }
}

function sendError(resolve, errors, code) {
    resolve({
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({errors}),
        code: code || 500
    });
}
