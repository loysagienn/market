import {getPathByRoute, getRouteByPath} from '../common/router/router';
import {routeTo} from '../actions/actions';

let activeRoute = {};

const getPath = () => window.location.pathname + window.location.search;

export default function({subscribe, dispatch, getState}) {

    subscribe(() => onChange(getState()));

    window.addEventListener(
        'popstate',
        event => {
            activeRoute = event.state || getRouteByPath(getPath());
            dispatch(routeTo({route: activeRoute}));
        }
    );

    const {router: {currentRoute}} = getState();

    if (!currentRoute.key) {
        activeRoute = getRouteByPath(getPath());
        dispatch(routeTo({route: activeRoute}));
    } else {
        activeRoute = currentRoute;
    }
}

function onChange({router: {currentRoute}}) {
    if (activeRoute !== currentRoute) {
        activeRoute = currentRoute;
        const path = getPathByRoute(currentRoute);
        window.history.pushState(currentRoute, path, path);
    }
}
