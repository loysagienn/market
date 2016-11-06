

export default function parseResult(methodName, result) {

    switch (methodName) {
        case 'getCategoryChildren':

            return {categories: result.categories}
    }

    return result;
}
