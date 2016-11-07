import configurePage from './configurePage';
import renderHtml from './renderHtml';
import {createLogger} from '../logger';

const log = createLogger(module, {console: true});


export function render(route, req, res) {

    configurePage(route, req)
        .then(params => res.end(renderHtml(params)))
        .catch(error => {
            log.error(error);
            res.end(renderHtml())
        });
}
