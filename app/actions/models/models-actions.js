
import {
    MODELS_LOAD_START, MODELS_LOAD_DONE, MODELS_LOAD_FAIL
} from '../action-types';
import {routeKeys} from '../../common/router/router';
import {createLogger} from '../../common/logger';
import loadModels from './loadModels';

const log = createLogger(module, {console: true});

const MAX_PAGE_NUMBER = 50;

export function loadMoreModels() {

    return function (dispatch, getState) {

        const {models: {modelsFilterMap, pagesCount, loading}, router: {currentRoute}} = getState();

        if (loading || currentRoute.key !== routeKeys.catalog) {
            return null;
        }

        const {filterKey} = currentRoute;

        const loadedPagesCount = modelsFilterMap[filterKey] ? modelsFilterMap[filterKey].length : 0;

        const page = loadedPagesCount + 1;

        const maxPageNumber = Math.min(MAX_PAGE_NUMBER, pagesCount[filterKey] || MAX_PAGE_NUMBER);

        if (page > maxPageNumber) {
            return null;
        }

        loadModels(dispatch, getState, currentRoute, page);
    }
}
