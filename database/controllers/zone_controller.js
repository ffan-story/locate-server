/**
 * 定位区域controller
 * Created by xuchunlei on 16/5/7.
 */

module.exports = {
    /**
     * 创建定位区域回调方法
     * @param req
     * @param res
     * @param next
     */
    create : function (req, res, next) {
        console.log('zone_controller:', 'create is called');
        req.checkBody('zoneName', 'zoneName is required').notEmpty();
        var errors = req.validationErrors();
        if(errors) {
            var paramErr = new Error(errors[0].msg);
            paramErr.errno = 401;
            return next(paramErr);
        }

        var zone = {
          name : req.body.zoneName
        };
        req.models.locate_zone.create(zone, function (err, result) {
            // 保存失败, 转入错误处理
            if(err) {
                err.target = zone.name;
                return next(err);
            }
            // 保存成功, 返回消息给客户端
            var msg = 'save zone ' + zone.name + ' successfully';
            console.info('zone_controller.create:', msg);
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
     * 获取定位区域列表回调方法
     * @param req
     * @param res
     * @param next
     */
    list : function (req, res, next) {
        console.log('zone_controller', 'list is called');

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
        var pageModel = req.models.locate_zone.page(pIndex, pSize);
        pageModel.run(function (err, results) {
            if(err) {
                next(err);
            }
            var zoneList = results.map(function (m) {
                return {
                    id : m.id,
                    name: m.name
                };
            });
            res.status(200).json({
                status : 200,
                message : 'success',
                data : {
                    zones : zoneList
                }
            });
        });
    }
}