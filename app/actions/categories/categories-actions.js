
import {
    CATEGORIES_LOAD_START, CATEGORIES_LOAD_DONE, CATEGORIES_LOAD_FAIL, FOCUS_TO_CATEGORY
} from '../action-types';

import {categoryChildrenLoaded, loadCategories} from '../../common/categoriesLoader';



export function focusToCategory(categoryId) {
    return function (dispatch, getState) {

        const {categories: {categoriesMap, rootCategoryId}, api} = getState();

        if (categoryId === null || categoryChildrenLoaded(categoriesMap, categoryId)) {
            return dispatch({type: FOCUS_TO_CATEGORY, categoryId});
        }

        dispatch(
            {type: FOCUS_TO_CATEGORY, categoryId},
            {type: CATEGORIES_LOAD_START}
        );

        loadCategories(api, categoriesMap, categoryId, rootCategoryId)
            .then(categories => dispatch({type: CATEGORIES_LOAD_DONE, categories}))
            .catch(error => dispatch({type: CATEGORIES_LOAD_FAIL, error}));

    }
}
