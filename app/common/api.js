import {getKeyByObject} from './helpers';

export function createApi() {

    const api = {
        methods: {},
        methodsWithCache: {},
        cache: {}
    };

    return new Proxy(api, {
        get(target, prop) {

            if (prop in target) {
                return target[prop];
            }

            const {methods, methodsWithCache} = target;

            if (prop in methodsWithCache) {
                return methodsWithCache[prop];
            }

            if (prop in methods) {
                return methods[prop];
            }

            return Promise.reject(`Method "${prop}" is not exist`);
        }
    });
}

export const addMethod = (api, name, method, cacheTimeout) => {
    const {methods, cache} = api;

    methods[name] = method;
    cache[name] = {};

    if (cacheTimeout) {
        setMethodCacheTimeout(api, name, cacheTimeout);
    }
};

export const addMethods = (api, obj) => Object.keys(obj).forEach(key => addMethod(api, key, obj[key]));

export const methodExists = (api, key) => key in api.methods;

export const setMethodCacheTimeout = (api, methodName, timeout) => {

    const {methods, cache, methodsWithCache} = api;

    if (!(methodName in methods)) {
        throw new Error(`${methodName} is not found in api`);
    }

    if (!timeout) {
        if (methodsWithCache[methodName]) {
            delete methodsWithCache[methodName];
        }

        cache[methodName] = {};

        return;
    }

    methodsWithCache[methodName] = params => {

        const requestKey = getKeyByObject(params);

        const methodCache = cache[methodName];

        if (methodCache[requestKey]) {
            return Promise.resolve(methodCache[requestKey]);
        }

        const requestPromise = methods[methodName](params);

        requestPromise.then(result => {
            methodCache[requestKey] = result;

            setTimeout(() => delete methodCache[requestKey], timeout);
        });

        return requestPromise;
    }
};

