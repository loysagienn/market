var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('../config');


module.exports = {
    context: __dirname,
    entry: {
        app: '../build/client/production.js'
    },
    output: {
        path: path.join(config.staticDir, 'market/build'),
        publicPath: '/market/build/',
        filename: '[name].js',
        chunkFilename: '[id].js',
        library: '[name]'
    },
    externals: {
        'redux':       'Redux',
        'react':       'React',
        'react-dom':   'ReactDOM',
        'react-redux': 'ReactRedux'
    },
    module: {
        loaders: [
            {
                test: /\.json/,
                loader: 'json'
            },
            {
                test: /\.css/,
                loader: ExtractTextPlugin.extract('style', 'css')
            }
            // {
            //     test: /\.(png|svg|jpg|ttf|eot|woff|woff2)$/,
            //     loader: 'url?name=[path][name].[ext]&limit=4096'
            // }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css', {
            allChunks: true
        })
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //         drop_console: false,
        //         unsafe: true
        //     }
        // })
    ],
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js']
    },
    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js']
    }
};
