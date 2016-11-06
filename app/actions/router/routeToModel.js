import {
    ROUTE_LOAD_START, ROUTE_LOAD_DONE, ROUTE_LOAD_FAIL,
    MODEL_INFO_LOAD_START, MODEL_INFO_LOAD_DONE, MODEL_INFO_LOAD_FAIL
} from '../action-types';
import {createLogger} from '../../common/logger';

const log = createLogger(module, {console: true});



export default function routeToModel(dispatch, getState, route) {

    const {models: {modelsMap}, api} = getState();
    const {modelId} = route;

    // if (modelId in modelsMap) {
    //     return;
    // }

    dispatch(
        {type: ROUTE_LOAD_START, route},
        {type: MODEL_INFO_LOAD_START, modelId}
    );

    api.getModelInfo({modelId})
        .then(model => dispatch(
            {type: ROUTE_LOAD_DONE, route},
            {type: MODEL_INFO_LOAD_DONE, model}
        ))
        .catch(error => {
            log.error(error);
            dispatch(
                {type: ROUTE_LOAD_FAIL, route, error},
                {type: MODEL_INFO_LOAD_FAIL, error}
            )
        });
}
