const UNHANDLED_ERROR = 520;

module.exports = () => (err, req, res, next) => {
    res.status(err.statusCode || UNHANDLED_ERROR);
    res.end(`<pre>${err.stack}</pre>`);
};
