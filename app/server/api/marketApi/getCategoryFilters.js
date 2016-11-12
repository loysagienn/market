import {getOptions, API_VERSION} from './marketApiProd';
import {stringifyQueryParams} from '../../../common/helpers';


export default function getCategoryFilters({params, request}) {

    const {categoryId, vendor_max_values = 10, filter_set = 'popular', description = 0} = params;

    const categoryPath = `category/${categoryId}/filters`;

    const queryParams = {
        remote_ip: params.ip,
        vendor_max_values,
        filter_set,
        description
    };

    const path = `/${API_VERSION}/${categoryPath}.json${stringifyQueryParams(queryParams)}`;

    const options = getOptions(path);

    return request(options);
}
