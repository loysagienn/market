import {CHANGE_SETTINGS} from '../action-types';

export function changeSettings(settings) {
    return {
        type: CHANGE_SETTINGS,
        settings
    }
}
