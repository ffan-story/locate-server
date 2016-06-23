/**
 * 均值法指纹数据model
 * Created by xuchunlei on 16/6/20.
 */

module.exports = function (orm, db) {
    console.info('mean', 'define is called');
    var Mean = db.define('finger_beacon_mean', {
            spot_id : { type : 'integer', unsigned : true, required : true },
            uuid : { type : 'text', size : 40, required : true },
            major : { type : 'integer', unsigned : true, required : true },
            minor : { type : 'integer', unsigned : true, required : true },
            device: { type: 'text', required: true },
            rssi : { type : 'integer', required : true },
            zone_id: { type : 'integer', unsigned : true, required : true }
        });
}