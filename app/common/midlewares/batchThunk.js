import {BATCH_ACTIONS} from '../../actions/action-types';
import {immediate} from '../../common/helpers';

const batchThunk = ({dispatch, getState}) => next => action => {

    if (typeof action !== 'function') {
        return next(action);
    }

    let actions = [];
    let collectActionsPromise = null;

    const fakeDispatch = (...newActions) => {
        newActions.forEach(action => typeof action === 'function' ? dispatch(action) : actions.push(action));
        if (collectActionsPromise === null) {
            collectActionsPromise = new Promise(resolve => {
                immediate(() => {
                    if (actions.length > 0) {
                        actions.length === 1 ? dispatch(actions[0]) : dispatch({type: BATCH_ACTIONS, actions});
                        actions = [];
                    }
                    collectActionsPromise = null;
                    resolve();
                });
            });
        }
        return collectActionsPromise;
    };

    action(fakeDispatch, getState);
};

export default batchThunk;
