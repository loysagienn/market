import {connect} from 'react-redux';
import {routeTo} from '../actions/actions';
import App from '../components/App/App';

const mapStateToProps = ({router, categories, models}, ownProps) => ({
    route: router.currentRoute,
    categories,
    models
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    routeTo: params => dispatch(routeTo(params))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
