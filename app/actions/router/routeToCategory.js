
import {stringifyQueryParams} from '../../common/helpers';
import {routeTo} from './router-actions';


export default function routeToCategory(categoryId) {
    return function(dispatch, getState) {
        const {filters} = getState();

        const {values = {}} = filters[categoryId] || {};

        const queryParams = stringifyQueryParams(values);

        dispatch(routeTo({path: `catalog-${categoryId + queryParams}`}));
    }
}
