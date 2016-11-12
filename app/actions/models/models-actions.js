
import {
    MODELS_LOAD_START, MODELS_LOAD_DONE, MODELS_LOAD_FAIL
} from '../action-types';
import {routeKeys} from '../../common/router/router';
import {createLogger} from '../../common/logger';

const log = createLogger(module, {console: true});

const MAX_PAGE_NUMBER = 50;

export function loadMoreModels() {

    return function (dispatch, getState) {

        const {models: {modelsFilterMap, pagesCount, loading}, api, router: {currentRoute}} = getState();

        if (loading || currentRoute.key !== routeKeys.models) {
            return null;
        }

        const {filterKey, categoryId, filterValues} = currentRoute;

        const loadedPagesCount = modelsFilterMap[filterKey] ? modelsFilterMap[filterKey].length : 0;

        const page = loadedPagesCount + 1;

        const maxPageNumber = Math.min(MAX_PAGE_NUMBER, pagesCount[filterKey] || MAX_PAGE_NUMBER);

        if (page > maxPageNumber) {
            return null;
        }

        dispatch({type: MODELS_LOAD_START, filterKey, page});

        api.getModels(Object.assign({categoryId, count: 10, page}, filterValues))
            .then(({list, morePagesCount}) => dispatch({type: MODELS_LOAD_DONE, list, morePagesCount, filterKey, page}))
            .catch(error => dispatch({type: MODELS_LOAD_FAIL, error, filterKey, page}));
    }
}
