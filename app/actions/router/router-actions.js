import {ROUTE_TO} from '../action-types';
import {getRouteByPath, routeKeys} from '../../common/router/router';
import {createLogger} from '../../common/logger';
import routeToIndex from './routeToIndex';
import routeToFilter from './routeToFilter';
import routeToModel from './routeToModel';
import {stringifyQueryParams} from '../../common/helpers';

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

export function routeToActualFilter() {
    return function(dispatch, getState) {
        const {categories: {focusedCategoryId: categoryId}, filters} = getState();

        const {values = {}} = filters[categoryId] || {};

        const queryParams = stringifyQueryParams(Object.assign({categoryId}, values));

        dispatch(routeTo({path: `models${queryParams}`}));
    }

}

function getRoute(path, route, getState) {

    const {categories: {rootCategoryId}} = getState();

    route = route || getRouteByPath(path);

    // При попытке перейти к рутовой категории меняем роут на главную страницу
    if (route.key === routeKeys.models && route.categoryId === rootCategoryId) {

        return Object.assign(getRouteByPath('/'), {childRoute: route.childRoute});
    }

    return route;
}
