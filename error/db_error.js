/**
 * 返回给客户端的错误信息
 * Created by xuchunlei on 16/5/10.
 */

var ERR_MYSQL = require('mysql/lib/protocol/constants/errors');

module.exports = function (err, req, res, next) {
    // next(err);
    console.error("we got an error:" + err.code + ",message=" + err.message + ",errno=" + err.errno + ",target=" + err.target);
    switch(err.errno) {
        case ERR_MYSQL.ER_DUP_ENTRY:         // 插入重复值错误
            return res.status(200).json({status : 501, message : err.target + ' is existed'});
        case ERR_MYSQL.ER_NO_REFERENCED_ROW_2: // 指定的外键不存在
            return res.status(200).json({status : 502, message : err.target + ' is not existed'});
        default:
            return res.status(200).json({status: -1, message : "unknown error"});
    }
}