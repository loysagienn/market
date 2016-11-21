import {connect} from 'react-redux';
import {routeToCategory, focusToCategory} from '../actions/actions';
import CategoriesTree from '../components/CategoriesTree/CategoriesTree';

function mapStateToProps({
    categories: {loading, categoriesMap, focusedCategoryId, filterCategoryId},
    settings: {showCategoryTreeOnHover}
}) {
    return {
        filterCategoryId,
        focusedCategoryId,
        loading,
        categoriesMap,
        showCategoryTreeOnHover
    };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    routeTo: categoryId => dispatch(routeToCategory(categoryId)),
    focusToCategory: categoryId => dispatch(focusToCategory(categoryId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoriesTree);

