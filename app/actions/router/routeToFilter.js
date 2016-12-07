
import {stringifyQueryParams} from '../../common/helpers';
import {routeTo} from './router-actions';


export default function routeToFilter(filter) {
    return function(dispatch, getState) {

        const {categories: {filterCategoryId: categoryId}, filters} = getState();

        const {values = {}} = filters[categoryId] || {};

        const newValues = Object.assign({}, values);

        Object.keys(filter).forEach(key => {
            if (filter[key] === null) {
                delete newValues[key];
            } else {
                newValues[key] = filter[key]
            }
        });

        const queryParams = stringifyQueryParams(newValues);

        dispatch(routeTo({path: `catalog-${categoryId + queryParams}`}));
    }

}
