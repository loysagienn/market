import {connect} from 'react-redux';
import {routeTo} from '../actions/actions';
import Filters from '../components/Filters/Filters';

function mapStateToProps(
    {
        categories: {filterCategoryId},
        filters
    },
    ownProps
) {
    const categoryFilter = filters[filterCategoryId] || {};

    return {
        loading: categoryFilter.loading || false,
        filters: categoryFilter.filters || []
    };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    routeTo: params => dispatch(routeTo(params))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Filters);

