/**
 * beacon样本controller
 * Created by xuchunlei on 16/5/11.
 */

module.exports = {
    /**
     * 创建beacon样本
     * @param req
     * @param res
     * @param next
     */
    create : function (req, res, next) {
        console.log('beacon_controller:', 'create is called');
        // 参数检验
        req.checkBody('uuid', 'uuid is required').notEmpty();
        req.checkBody('major', 'major is required').notEmpty();
        req.checkBody('major', 'major should be integer').isInt();
        req.checkBody('minor', 'minor is required').notEmpty();
        req.checkBody('minor', 'minor should be integer').isInt();
        req.checkBody('rssi', 'rssi is required').notEmpty();
        req.checkBody('rssi', 'rssi should be integer').isInt();
        req.checkBody('time', 'time is required').notEmpty();
        req.checkBody('time', 'time should be long').isInt();
        req.checkBody('spot_id', 'spot_id is required').notEmpty();
        req.checkBody('spot_id', 'spot_id should be integer').isInt();
        req.checkBody('device', 'device is required').notEmpty();

        var errors = req.validationErrors();
        if(errors) {
            var paramErr = new Error(errors[0].msg);
            paramErr.errno = 401;
            return next(paramErr);
        }

        var beacon = {
            uuid : req.body.uuid,
            major : req.body.major,
            minor : req.body.minor,
            rssi : req.body.rssi,
            time : req.body.time,
            device: req.body.device,
            spot_id : req.body.spot_id,
            raw :  req.body.raw,
            accuracy : req.body.accuracy,
            txpower : req.body.txpower
            
        };
        req.models.sample_beacon.create(beacon, function (err, result) {
            // 保存失败, 转入错误处理
            if(err) {
                err.target = err.property || '('+ beacon.uuid + ',' + beacon.major + ',' + beacon.minor + ')';
                return next(err);
            }
            // 保存成功, 返回消息给客户端
            var msg = 'save beacon' + result.name() + ' sample with value ' + result['rssi'] + ' successfully';
            console.info('beacon_controller.create:', msg);
            return res.status(200).json({
                status : 200,
                message : msg,
                data : {
                    id : result['id']
                }
            });
        });
    },

    /**
     * 获取beacon样本信息
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    list : function (req, res, next) {
        console.log('beacon_controller', 'list is called');

        // 参数验证
        req.checkQuery('pageSize', 'pageSize is required').notEmpty();
        req.checkQuery('pageSize', 'pageSize should be integer').isInt();
        req.checkQuery('pageIndex', 'pageIndex is required').notEmpty();
        req.checkQuery('pageIndex', 'pageIndex should be integer').isInt();

        var errors = req.validationErrors();
        if(errors) {
            var paramErr = new Error(errors[0].msg);
            paramErr.errno = 401;
            return next(paramErr);
        }

        var pSize = Number(req.query.pageSize);
        var pIndex = Number(req.query.pageIndex);
        var spotId = req.query.spot_id;
        var pageModel = req.models.sample_beacon.find(spotId ? { spot_id : Number(spotId) } : null)
                                                .page(pIndex, pSize);
        pageModel.run(function (err, results) {
            if(err) {
                return next(err);
            }
            var beaconSampleList = results.map(function (m) {
                return {
                    id : m.id,
                    uuid: m.uuid,
                    major: m.major,
                    minor: m.minor,
                    rssi: m.rssi,
                    accuracy: m.accuracy,
                    txpower: m.txpower
                };
            });
            res.status(200).json({
                status : 200,
                message : 'success',
                data : {
                    beacons : beaconSampleList
                }
            });
        });
    },
    /**
     * 批量创建样本
     * @param req
     * @param res
     * @param next
     */
    patchCreate: function (req, res, next) {
        console.info('beacon_controller', 'patchCreate is called');
        var items = req.body.data;
        if(items) {
            req.models.sample_beacon.create(items, function (err, results) {

                if(err) {
                    return next(err);
                }

                var ids = results.map(function (m) {
                    return {
                        id : m.id
                    };
                });
                return res.status(200).json({
                    status: 200,
                    message: 'success',
                    data: {
                        ids:ids
                    }
                });
            });
        } else {
            var paramErr = new Error('data is required');
            paramErr.errno = 401;
            return next(paramErr);
        }
    }
};
