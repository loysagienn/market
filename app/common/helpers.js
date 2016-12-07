import {DEFAULT_SETTINGS} from './constants';

export function stringifyQueryParams(params = {}) {
    const keys = Object.keys(params);

    if (keys.length === 0) {
        return '';
    }

    return '?' + keys.map(key => `${key}=${params[key]}`).join('&');
}

export function parseQueryParams(paramsStr = '') {
    return paramsStr
        .split('&')
        .map(paramStr => paramStr.split('='))
        .filter(([key, value]) => key)
        .reduce((params, [key, value]) => Object.assign(params, {[key]: value}), {});
}

export function configClassName() {

    return Array.prototype.reduce.call(arguments, (className, arg) => {
        if (typeof(arg) === 'string' && arg) {
            className.push(arg);
        }

        if (typeof(arg) === 'object') {
            Object.keys(arg).forEach(key => arg[key] ? className.push(key) : null);
        }

        return className;
    }, []).join(' ');
}


/**
 * Преобразует объект в уникальный ключ, не передавать объекты с циклическими зависимостями
 * В отличие от JSON.stringify, сортирует свойства
 * @param params
 * @returns {string}
 */
export function getKeyByObject(params) {

    if (typeof params === 'object' && params !== null) {
        return '{' + Object.keys(params).sort().map(key => `${key}:${getKeyByObject(params[key])}`).join(',') + '}';
    }

    return String(params);
}

export function objectPropFilter(obj, filterFunction) {
    return Object.keys(obj).reduce((result, key) => {
        if (filterFunction(obj[key])) {
            return Object.assign(result, {[key]: obj[key]});
        }
        return result;
    }, {});
}

export const immediate = (typeof setImmediate === 'function') ? setImmediate : func => Promise.resolve().then(func);

export function getSettings(cookieSettings) {

    return Object.keys(DEFAULT_SETTINGS)
        .reduce(
            (settings, key) =>
                Object.assign(settings, {[key]: (key in cookieSettings) ? cookieSettings[key] : DEFAULT_SETTINGS[key]}),
            {}
        );
}
