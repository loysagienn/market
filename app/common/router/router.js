import pagesConfig from './pagesConfig';
import apiConfig from './apiConfig';
import commonConfig from './commonConfig';


export {marketApiMethods, marketApiMethodsSet} from './apiConfig';


const config = Object.assign(pagesConfig, apiConfig, commonConfig);

export const routeKeys = Object.keys(config).reduce((routeKeys, key) => Object.assign(routeKeys, {[key]: key}), {});


export function getPathByRoute(route) {
    if (route === null) {
        return '';
    }

    return '/' + config[route.key].getPath(route) + getPathByRoute(route.childRoute);
}

export function getRouteByPath(path) {
    const pathArr = path.split('/').filter(key => key);
    const route = getRoute(routeKeys.index);
    let currentRoute = route;

    for (let i = 0, l = pathArr.length; i < l; i++) {
        const nextRoute = getChildRoute(currentRoute.key, pathArr[i]);

        currentRoute = currentRoute.childRoute = nextRoute || getRoute(routeKeys.notFound, '/' + pathArr.join('/'));

        if (nextRoute === null) {
            break;
        }
    }

    currentRoute.childRoute = null;

    return route.childRoute || route;
}

function getRoute(key, pathItem) {
    const route = config[key].getRoute(pathItem);
    if (route === null) {
        return null;
    }

    return Object.assign(route, {key});
}

function getChildRoute(key, pathItem) {
    const {childRouteNodeKeys} = config[key];

    for (let i = 0, l = childRouteNodeKeys.length; i < l; i++) {
        const route = getRoute(childRouteNodeKeys[i], pathItem);
        if (route !== null) {
            return route;
        }
    }

    return null;
}
