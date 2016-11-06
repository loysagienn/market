import {createLogger} from '../logger';
import {BATCH_ACTIONS} from '../../actions/action-types';

const log = createLogger(module, {console: true});

const actionLogger = store => next => action => {

    logAction(action);

    const result = next(action);

    log.custom('next state: ', 'color: #009688', store.getState());

    return result;
};

export default actionLogger;


function logAction(action) {
    if (action.type === BATCH_ACTIONS) {
        return action.actions.forEach(action => logAction(action));
    }

    log.custom(
        action.type, 'color: #009688; border-left: 3px solid #009688; padding-left: 5px',
        Object.keys(action)
            .filter(key => key !== 'type')
            .reduce((result, key) => Object.assign(result, {[key]: action[key]}), {})
    );
}
