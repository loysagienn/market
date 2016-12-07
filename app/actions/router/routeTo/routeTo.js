import {ROUTE_TO} from '../../action-types';
import {getRouteByPath, routeKeys} from '../../../common/router/router';
import {createLogger} from '../../../common/logger';
import routeToIndex from './routeToIndex';
import routeToCatalog from './routeToCatalog';
import routeToModel from './routeToModel';

const log = createLogger(module, {console: true});

export default function routeTo({path = '', route}) {
    return function(dispatch, getState) {

        route = getRoute(path, route, getState);

        if (route === null) {
            return;
        }

        dispatch({type: ROUTE_TO, route});

        switch (route.key) {
            case routeKeys.index:

                return routeToIndex(dispatch, getState, route);

            case routeKeys.catalog:

                return routeToCatalog(dispatch, getState, route);

            case routeKeys.model:

                return routeToModel(dispatch, getState, route);
        }
    }
}

function getRoute(path, route, getState) {

    const {categories: {rootCategoryId}, filters, router: {currentRoute}} = getState();

    route = route || getRouteByPath(path);

    if (route.key === routeKeys.catalog) {

        const {categoryId, filterKey} = route;

        // При попытке перейти к рутовой категории меняем роут на главную страницу
        if (categoryId === rootCategoryId) {
            return Object.assign(getRouteByPath('/'), {childRoute: route.childRoute});
        }

        if (currentRoute.key === routeKeys.catalog && filterKey === currentRoute.filterKey) {
            return null;
        }
    }

    return route;
}
