import {parseQueryParams} from '../helpers';

export const marketApiMethods = [
    'getCategoryChildren',
    'getCategoryInfo',
    'getCategoryFilters',
    'getModels',
    'getModelInfo'
];

export const marketApiMethodsSet = new Set(marketApiMethods);

export default {
    api: {
        getRoute(pathItem) {
            return pathItem === 'api' ? {} : null;
        },
        getPath() {
            return 'api';
        },
        childRouteNodeKeys: ['marketApiMethod']
    },
    marketApiMethod: {
        getRoute(pathItem) {
            const [methodName, queryStr] = pathItem.split('?');

            if (marketApiMethodsSet.has(methodName)) {
                return {
                    methodName,
                    queryParams: parseQueryParams(queryStr)
                }
            }

            return null;
        },
        getPath(route) {
            return route.methodName;
        },
        childRouteNodeKeys: []
    }
};
