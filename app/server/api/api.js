import {createApi} from '../../common/api';
import {addMarketApiMethods} from './marketApi/marketApi';

const api = createApi();

addMarketApiMethods(api);

export {default as handleApiCall} from './handleApiCall';

export default api;
