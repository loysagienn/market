import {getOptions, API_VERSION} from './marketApiProd';
import {stringifyQueryParams} from '../../../common/helpers';

const DEFAULT_COUNT = 10;

export default function getModels({params, request}) {

    const {categoryId, page = 1, count = DEFAULT_COUNT, ip} = params;

    const filterPath = `filter/${categoryId}`;

    const queryParams = {
        remote_ip: ip,
        count,
        page
    };

    const path = `/${API_VERSION}/${filterPath}.json${stringifyQueryParams(queryParams)}`;

    const options = getOptions(path);

    return request(options).then(({searchResult: {results, total}}) => {
        const list = results;
        const morePagesCount = Math.ceil((total - page * count)/count);

        return {list, morePagesCount};
    });
}
