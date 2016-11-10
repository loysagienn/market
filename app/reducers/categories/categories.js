import categoriesMapReducer from './categoriesMapReducer';
import filterCategoryIdReducer from './filterCategoryIdReducer';
import focusedCategoryIdReducer from './focusedCategoryIdReducer';
import loadingReducer from './loadingReducer';

import {createLogger} from '../../common/logger';

const log = createLogger(module);

const rootCategoryId = 90401;



export default function ({categoriesMap, loading, focusedCategoryId, filterCategoryId} = {}, action) {

    categoriesMap = categoriesMapReducer(categoriesMap, action, rootCategoryId);

    loading = loadingReducer(loading, action);

    filterCategoryId = filterCategoryIdReducer(filterCategoryId, action, rootCategoryId);

    focusedCategoryId = focusedCategoryIdReducer(
        focusedCategoryId, action, categoriesMap, filterCategoryId, rootCategoryId
    );

    return {categoriesMap, rootCategoryId, loading, focusedCategoryId, filterCategoryId};
}
