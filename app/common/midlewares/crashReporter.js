import {createLogger} from '../logger';

const log = createLogger(module, {console: true});

const crashReporter = store => next => action => {
    try {
        return next(action);
    } catch (error) {
        log.error('error dispatching', action, error);
    }
};

export default crashReporter;
