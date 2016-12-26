import {createLogger} from './logger';
import {render} from './renderer/renderer';
import {getRouteByPath, routeKeys} from '../common/router/router';
import {handleApiCall} from './api/api';
const log = createLogger(module, {console: true, fileName: 'main'});


export function handleRequest({path, ip, cookies}) {

    const route = getRouteByPath(path);

    if (route.key === routeKeys.api) {
        return handleApiCall(route.childRoute, {ip});
    }

    return render(route, {ip, cookies});
}
