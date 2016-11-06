import {getOptions, API_VERSION} from './marketApiProd';
import {stringifyQueryParams} from '../../../common/helpers';


const COUNT = 30;

export default function getCategoryChildren({params, request, page = 1, loadedItems = []}) {

    const {categoryId} = params;

    const categoryPath = categoryId === null ? 'category' : `category/${categoryId}/children`;

    const queryParams = {
        remote_ip: params.ip,
        count: COUNT,
        page
    };

    const path = `/${API_VERSION}/${categoryPath}.json${stringifyQueryParams(queryParams)}`;

    const options = getOptions(path);

    return request(options).then(({categories: {items, total}}) => {

        items = loadedItems.concat(items);

        if (COUNT * page < total) {
            return getCategoryChildren({
                params,
                request,
                page: page + 1,
                loadedItems: items
            })
        }

        return {categories: {items}};
    });
}
