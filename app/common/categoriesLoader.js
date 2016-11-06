
/**
 * Проверяет, загружены ли дочерние регионы
 * @param categoriesMap
 * @param categoryId
 * @returns {boolean}
 */
export function categoryChildrenLoaded(categoriesMap, categoryId) {
    const category = categoriesMap[categoryId];

    return (category && (category.childrenLoaded || category.childrenCount === 0));
}

/**
 * Загружает дочерние категории
 * @param api
 * @param categoryId
 * @returns {Promise}
 */
export function loadCategoryChildren(api, categoryId) {
    return api.getCategoryChildren({categoryId}).then(result => Promise.resolve(result.categories.items));
}

/**
 * Загружает дочерние категории, а так же все категории вверх по дереву до категории, которая уже есть в дереве
 * @param api
 * @param categoriesMap
 * @param categoryId
 * @param rootCategoryId
 * @param apiCalls Передавать не нужно, для рекурсии
 * @returns {Promise}
 */
export function loadCategories(api, categoriesMap, categoryId, rootCategoryId, apiCalls = []) {

    const category = categoriesMap[categoryId];

    if (category) {
        if (category.childrenCount === 0) {
            return Promise.resolve([]);
        }

        if (category.childrenLoaded) {
            if (apiCalls.length === 0) {
                return Promise.resolve([]);
            }
        } else {
            apiCalls.push(loadCategoryChildren(api, categoryId));
        }

        return Promise.all(apiCalls).then(result => Promise.resolve(convertResultToCategoriesArray(result)));

    } else {
        apiCalls.push(loadCategoryChildren(api, categoryId));

        return api.getCategoryInfo({categoryId})
            .then(({category}) => {
                if (categoryId === rootCategoryId) {
                    return Promise.all(apiCalls).then(result => Promise.resolve(
                        convertResultToCategoriesArray(result).concat(category)
                    ));
                }
                return loadCategories(api, categoriesMap, category.parentId, rootCategoryId, apiCalls)
            });
    }
}

function convertResultToCategoriesArray(result) {
    return result.reduce((categories, items) => categories.concat(items), []);
}
