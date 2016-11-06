import {connect} from 'react-redux';
import {routeTo, focusToCategory} from '../actions/actions';
import CategoriesTree from '../components/CategoriesTree/CategoriesTree';

function mapStateToProps({categories: {loading, categoriesMap, focusedCategoryId, filterCategoryId}}) {
    return {
        filterCategoryId,
        focusedCategoryId,
        loading,
        categoriesMap
    };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    routeTo: id => dispatch(routeTo({path: `models?categoryId=${id}`})),
    focusToCategory: categoryId => dispatch(focusToCategory(categoryId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoriesTree);

