var path = require('path');
var webpack = require('webpack');
var AssetsPlugin = require('assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const srcDir = path.join(__dirname, 'src');
const buildDir = path.join(__dirname, 'build');

const plugins = [
    new AssetsPlugin({ path: buildDir, filename: 'assets.json' }),
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
    }),
];

module.exports = {
    name: 'browser',
    entry: {
        client: path.join(srcDir, 'client.js'),
    },

    output: {
        path: buildDir,
        filename: '[name].js',
        publicPath: '/build/assets/',
    },

    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: 'file?name=[name].[ext]',
            },
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css?modules'),
            }
        ],
    },

    devtool: 'cheap-module-eval-source-map',

    plugins,
};
