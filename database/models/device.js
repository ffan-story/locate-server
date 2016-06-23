/**
 * 设备model
 * Created by xuchunlei on 16/6/16.
 */

module.exports = function (orm, db) {
    var Device = db.define('device', {
            name : { type : 'text', required : true }
        });
};