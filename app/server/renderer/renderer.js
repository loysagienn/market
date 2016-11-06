import configurePage from './configurePage';
import renderHtml from './renderHtml';
import {createLogger} from '../logger';
import {DEFAULT_SETTINGS} from '../../common/constants';

const log = createLogger(module, {console: true});


export function render(route, req, res) {

    const {serverRenderingOn} = getSettings(req);

    if (!serverRenderingOn) {
        return renderHtml();
    }

    configurePage(route, req)
        .then(params => res.end(renderHtml(params)))
        .catch(error => {
            log.error(error);
            res.end(renderHtml())
        });
}

function getSettings({cookies: {settings} = {}}) {
    if (!settings) {
        return DEFAULT_SETTINGS;
    }

    try {
        return JSON.parse(settings);
    } catch (error) {
        return DEFAULT_SETTINGS;
    }
}
