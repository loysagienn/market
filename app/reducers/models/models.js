import {combineReducers} from 'redux';
import {MODELS_LOAD_START, MODELS_LOAD_DONE, MODELS_LOAD_FAIL} from '../../actions/action-types';
import {createLogger} from '../../common/logger';

const log = createLogger(module);



export default combineReducers({
    modelsFilterMap,
    pagesCount,
    modelsMap,
    offersMap,
    loading
})

function pagesCount(state = {}, action) {

    if (action.type === MODELS_LOAD_DONE) {

        const {filterKey, page, morePagesCount} = action;

        state = Object.assign({}, {[filterKey]: page + morePagesCount});
    }

    return state;
}

function modelsFilterMap(state = {}, action) {
    if (action.type === MODELS_LOAD_DONE) {

        const {filterKey, list, page} = action;

        state = Object.assign({}, state);

        state[filterKey] = (state[filterKey] || []).slice();

        state[filterKey][page - 1] = list.map(
            ({model, offer}) => Object.assign({}, model ? {modelId: model.id} : {}, offer ? {offerId: offer.id} : {})
        );

    }

    return state;
}

function modelsMap(state = {}, action) {
    if (action.type === MODELS_LOAD_DONE) {

        const {list} = action;

        state = Object.assign({}, state);

        return list.reduce((state, {model}) => model ? Object.assign(state, {[model.id]: model}) : state, state);
    }

    return state;
}

function offersMap(state = {}, action) {
    if (action.type === MODELS_LOAD_DONE) {

        const {list} = action;

        state = Object.assign({}, state);

        return list.reduce((state, {offer}) => offer ? Object.assign(state, {[offer.id]: offer}) : state, state);
    }

    return state;
}

function loading(state = false, action) {

    switch (action.type) {
        case MODELS_LOAD_START:

            return true;

        case MODELS_LOAD_DONE:
        case MODELS_LOAD_FAIL:

            return false;
    }

    return state;
}
