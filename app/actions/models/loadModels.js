import {MODELS_LOAD_START, MODELS_LOAD_DONE, MODELS_LOAD_FAIL} from '../action-types';



export default function loadModels(dispatch, getState, route, page = 1) {
    const {api} = getState();
    const {categoryId, filterValues, filterKey} = route;

    dispatch({type: MODELS_LOAD_START, filterKey, page});

    const modelsPromise = api.getModels(Object.assign({categoryId, count: 10, page}, filterValues));

    modelsPromise
        .then(({list, morePagesCount}) => dispatch({type: MODELS_LOAD_DONE, list, morePagesCount, filterKey, page}))
        .catch(error => dispatch({type: MODELS_LOAD_FAIL, error, filterKey, page}));

    return modelsPromise;
}
