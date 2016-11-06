import {ROUTE_TO, ROUTE_LOAD_START, ROUTE_LOAD_DONE, ROUTE_LOAD_FAIL} from '../actions/action-types';
import {combineReducers} from 'redux';

export default combineReducers({
    currentRoute,
    loading
});

function loading(state = false, action) {
    switch (action.type) {
        case ROUTE_LOAD_START:

            return true;

        case ROUTE_LOAD_DONE:
        case ROUTE_LOAD_FAIL:

            return false;
    }

    return state;
}

function currentRoute(state = {}, action) {
    if (action.type === ROUTE_TO) {
        return action.route;
    }

    return state;
}
