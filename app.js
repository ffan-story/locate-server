/**
 * Created by xuchunlei on 16/5/5.
 */

var express = require('express');
var app = express();

var environment = require('./config/environment');
var routes = require('./routes/api');
var errors = require('./error');

// 初始化运行环境
environment(app);
// 初始化路由
routes(app);
// 初始化错误处理
errors(app);

module.exports = app;