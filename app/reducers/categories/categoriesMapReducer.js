
import {CATEGORIES_LOAD_DONE} from '../../actions/action-types';
import {addItems} from '../../common/tree';



const noParentCategoriesIds = new Set();


export default function categoriesMapReducer(state, action, rootCategoryId) {

    if (!state) {
        state = {[rootCategoryId]: createRootCategory(rootCategoryId)};
    }

    if (action.type === CATEGORIES_LOAD_DONE) {

        state = Object.assign({}, state);

        addItems(state, action.categories, noParentCategoriesIds);
    }

    return state;
}

// хардкод рутовой категории
const createRootCategory = id => ({
    advertisingModel: "HYBRID",
    childrenCount: 16,
    id,
    modelsNum: 2028666,
    name: "Все товары",
    offersNum: 35820797,
    parentId: 0,
    type: "gurulight",
    uniqName: "Все товары",
    visual: false,

    childrenIds: [],
    childrenLoaded: false
});
