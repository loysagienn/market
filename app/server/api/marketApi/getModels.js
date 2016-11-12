import {getOptions, API_VERSION} from './marketApiProd';
import {stringifyQueryParams} from '../../../common/helpers';

const DEFAULT_COUNT = 10;

export default function getModels({params, request}) {

    const {categoryId, page = 1, count = DEFAULT_COUNT, ip: remote_ip} = params;

    const filterPath = `filter/${categoryId}`;

    const filterQueryParams = Object.keys(params).reduce(
        (filterQueryParams, key) => ['categoryId', 'page', 'count'].indexOf(key) !== -1
            ? filterQueryParams
            : Object.assign(filterQueryParams, {[key]: params[key]}),
        {}
    );

    const queryParams = Object.assign({remote_ip, count, page}, filterQueryParams);

    const path = `/${API_VERSION}/${filterPath}.json${stringifyQueryParams(queryParams)}`;

    const options = getOptions(path);

    return request(options).then(({searchResult: {results, total}}) => {
        const list = results;
        const morePagesCount = Math.ceil((total - page * count)/count);

        return {list, morePagesCount};
    });
}
