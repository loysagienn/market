import {ROUTE_TO} from '../action-types';
import {getRouteByPath, routeKeys} from '../../common/router/router';
import {createLogger} from '../../common/logger';
import routeToIndex from './routeToIndex';
import routeToFilter from './routeToFilter';
import routeToModel from './routeToModel';

const log = createLogger(module, {console: true});



export function routeTo({path = '', route}) {
    return function(dispatch, getState) {

        route = getRoute(path, route, getState);

        dispatch({type: ROUTE_TO, route});

        switch (route.key) {
            case routeKeys.index:

                return routeToIndex(dispatch, getState, route);

            case routeKeys.models:

                return routeToFilter(dispatch, getState, route);

            case routeKeys.model:

                return routeToModel(dispatch, getState, route);
        }
    }
}

function getRoute(path, route, getState) {

    const {categories: {rootCategoryId}} = getState();

    route = route || getRouteByPath(path);

    if (route.key === routeKeys.models && route.filter.categoryId === rootCategoryId) {

        return Object.assign(getRouteByPath('/'), {childRoute: route.childRoute});
    }

    return route;
}
