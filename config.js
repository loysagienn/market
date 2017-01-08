const path = require('path');

var privateConfig = {};

try {
    privateConfig = require('./privateConfig');
} catch(err) {}

module.exports = process.env.NODE_ENV === 'development'
    ?
// development config
{
    privateConfig,
    isDevMode:        true,
    staticDir:        path.join(__dirname, '../server/public'),
    bundlePath:       '/market/build',
    babelPolyfillUrl: '/vendor/babel-polyfill.js',
    reactUrl:         '/vendor/react.js',
    reactDomUrl:      '/vendor/react-dom.js',
    reduxUrl:         '/vendor/redux.js',
    reactReduxUrl:    '/vendor/react-redux.js',
    reduxThunkUrl:    '/vendor/redux-thunk.js'
}
    :
// production config
{
    privateConfig,
    isProdMode:       true,
    staticDir:        path.join(__dirname, '../server/public'),
    bundlePath:       '/market/build',
    babelPolyfillUrl: 'https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.8.0/polyfill.min.js',
    reactUrl:         'https://cdnjs.cloudflare.com/ajax/libs/react/15.4.1/react.min.js',
    reactDomUrl:      'https://cdnjs.cloudflare.com/ajax/libs/react/15.4.1/react-dom.min.js',
    reduxUrl:         'https://cdnjs.cloudflare.com/ajax/libs/redux/3.6.0/redux.min.js',
    reactReduxUrl:    'https://cdnjs.cloudflare.com/ajax/libs/react-redux/4.4.5/react-redux.min.js',
    reduxThunkUrl:    'https://cdnjs.cloudflare.com/ajax/libs/redux-thunk/2.1.0/redux-thunk.min.js'
};
