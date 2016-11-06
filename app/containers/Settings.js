import {connect} from 'react-redux';
import {changeSettings} from '../actions/actions';
import Settings from '../components/Settings/Settings';

function mapStateToProps(
    {settings},
    ownProps
) {
    return {settings};
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeSettings: settings => dispatch(changeSettings(settings))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings);

