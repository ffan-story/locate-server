/**
 * Created by xuchunlei on 16/6/20.
 */

module.exports = {
    /**
     * 创建指纹回调方法
     * @param req
     * @param res
     * @param next
     */
    create: function(req, res, next) {
        console.log('meanfp_controller:', 'create is called');
        return res.status(200).send('hello');

        // req.checkBody('x', 'x is required').notEmpty();
        // req.checkBody('x', 'x should be number(double or float)').isFloat();
        // req.checkBody('y', 'y is required').notEmpty();
        // req.checkBody('y', 'y should be number(double or float)').isFloat();
        // req.checkBody('d', 'd is required').notEmpty();
        // req.checkBody('d', 'd should be number(double or float)').isFloat();
        // var errors = req.validationErrors();
        // if(errors) {
        //     var paramErr = new Error(errors[0].msg);
        //     paramErr.errno = 401;
        //     return next(paramErr);
        // }
        //
        // var spot = {
        //     x : req.body.x,
        //     y : req.body.y,
        //     d : req.body.d,
        //     zone_id : req.body.zone_id
        // };
        // req.models.spot.create(spot, function (err, result) {
        //     // 保存失败, 转入错误处理
        //     if(err) {
        //         err.target = 'zone_id '+ spot.zone_id;
        //         return next(err);
        //     }
        //     // 保存成功, 返回消息给客户端
        //     var msg = 'save spot ' + result.name() + ' successfully';
        //     console.info('spot_controller.create:', msg);
        //     return res.status(200).json({
        //         status : 200,
        //         message : msg,
        //         data : {
        //             id : result['id']
        //         }
        //     });
        // });
    }
};