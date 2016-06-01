var assert = require('assert'),
    path = require('path'),
    dotenv = require('dotenv');

function setup(rootDir) {
    dotenv.config({ path: path.join(rootDir, '.env') });

    const NODE_PORT = process.env.NODE_PORT;
    assert.ok(NODE_PORT, 'environment variable NODE_PORT is not defined or empty');

    return {
        app: path.resolve(rootDir, './server'),
        workers: 1,
        control: {
            forkTimeout: 5000,
            stopTimeout: 10000,
            exitThreshold: 15000,
            allowedSequentialDeaths: 10
        },
        server: {
            port: NODE_PORT,
        },
        extensions: {
            'luster-guard': {
                debounce: 100,
                interval: 500,
                patterns: [
                    'build/server.js',
                    'configs/default/*.js',
                    'configs/current/*.js',
                    'server/**/*',
                ],
            },
        },
    };
}

module.exports = setup(path.resolve(__dirname, '../../'));
