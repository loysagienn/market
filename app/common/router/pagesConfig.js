import {stringifyQueryParams, parseQueryParams, getKeyByObject} from '../helpers';

export default {
    user: {
        getRoute(pathItem) {
            const match = pathItem.match(/^user-([0-9]*)$/);
            if (!match) {
                return null;
            }
            const userId = +match[1];

            return isNaN(userId) ? null : {userId};
        },
        getPath(route) {
            return `user-${route.userId}`;
        },
        childRouteNodeKeys: []
    },
    category: {
        getRoute(pathItem) {
            const match = pathItem.match(/^category-([0-9]*)$/);
            if (!match) {
                return null;
            }
            const categoryId = +match[1];

            return isNaN(categoryId) ? null : {categoryId};
        },
        getPath({categoryId}) {
            return `category-${categoryId}`;
        },
        childRouteNodeKeys: []
    },
    models: {
        getRoute(pathItem) {
            const [path, query] = pathItem.split('?');

            if (path !== 'models') {
                return null;
            }

            const filter = parseQueryParams(query) || {};

            const categoryId = +filter.categoryId;

            if (isNaN(categoryId)) {
                return null;
            }

            const filterValues = Object.keys(filter).reduce(
                (filterValues, key) =>
                    key === 'categoryId' ? filterValues : Object.assign(filterValues, {[key]: filter[key]}),
                {}
            );

            const filterKey = getKeyByObject(filter);

            return {categoryId, filterValues, filterKey};
        },
        getPath({categoryId, filterValues}) {
            return `models${stringifyQueryParams(Object.assign({}, filterValues, {categoryId}))}`;
        },
        childRouteNodeKeys: []
    },
    model: {
        getRoute(pathItem) {

            const [path, query] = pathItem.split('?');

            if (path !== 'model') {
                return null;
            }

            const {id} = parseQueryParams(query);

            const modelId = +id;

            return isNaN(modelId) ? null : {modelId};
        },
        getPath({modelId}) {
            return `model?id=${modelId}`;
        },
        childRouteNodeKeys: []
    },
    settings: {
        getRoute(pathItem) {
            if (pathItem === 'settings') {
                return {};
            }

            return null;
        },
        getPath() {
            return 'settings';
        },
        childRouteNodeKeys: []
    }
};
