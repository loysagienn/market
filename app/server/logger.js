import {createLogger, setLogger} from '../common/logger';
import winston from 'winston';
import path from 'path';

setLogger((module, options = {console: true}) => {

    var filePath = module.filename.split('/').slice(-3).join('/'),
        transports = [];

    if (options.fileName)
        transports.push(
            new winston.transports.File({
                level: 'debug',
                label: filePath,
                timestamp: true,
                filename: path.join(__dirname, '../../logs', options.fileName + '.log')
            })
        );
    if (options.console) {
        transports.push(
            new winston.transports.Console({
                colorize: true,
                level: 'debug',
                label: 'market: ' + filePath
            })
        )
    }

    const logger = new winston.Logger({ transports });

    logger.custom = (text, css, ...other) => logger.info(text);

    return logger;
});

export {createLogger};
