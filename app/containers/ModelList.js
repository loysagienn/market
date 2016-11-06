import {connect} from 'react-redux';
import {routeTo, loadMoreModels} from '../actions/actions';
import ModelList from '../components/ModelList/ModelList';

function mapStateToProps(
    {models: {loading, modelsFilterMap, modelsMap, offersMap, currentListKey}},
    ownProps
) {
    return {
        modelsMap,
        offersMap,
        currentFilter: modelsFilterMap[currentListKey] || [],
        loading
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

