import {
    ROUTE_LOAD_START, ROUTE_LOAD_DONE, ROUTE_LOAD_FAIL,
    CATEGORIES_LOAD_START, CATEGORIES_LOAD_DONE, CATEGORIES_LOAD_FAIL,
    MODELS_LOAD_START, MODELS_LOAD_DONE, MODELS_LOAD_FAIL, MODELS_LIST_SWITCH
} from '../action-types';
import {categoryChildrenLoaded, loadCategories} from '../../common/categoriesLoader';
import {createLogger} from '../../common/logger';

const log = createLogger(module, {console: true});



export default function routeToFilter(dispatch, getState, route) {

    const {categories: {categoriesMap, rootCategoryId}, models: {modelsFilterMap}, api} = getState();
    const {filter, filterKey} = route;
    const {categoryId} = filter;

    const dataPromises = [];

    if (filterKey in modelsFilterMap) {
        dispatch({type: MODELS_LIST_SWITCH, filterKey});
    } else {
        dispatch({type: MODELS_LOAD_START, filterKey});
        dispatch({type: MODELS_LIST_SWITCH, filterKey});

        const page = 1;

        const modelsPromise = api.getModels({categoryId, count: 10, page});

        modelsPromise
            .then(({list, morePagesCount}) => dispatch({type: MODELS_LOAD_DONE, list, morePagesCount, filterKey, page}))
            .catch(error => {
                log.error(error);
                dispatch({type: MODELS_LOAD_FAIL, error, filterKey, page});
            });

        dataPromises.push(modelsPromise);
    }

    if (!categoryChildrenLoaded(categoriesMap, categoryId)) {
        dispatch({type: CATEGORIES_LOAD_START});

        const categoriesPromise = loadCategories(api, categoriesMap, categoryId, rootCategoryId);

        categoriesPromise
            .then(categories => dispatch({type: CATEGORIES_LOAD_DONE, categories}))
            .catch(error => {
                log.error(error);
                dispatch({type: CATEGORIES_LOAD_FAIL, error})
            });

        dataPromises.push(categoriesPromise);
    }

    if (dataPromises.length === 0) {
        return;
    }

    dispatch({type: ROUTE_LOAD_START, route});

    Promise.all(dataPromises)
        .then(() => dispatch({type: ROUTE_LOAD_DONE, route}))
        .catch(error => {
            log.error(error);
            dispatch({type: ROUTE_LOAD_FAIL, route, error})
        });
}
