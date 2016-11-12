import {connect} from 'react-redux';
import {routeToActualFilter, updateFilter} from '../actions/actions';
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
        filters: categoryFilter.filters || [],
        values: categoryFilter.values || {}
    };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    routeToActualFilter: params => dispatch(routeToActualFilter()),
    updateFilter: filter => dispatch(updateFilter(filter))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Filters);

