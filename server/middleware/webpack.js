module.exports = () => {
    var webpack = require('webpack');
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackDevConfig = require('../../webpack.config.dev-client');

    const compiler = webpack(webpackDevConfig);

    return webpackDevMiddleware(compiler, {
        publicPath: webpackDevConfig.output.publicPath,
        noInfo: true,
    });
};
