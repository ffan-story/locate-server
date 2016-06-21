/**
 * 设置运行环境
 * Created by xuchunlei on 16/5/7.
 */
var models = require('../database/models');
var bodyParser = require('body-parser');
var validator = require('express-validator')

module.exports = function (app) {
    console.log("setup environment");

    // post请求body解析中间件
    // app.use(bodyParser.raw())
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(validator());

    // 处理请求中间件
    app.use(function (req, res, next) {
        // 初始化数据库连接
        models(function (err, db) {
            if(err) return next(err);
            req.models = db.models;
            req.db = db;
            return next();
        });
    });

};