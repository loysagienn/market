export default {
    index: {
        getRoute() {
            return {};
        },
        getPath() {
            return '';
        },
        childRouteNodeKeys: ['user', 'api', 'category', 'model', 'catalog', 'settings', 'examples']
    },
    notFound: {
        getRoute(path = null) {
            return {path};
        },
        getPath() {
            return 'not-found';
        },
        childRouteNodeKeys: []
    }
};
