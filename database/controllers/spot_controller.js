/**
 * 采集点controller
 * Created by xuchunlei on 16/5/11.
 */

module.exports = {
    /**
     * 创建采集点回调方法
     * @param req
     * @param res
     * @param next
     */
    create : function (req, res, next) {
        console.log('spot_controller:', 'create is called');

        req.checkBody('x', 'x is required').notEmpty();
        req.checkBody('x', 'x should be number(double or float)').isFloat();
        req.checkBody('y', 'y is required').notEmpty();
        req.checkBody('y', 'y should be number(double or float)').isFloat();
        req.checkBody('d', 'd is required').notEmpty();
        req.checkBody('d', 'd should be number(double or float)').isFloat();
        var errors = req.validationErrors();
        if(errors) {
            var paramErr = new Error(errors[0].msg);
            paramErr.errno = 401;
            return next(paramErr);
        }

        var spot = {
            x : req.body.x,
            y : req.body.y,
            d : req.body.d,
            zone_id : req.body.zone_id
        };
        req.models.spot.create(spot, function (err, result) {
            // 保存失败, 转入错误处理
            if(err) {
                err.target = 'zone_id '+ spot.zone_id;
                return next(err);
            }
            // 保存成功, 返回消息给客户端
            var msg = 'save spot ' + result.name() + ' successfully';
            console.info('spot_controller.create:', msg);
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
     * 获取采集点回调方法
     * @param req
     * @param res
     * @param next
     */
    list : function (req, res, next) {
        console.info('spot_controller', 'list is called');

        // 参数验证
        req.checkQuery('pageSize', 'pageSize is required').notEmpty();
        req.checkQuery('pageSize', 'pageSize should be integer').isInt();
        req.checkQuery('pageIndex', 'pageIndex is required').notEmpty();
        req.checkQuery('pageIndex', 'pageIndex should be integer').isInt();
        req.checkQuery('zone_id', 'zone_id is required').notEmpty();
        req.checkQuery('zone_id', 'zone_id should be integer').isInt();

        var errors = req.validationErrors();
        if(errors) {
            var paramErr = new Error(errors[0].msg);
            paramErr.errno = 401;
            return next(paramErr);
        }

        var pSize = Number(req.query.pageSize);
        var pIndex = Number(req.query.pageIndex);
        var pageModel = req.models.spot.find({ zone_id : Number(req.query.zone_id) })
                                       .page(pIndex, pSize);
        pageModel.run(function (err, results) {
            if(err) {
                next(err);
            }
            var spotList = results.map(function (m) {
                return {
                    id : m.id,
                    x : m.x,
                    y : m.y,
                    d : m.d
                };
            });
            res.status(200).json({
                status : 200,
                message : 'success',
                data : {
                    spots : spotList
                }
            });
        });
    }
};
