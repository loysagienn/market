import {getOptions, API_VERSION} from './marketApiProd';
import {stringifyQueryParams} from '../../../common/helpers';


export default function getCategoryFilters({params, request}) {

    const {categoryId} = params;

    const categoryPath = `category/${categoryId}/filters`;

    const queryParams = {
        remote_ip: params.ip
    };

    const path = `/${API_VERSION}/${categoryPath}.json${stringifyQueryParams(queryParams)}`;

    const options = getOptions(path);

    return request(options);
}
