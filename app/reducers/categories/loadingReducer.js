import {CATEGORIES_LOAD_START, CATEGORIES_LOAD_DONE, CATEGORIES_LOAD_FAIL} from '../../actions/action-types';



export default function loadingReducer(state = false, action) {
    switch (action.type) {
        case CATEGORIES_LOAD_START:

            return true;

        case CATEGORIES_LOAD_DONE:
        case CATEGORIES_LOAD_FAIL:

            return false;
    }

    return state;
}
