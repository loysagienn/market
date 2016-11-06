import {createApi, addMethods} from '../../common/api';
import {marketApiMethods} from '../../common/router/router';
import sendRequest from './sendRequest';



const api = createApi();

const methods = marketApiMethods.reduce(
    (methods, name) => Object.assign(
        methods,
        {[name]: params => sendRequest(name, params)}
    ),
    {}
);

addMethods(api, methods);

export default api;
