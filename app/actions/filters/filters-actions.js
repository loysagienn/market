import {UPDATE_FILTER} from '../action-types';
import {routeKeys} from '../../common/router/router';

export function updateFilter(filter) {
    return function(dispatch, getState) {

        const {categories: {filterCategoryId: categoryId}, filters} = getState();

        const {values} = filters[categoryId] || {};

        const filterValues = Object.assign({}, values, filter);

        dispatch({type: UPDATE_FILTER, categoryId, filterValues});
    }
}
