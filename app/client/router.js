import {getPathByRoute, getRouteByPath} from '../common/router/router';
import {routeTo} from '../actions/actions';
import {getKeyByObject} from '../common/helpers';

let activeRoute = {};
let activeRouteKey = getKeyByObject(activeRoute);

const getPath = () => window.location.pathname + window.location.search;

const updateActiveRoute = route => {
    activeRoute = route;
    activeRouteKey = getKeyByObject(route);
};

export default function({subscribe, dispatch, getState}) {

    subscribe(() => onChange(getState()));

    window.addEventListener(
        'popstate',
        event => {
            updateActiveRoute(event.state || getRouteByPath(getPath()));
            dispatch(routeTo({route: activeRoute}));
        }
    );

    const {router: {currentRoute}} = getState();

    if (!currentRoute.key) {
        updateActiveRoute(getRouteByPath(getPath()));
        dispatch(routeTo({route: activeRoute}));
    } else {
        updateActiveRoute(currentRoute);
    }
}

function onChange({router: {currentRoute}}) {
    const currentRouteKey = getKeyByObject(currentRoute);
    if (activeRouteKey !== currentRouteKey) {
        console.log('push route', currentRoute);
        updateActiveRoute(currentRoute);
        const path = getPathByRoute(currentRoute);
        window.history.pushState(currentRoute, path, path);
    }
}
