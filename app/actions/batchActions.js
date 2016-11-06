import {BATCH_ACTIONS} from './action-types';

export default function batchActions(...actions) {

    if (actions.length === 1 && actions[0].reduce) {
        actions = actions[0];
    }

    return {type: BATCH_ACTIONS, actions};

}
