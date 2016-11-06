

let createLoggerFunc;

export const createLogger = (module, options) => createLoggerFunc(module, options);

export const setLogger = func => createLoggerFunc = func;
