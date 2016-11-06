import {createLogger} from './logger';
import {render} from './renderer/renderer';
import {getRouteByPath, routeKeys} from '../common/router/router';
import {handleApiCall} from './api/api';
const log = createLogger(module, {console: true, fileName: 'main'});

export function handleRequest(req, res) {

    const route = getRouteByPath(req.originalUrl);

    if (route.key === routeKeys.api) {
        handleApiCall(route.childRoute, req, res);
        return;
    }

    render(route, req, res);

}
