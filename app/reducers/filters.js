import {
    LOAD_FILTERS_START, LOAD_FILTERS_DONE, LOAD_FILTERS_FAIL, UPDATE_FILTER,
    ROUTE_TO
} from '../actions/action-types';
import {routeKeys} from '../common/router/router';

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

        case UPDATE_FILTER:

            const {filter} = action;

            return Object.assign({}, state, {[categoryId]: updateFilter(state[categoryId], filter)});

        case ROUTE_TO:

            const {route} = action;

            if (route.key === routeKeys.models) {
                const {categoryId, filterValues} = route;
                return Object.assign({}, state, {[categoryId]: updateFilters(state[categoryId], filterValues)});
            }

    }

    return state;
}

function updateFilters(categoryFilters = {}, values) {
    categoryFilters = Object.assign({values: {}}, categoryFilters);

    categoryFilters.values = Object.assign({}, categoryFilters.values, values);

    return categoryFilters;
}

function updateFilter(categoryFilters = {}, {key, value}) {

    categoryFilters = Object.assign({values: {}}, categoryFilters);

    categoryFilters.values = Object.assign({}, categoryFilters.values, {[key]: value});

    return categoryFilters;
}

function loadFiltersStart(categoryFilters = {}) {
    return Object.assign({}, categoryFilters, {loading: true});
}

function loadFiltersDone(categoryFilters = {}, filters) {
    filters.forEach(filter => filter.key = filter.shortname || filter.id);

    const filtersIds = filters.reduce((filtersIds, {id, key}) => Object.assign(filtersIds, {[key]: id}), {});

    return Object.assign({}, categoryFilters, {loading: false, filters, filtersIds});
}

function loadFiltersFail(categoryFilters = {}, error) {
    return Object.assign({}, categoryFilters, {loading: false, error});
}
