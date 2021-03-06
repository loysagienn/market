var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('../config');

console.log(path.join(config.staticDir, config.bundlePath));
module.exports = {
    context: __dirname,
    entry: {
        app: '../build/client/development.js'
    },
    output: {
        path: path.join(config.staticDir, config.bundlePath),
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
            // {
            //     test: /\.js$/,
            //     loader: 'babel-loader',
            //     query: {
            //         presets: ['es2015']
            //     }
            // },
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
