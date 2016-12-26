import configurePage from './configurePage';
import renderHtml from './renderHtml';
import {createLogger} from '../logger';

const log = createLogger(module, {console: true});

export const render = (route, params) => new Promise(resolve => {

    configurePage(route, params)
        .then(params => resolve({
            body: renderHtml(params),
            code: 200
        }))
        .catch(error => {
            log.error(error);
            resolve({
                body: renderHtml(),
                code: 200
            });
        });
});
