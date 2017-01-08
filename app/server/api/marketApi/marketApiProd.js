
import https from 'https';
import config from '../../../config';
import {createLogger} from '../../../common/logger';
import getCategoryChildren from './getCategoryChildren';
import getCategoryInfo from './getCategoryInfo';
import getModels from './getModels';
import getCategoryFilters from './getCategoryFilters';
import getModelInfo from './getModelInfo';

const log = createLogger(module);
const HOSTNAME = 'api.content.market.yandex.ru';
const marketApiKey = config.privateConfig.marketApiKey || '';
const requestQueue = [];
const sendRequestTimeout = 300;
const requestMakers = {getCategoryChildren, getModels, getCategoryInfo, getCategoryFilters, getModelInfo};
let busy = false;


export const API_VERSION = 'v1';

export const getOptions = (path) => ({
    hostname: HOSTNAME,
    method: 'GET',
    path,
    headers: {
        Authorization: marketApiKey
    }
});

export default function ({params = {}, ip, methodName}) {

    params.ip = params.ip || ip;

    if (methodName in requestMakers) {
        return requestMakers[methodName]({params, request});
    }

    return Promise.reject({errors: [`method ${methodName} not found`]});
};



function request(options) {
    return new Promise((resolve, reject) => {
        processRequest({options, resolve, reject});
    });
}

function processRequest(params) {

    if (params) {
        requestQueue.push(params);
    }

    if (busy || requestQueue.length === 0) {
        return;
    }

    busy = true;

    makeRequest(requestQueue.shift());

    setTimeout(() => {
        busy = false;
        processRequest();
    }, sendRequestTimeout);
}

function makeRequest({options, resolve, reject}) {

    const request = https.request(options, res => {

        let resultStr = '';

        res.on('data', chunk => resultStr += chunk.toString());

        res.on('end', () => parseResponse(resultStr, options, resolve, reject));

    });

    request.on('error', error => reject([error], 500));

    request.end();
}

function parseResponse(resultStr, options, resolve, reject) {
    try {
        const result = JSON.parse(resultStr);
        const {errors} = result;

        if (errors && errors.length > 0) {
            log.error(errors);
            if (errors.length === 1 && errors[0] === 'Rate limit exceeded') {
                requestQueue.push({options, resolve, reject});
                processRequest();
                return;
            }
            reject(errors, 500);
        } else {
            resolve(result);
        }

    } catch (error) {
        log.error(error);
        reject(['parse server response error'], 500);
    }
}
