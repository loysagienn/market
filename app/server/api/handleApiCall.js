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

export default function handleApiCall(route, req, res) {

    res.setHeader('Content-Type', 'application/json');

    if (route === null) {
        sendNotFound(res);
        return;
    }

    const key = getApiKey(route);

    if (!methodExists(api, key)) {
        sendNotFound(res);
        return;
    }

    api[key](getMethodParams(route, req))
        .then(data => sendData(res, data))
        .catch((errors, code = 500) => sendError(res, errors, code));
}

function getApiKey(route) {

    switch(route.key) {

        case routeKeys.marketApiMethod:

            return route.methodName;
    }

    return route.key;
}

function getMethodParams({key, queryParams: params}, req) {
    switch(key) {

        case routeKeys.marketApiMethod:

            return {params, ip: req.ip};
    }

    return params;
}

function sendNotFound(res) {
    sendError(res, [defaultErrors.methodNotFond.description], defaultErrors.methodNotFond.code);
}

function sendData(res, data) {
    try {
        const dataStr = JSON.stringify({result: data});
        res.end(dataStr);
    } catch (error) {
        log.error(error);
        sendError(res, [defaultErrors.serverError], 500);
    }
}

function sendError(res, errors, code) {
    res.status(code || 500);
    res.end(JSON.stringify({errors}));
}
