/**
 * Created by xuchunlei on 16/5/10.
 */

module.exports = function (app) {
    app.use(require('./client_error'));
    app.use(require('./db_error'));
    // app.use(function (err, req, res, next) {
    //     console.error(err.stack);
    //     res.status(500).send('Something broke!');
    // })
    console.log("setup errors handler");
};