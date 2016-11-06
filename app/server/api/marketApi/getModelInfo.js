import {getOptions, API_VERSION} from './marketApiProd';
import {stringifyQueryParams} from '../../../common/helpers';


export default function getModelInfo({params, request}) {

    const {modelId} = params;

    const requestPath = `model/${modelId}`;

    const queryParams = {
        remote_ip: params.ip
    };

    const path = `/${API_VERSION}/${requestPath}.json${stringifyQueryParams(queryParams)}`;

    const options = getOptions(path);

    return request(options).then(({model}) => model);
}
