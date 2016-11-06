import {
    ROUTE_LOAD_START, ROUTE_LOAD_DONE, ROUTE_LOAD_FAIL,
    CATEGORIES_LOAD_START, CATEGORIES_LOAD_DONE, CATEGORIES_LOAD_FAIL
} from '../action-types';
import {categoryChildrenLoaded, loadCategories} from '../../common/categoriesLoader';
import {createLogger} from '../../common/logger';

const log = createLogger(module, {console: true});



export default function routeToIndex(dispatch, getState, route) {

    const {categories: {categoriesMap, rootCategoryId}, api} = getState();

    if (categoryChildrenLoaded(categoriesMap, rootCategoryId)) {
        return;
    }

    dispatch(
        {type: ROUTE_LOAD_START, route},
        {type: CATEGORIES_LOAD_START}
    );

    loadCategories(api, categoriesMap, rootCategoryId, rootCategoryId)
        .then(categories => dispatch(
            {type: ROUTE_LOAD_DONE, route},
            {type: CATEGORIES_LOAD_DONE, categories}
        ))
        .catch(error => {
            log.error(error);
            dispatch(
                {type: ROUTE_LOAD_FAIL, route, error},
                {type: CATEGORIES_LOAD_FAIL, error}
            );
        });
}
