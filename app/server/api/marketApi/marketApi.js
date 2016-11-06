import requestDev from './marketApiDev';
import requestProd from './marketApiProd';
import {addMethod} from '../../../common/api';
import config from '../../../config';
import {marketApiMethods} from '../../../common/router/router';

const marketApiCacheTimeouts = {
    getCategoryChildren: 1000 * 60 * 60,
    getCategoryInfo: 1000 * 60 * 60,
    getCategoryFilters: 1000 * 60 * 60
};

const request = config.isProdMode ? requestProd : requestDev;


export function addMarketApiMethods(api) {

    marketApiMethods.forEach(methodName => addMethod(
        api,
        methodName,
        ({params, ip}) => request({params, ip, methodName}),
        marketApiCacheTimeouts[methodName] || 0
    ));
}

