/**
 * 设置和构建Models
 * Created by xuchunlei on 16/5/8.
 */

var orm = require('orm');
var settings = require('../../config/settings');

var  connection = null;

// 创建models
function setup(db, cb) {
    require('./zone')(orm, db);
    require('./spot')(orm, db);
    require('./beacon')(orm, db);
    require('./device')(orm, db);
    return cb(null, db);
}

module.exports = function (cb) {
    if(connection)
        return cb(null, connection);
    
    // 初始化连接
    orm.connect(settings, function (err, db) {
        if(err) return cb(err);
        // 使用插件
        db.use(require('../plugins/pagination'));
        connection = db;
        setup(db, cb);
        console.log('connect database successfully');
    });
};