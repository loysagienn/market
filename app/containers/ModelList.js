import {connect} from 'react-redux';
import {routeTo, loadMoreModels} from '../actions/actions';
import ModelList from '../components/ModelList/ModelList';

function mapStateToProps(
    {
        models: {loading, modelsFilterMap, modelsMap, offersMap},
        router: {currentRoute: {filterKey = ''}}
    },
    ownProps
) {
    return {
        modelsMap,
        offersMap,
        modelsIds: modelsFilterMap[filterKey] || [],
        modelsLoading: loading
    };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    routeTo: params => dispatch(routeTo(params)),
    loadMoreModels: () => dispatch(loadMoreModels())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModelList);

