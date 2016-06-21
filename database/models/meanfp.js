/**
 * 均值法指纹数据model
 * Created by xuchunlei on 16/6/20.
 */

export default function (orm, db) {
    console.info('mean', 'define is called');
    var Mean = db.define('finger_beacon_mean', {
            spot_id : { type : 'integer', unsigned : true, required : true },
            beacon_id : { type : 'integer', unsigned : true, required : true },
            device_id : { type : 'integer', unsigned : true, required : true },
            rssi : { type : 'integer', required : true }
        });
}