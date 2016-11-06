import {CHANGE_SETTINGS} from '../actions/action-types';
import {DEFAULT_SETTINGS} from '../common/constants';

export default function settings(state = DEFAULT_SETTINGS, action) {
    if (action.type === CHANGE_SETTINGS) {
        return Object.assign({}, state, action.settings);
    }

    return state;
}
