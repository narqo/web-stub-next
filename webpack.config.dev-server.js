var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

const srcDir = path.join(__dirname, 'src');
const buildDir = path.join(__dirname, 'build');

module.exports = {
    name: 'server-side rendering',

    context: srcDir,
    entry: {
        server: './server',
    },
    target: 'node',
    externals: [nodeExternals()],

    output: {
        path: buildDir,
        filename: '[name].js',
        publicPath: '/build/assets/',
        libraryTarget: 'commonjs2',
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
            },
            {
                test: /\.json$/,
                loader: 'loader',
            },
            // {
            //     test: /\.css$/,
            //     loaders
            // }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
    ]
};
