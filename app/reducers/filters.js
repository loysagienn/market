import {LOAD_FILTERS_START, LOAD_FILTERS_DONE, LOAD_FILTERS_FAIL} from '../actions/action-types';

export default function filters(state = {}, action) {

    const {categoryId} = action;

    switch (action.type) {
        case LOAD_FILTERS_START:

            return Object.assign({}, state, {[categoryId]: loadFiltersStart(state[categoryId])});

        case LOAD_FILTERS_DONE:

            const {filters} = action;

            return Object.assign({}, state, {[categoryId]: loadFiltersDone(state[categoryId], filters)});

        case LOAD_FILTERS_FAIL:

            const {error} = action;

            return Object.assign({}, state, {[categoryId]: loadFiltersFail(state[categoryId], error)});
    }

    return state;
}

function loadFiltersStart(categoryFilters = {}) {
    return Object.assign({}, categoryFilters, {loading: true});
}

function loadFiltersDone(categoryFilters = {}, filters) {
    return Object.assign({}, categoryFilters, {loading: false, filters});
}

function loadFiltersFail(categoryFilters = {}, error) {
    return Object.assign({}, categoryFilters, {loading: false, error});
}
