/**
 * api路由
 * Created by xuchunlei on 16/5/5.
 */

var controllers = require('../database/controllers');
var express = require('express');
var router = express.Router();

module.exports = function (app) {

    // 中间件-支持跨域
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        next();
    });

    // 中间件-打印访问日志
    router.use(function (req, res, next) {
        console.log('Time:%s,%s-%s', Date.now(), req.method, req.originalUrl);
        next();
    });

    // 设置路由
    router.route('/zones').post(controllers.zone.create)
                         .get(controllers.zone.list);
    router.route('/spots').post(controllers.spot.create)
                         .get(controllers.spot.list);
    router.route('/samples/beacons').post(controllers.beacon.create)
                                  .get(controllers.beacon.list);
    router.route('/fingerprints/mean').post(controllers.meanfp.create);
    router.route('/samples/beacons/patch').post(controllers.beacon.patchCreate);
    router.route('/devices').get(controllers.device.queryByName);
    app.use('/api/v1', router);
};