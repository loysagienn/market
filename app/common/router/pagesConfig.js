import {stringifyQueryParams, parseQueryParams, getKeyByObject, objectPropFilter} from '../helpers';

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
    catalog: {
        getRoute(pathItem) {
            const [path, query] = pathItem.split('?');

            const match = path.match(/^catalog-([0-9]*)$/);
            if (!match) {
                return null;
            }
            const categoryId = +match[1];

            if (isNaN(categoryId)) {
                return null;
            }

            const filterValues = parseQueryParams(query) || {};

            const filterKey = getKeyByObject(Object.assign({categoryId}, filterValues));

            return {categoryId, filterValues, filterKey};
        },
        getPath({categoryId, filterValues}) {
            filterValues = objectPropFilter(filterValues, value => value);

            return `catalog-${categoryId + stringifyQueryParams(filterValues)}`;
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
    },
    examples: {
        getRoute(pathItem) {
            if (pathItem === 'examples') {
                return {};
            }

            return null;
        },
        getPath() {
            return 'examples';
        },
        childRouteNodeKeys: []
    }
};
