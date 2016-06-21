/**
 * Created by xuchunlei on 16/5/7.
 */

module.exports = function (orm, db) {
    var Zone = db.define('locate_zone', {
        name : { type: 'text', required: true}
    });
};