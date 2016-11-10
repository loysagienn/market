
import {
    MODELS_LOAD_START, MODELS_LOAD_DONE, MODELS_LOAD_FAIL
} from '../action-types';
import {routeKeys} from '../../common/router/router';
import {createLogger} from '../../common/logger';

const log = createLogger(module, {console: true});


export function loadMoreModels() {

    return function (dispatch, getState) {

        const {models: {modelsFilterMap, loading}, api, router: {currentRoute}} = getState();

        if (loading || currentRoute.key !== routeKeys.models) {
            return null;
        }

        const {filterKey, filter: {categoryId}} = currentRoute;

        const models = modelsFilterMap[filterKey];

        const page = models.length + 1;

        dispatch({type: MODELS_LOAD_START, filterKey});

        api.getModels({categoryId, count: 10, page})
            .then(({list, morePagesCount}) => dispatch({type: MODELS_LOAD_DONE, list, morePagesCount, filterKey, page}))
            .catch(error => dispatch({type: MODELS_LOAD_FAIL, error, filterKey, page}));
    }
}
