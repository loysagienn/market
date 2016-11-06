import {createLogger, setLogger} from '../common/logger';

setLogger((module, options) => {
    return {
        info: console.log.bind(console, '%cinfo: ', 'color: green;'),
        error: console.log.bind(console, '%cerror: ', 'color: red;'),
        custom: custom
    };
});

function custom(text, css, ...other) {
    console.log.apply(console, [`%c${text}`, css, ...other]);
}

export {createLogger};
