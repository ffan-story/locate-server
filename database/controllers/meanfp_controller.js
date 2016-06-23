/**
 * Created by xuchunlei on 16/6/20.
 */

var async = require('async');

module.exports = {
    /**
     * 创建指纹回调方法
     * @param req
     * @param res
     * @param next
     */
    create: function(req, res, next) {
        console.log('meanfp_controller:', 'create is called');

        // 参数验证
        req.checkBody('zoneId', 'zoneId is required').notEmpty();
        req.checkBody('zoneId', 'zoneId should be integer').isInt();
        req.checkBody('device', 'device is required').notEmpty();

        var errors = req.validationErrors();
        if(errors) {
            var paramErr = new Error(errors[0].msg);
            paramErr.errno = 401;
            return next(paramErr);
        }

        // 获取定位区域中的采样点
        var zoneId = req.body.zoneId;
        var deviceName = req.body.device;
        var spotModel = req.models.spot.find({ zone_id: zoneId }, function(err, results) {
            if(err){
                return next(err);
            }

            var spotIds = results.map(function (m) {
                return m.id;
            });

            console.info(spotIds);

            // 计算采集点样本的平均值并保存到指纹库
            req.models.sample_beacon.aggregate(['spot_id', 'uuid', 'major', 'minor'], { spot_id: spotIds })
                .avg('rssi').groupBy('spot_id', 'uuid', 'major', 'minor').get(function (err, stats) {
                console.info(stats);
                // 将指纹数据保存到指纹数据库
                if(stats) {
                    async.waterfall([
                        function(callback) {  // 删除旧的指纹数据
                            req.models.finger_beacon_mean.find({ zone_id: zoneId, device: deviceName }).remove(function (err) {
                                if(err) {
                                    return callback(new Error('error occurs while remove old fingerprint on device '
                                        + deviceName + ' zone ' + zoneId + ':' + err.message));
                                }
                                // 成功则把设备名称和定位区域id传递下去
                                callback(null, deviceName, zoneId);
                            })
                        },
                        function (devName, zoneId, callback) {  // 保存数据到指纹库

                            // 新生成的指纹集合
                            var fps = stats.map(function (m) {
                                return {
                                    uuid: m.uuid,
                                    major: m.major,
                                    minor: m.minor,
                                    rssi: m.avg_rssi,
                                    device: devName,
                                    spot_id: m.spot_id,
                                    zone_id: zoneId
                                };
                            });

                            // 保存指纹到数据库
                            req.models.finger_beacon_mean.create(fps, function (err, items) {
                                if(err) {
                                    return callback(new Error(err.message));
                                }
                                console.info('meanfp_controller','generate ' + items.length + ' fingerprints for zone '
                                    + zoneId + ' on device ' + devName);
                                callback(null, items);
                            })
                        }
                    ],
                    function (err, results) {
                        // 返回错误信息
                        if(err) {
                            return next(err);
                        }
                        return res.status(200).json({
                            status: 200,
                            message: 'Generate ' + results.length + ' fingerprint on zone ' + zoneId,
                            data: {
                                fingerprint: results
                            }
                        });
                    }
                    );
                }


            });
        });
    }
};