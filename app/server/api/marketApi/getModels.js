import {getOptions, API_VERSION} from './marketApiProd';
import {stringifyQueryParams} from '../../../common/helpers';
import api from '../api';

const DEFAULT_COUNT = 10;


const filtersIds = {};

export default function getModels({params, request}) {

    const {categoryId, page = 1, count = DEFAULT_COUNT, ip: remote_ip} = params;

    const filterPath = `filter/${categoryId}`;

    const filterValues = Object.keys(params).reduce(
        (filterQueryParams, key) => ['categoryId', 'page', 'count', 'ip'].indexOf(key) !== -1
            ? filterQueryParams
            : Object.assign(filterQueryParams, {[key]: params[key]}),
        {}
    );

    const loadModels = () => {

        const filterQueryParams = Object.keys(filterValues).reduce(
            (filterQuery, key) => Object.assign(filterQuery, {[filtersIds[categoryId][key] || key]: filterValues[key]}),
            {}
        );

        const queryParams = Object.assign({remote_ip, count, page}, filterQueryParams);

        const path = `/${API_VERSION}/${filterPath}.json${stringifyQueryParams(queryParams)}`;

        const options = getOptions(path);

        return request(options).then(({searchResult: {results, total}}) => {
            const list = results;
            const morePagesCount = Math.ceil(Math.max((total - page * count), 0)/count);

            return {list, morePagesCount};
        });
    };

    if (categoryId in filtersIds) {
        return loadModels();
    }

    return api.getCategoryFilters({params: {categoryId}, ip: remote_ip})
        .then(result => setFilterIds(categoryId, result))
        .then(loadModels);
}

function setFilterIds(categoryId, {filters}) {
    filtersIds[categoryId] = filters.reduce(
        (filterKeys, {id, shortname}) => Object.assign(filterKeys, {[shortname || id]: id}),
        {}
    )
}
