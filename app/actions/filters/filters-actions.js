import {UPDATE_FILTER} from '../action-types';
import {routeKeys} from '../../common/router/router';

export function updateFilter(filter) {
    return function(dispatch, getState) {

        const {categories: {filterCategoryId: categoryId}} = getState();

        dispatch({type: UPDATE_FILTER, categoryId, filter});
    }
}
