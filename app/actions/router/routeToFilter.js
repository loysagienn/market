import {
    ROUTE_LOAD_START, ROUTE_LOAD_DONE, ROUTE_LOAD_FAIL,
    CATEGORIES_LOAD_START, CATEGORIES_LOAD_DONE, CATEGORIES_LOAD_FAIL,
    MODELS_LOAD_START, MODELS_LOAD_DONE, MODELS_LOAD_FAIL,
    LOAD_FILTERS_START, LOAD_FILTERS_DONE, LOAD_FILTERS_FAIL
} from '../action-types';
import {categoryChildrenLoaded, loadCategories} from '../../common/categoriesLoader';
import {createLogger} from '../../common/logger';

const log = createLogger(module, {console: true});

export default function routeToFilter(dispatch, getState, route) {

    const dataPromises = [];

    checkModels(dispatch, getState, route, dataPromises);

    checkCategories(dispatch, getState, route, dataPromises);

    checkFilters(dispatch, getState, route, dataPromises);

    if (dataPromises.length === 0) {
        return;
    }

    dispatch({type: ROUTE_LOAD_START, route});

    Promise.all(dataPromises)
        .then(() => dispatch({type: ROUTE_LOAD_DONE, route}))
        .catch(error => dispatch({type: ROUTE_LOAD_FAIL, route, error}));
}

function checkFilters(dispatch, getState, route, dataPromises) {

    const {api} = getState();
    const {filter: {categoryId} = {}} = route;

    dispatch({type: LOAD_FILTERS_START, categoryId});

    const filtersPromise = api.getCategoryFilters({
        categoryId,
        vendor_max_values: 10
    });

    filtersPromise
        .then(({filters}) => dispatch({type: LOAD_FILTERS_DONE, filters, categoryId}))
        .catch(error => dispatch({type: LOAD_FILTERS_FAIL, error, categoryId}));

    dataPromises.push(filtersPromise);
}

function checkModels(dispatch, getState, route, dataPromises) {

    const {models: {modelsFilterMap}, api} = getState();
    const {filter, filterKey} = route;
    const {categoryId} = filter;

    if (!(filterKey in modelsFilterMap)) {

        dispatch({type: MODELS_LOAD_START, filterKey});

        const page = 1;

        const modelsPromise = api.getModels({categoryId, count: 10, page});

        modelsPromise
            .then(({list, morePagesCount}) => dispatch({type: MODELS_LOAD_DONE, list, morePagesCount, filterKey, page}))
            .catch(error => dispatch({type: MODELS_LOAD_FAIL, error, filterKey, page}));

        dataPromises.push(modelsPromise);
    }
}

function checkCategories(dispatch, getState, route, dataPromises) {

    const {categories: {categoriesMap, rootCategoryId}, api} = getState();
    const {filter: {categoryId} = {}} = route;

    if (!categoryChildrenLoaded(categoriesMap, categoryId)) {
        dispatch({type: CATEGORIES_LOAD_START});

        const categoriesPromise = loadCategories(api, categoriesMap, categoryId, rootCategoryId);

        categoriesPromise
            .then(categories => dispatch({type: CATEGORIES_LOAD_DONE, categories}))
            .catch(error => dispatch({type: CATEGORIES_LOAD_FAIL, error}));

        dataPromises.push(categoriesPromise);
    }
}
