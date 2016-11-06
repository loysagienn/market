import {BATCH_ACTIONS} from '../../actions/action-types';
import {immediate} from '../../common/helpers';

const batchThunk = ({dispatch, getState}) => next => action => {

    if (typeof action !== 'function') {
        return next(action);
    }

    let actions = [];
    let collectActions = false;

    const fakeDispatch = (...newActions) => {
        if (!collectActions) {
            collectActions = true;
            immediate(() => {
                if (actions.length > 0) {
                    actions.length === 1 ? dispatch(actions[0]) : dispatch({type: BATCH_ACTIONS, actions});
                    actions = [];
                }
                collectActions = false;
            });
        }
        newActions.forEach(action => typeof action === 'function' ? dispatch(action) : actions.push(action));
    };

    action(fakeDispatch, getState);
};

export default batchThunk;
