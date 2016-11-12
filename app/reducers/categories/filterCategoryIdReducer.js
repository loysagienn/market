import {ROUTE_TO} from '../../actions/action-types';
import {routeKeys} from '../../common/router/router';


export default function filterCategoryIdReducer(state, action, rootCategoryId) {

    if (action.type === ROUTE_TO) {

        const {route} = action;

        if (route.key === routeKeys.models) {
            return route.categoryId || rootCategoryId;
        }

        if (route.key === routeKeys.index && route.childRoute === null) {
            return rootCategoryId;
        }
    }

    return state || rootCategoryId;
}
