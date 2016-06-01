var contimer = require('connect-contimer');

const timeLogger = (time, req) => 
    console.log('%j', {
        reqid: req.headers['x-request-id'] || '0',
        ip: req.headers['x-real-ip'],
        url: req.url,
        headers: req.headers,
        body: req.body,
        time,
    });

module.exports = label => contimer(label, timeLogger);
