import {BATCH_ACTIONS} from '../../actions/action-types';
import {immediate} from '../../common/helpers';

const batchThunk = ({dispatch, getState}) => next => action => {

    if (typeof action !== 'function') {
        return next(action);
    }

    const actions = [];
    let collectActions = true;

    action(
        (...newActions) => collectActions
            ? newActions.forEach(action => typeof action === 'function' ? dispatch(action) : actions.push(action))
            : newActions.forEach(dispatch),
        getState
    );

    if (actions.length > 0) {
        actions.length === 1 ? dispatch(actions[0]) : dispatch({type: BATCH_ACTIONS, actions});
    }

    collectActions = false;
};

export default batchThunk;
