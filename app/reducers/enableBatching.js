
import {BATCH_ACTIONS} from '../actions/action-types';

/**
 * Позволяет обрабатывать батчевые action'ы
 * @param reducer
 * @returns {object}
 */
export default function enableBatching(reducer) {
    return function batchingReducer(state, action) {
        return action.type === BATCH_ACTIONS
            ? action.actions.reduce(batchingReducer, state)
            : reducer(state, action);
    }
}
