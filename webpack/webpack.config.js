var config = require('../config');

module.exports = config.isDevMode ? require('./development') : require('./production');
