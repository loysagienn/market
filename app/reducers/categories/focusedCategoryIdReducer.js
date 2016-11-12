import {ROUTE_TO, ROUTE_LOAD_DONE, FOCUS_TO_CATEGORY} from '../../actions/action-types';
import {routeKeys} from '../../common/router/router';



export default function focusedCategoryIdReducer(state = null, action, categoriesMap, filterCategoryId, rootCategoryId) {

    const {type} = action;

    if (type === FOCUS_TO_CATEGORY && action.categoryId !== null) {
        return action.categoryId;
    }

    if (
        type === ROUTE_TO ||
        type === FOCUS_TO_CATEGORY
    ) {

        if (filterCategoryId === rootCategoryId) {
            return filterCategoryId;
        }

        const filterCategory = categoriesMap[filterCategoryId];

        if (filterCategory && filterCategory.childrenCount === 0) {
            return filterCategory.parentId;
        }

        return filterCategoryId;
    }

    return state;
}
