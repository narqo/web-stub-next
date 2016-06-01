var appServer = require('../../build/server');
//const assets = require('../../build/assets.json');

const render = appServer.default();

module.exports = () => (req, res, next) => {
    render(req, (err, redirect, page) => {
        if (err) return next(err);
        if (redirect) return res.redirect(redirect.pathname + redirect.search);
        res.send(page);
    });
};
