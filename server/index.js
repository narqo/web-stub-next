var assert = require('assert');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var errorMiddleware = require('./middleware/error');
var renderMiddleware = require('./middleware/render');
var timerMiddleware = require('./middleware/timer');
var webpackMiddleware = require('./middleware/webpack');

const server = express();

server.disable('x-powered-by');
server.enable('trust proxy');

server.use(timerMiddleware('server.response'));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cookieParser());

if (process.env.NODE_ENV !== 'production') {
    server.use(webpackMiddleware());
}

server.use(renderMiddleware());
server.use(errorMiddleware());

const port = process.env.port || process.env.PORT;

server.listen(port, err => {
    if (err) {
        console.error(err);
    }
    console.log(`listening on port ${port}`);
});

module.exports = server;
