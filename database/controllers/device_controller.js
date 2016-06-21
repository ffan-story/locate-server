/**
 * 设备controller
 * Created by xuchunlei on 16/6/16.
 */

module.exports = {
    
    queryByName : function (req, res, next) {
        console.log('device_controller:', 'create is called');
        
        // 参数检验
        req.checkQuery('name', 'name is required').notEmpty();
        var errors = req.validationErrors();
        if(errors) {
            var paramErr = new Error(errors[0].msg);
            paramErr.errno = 401;
            return next(paramErr);
        }

        var name = req.query.name;
        var Device = req.models.device;

        // 查询是否设备已存在
        Device.one({ name: name }, function(err, person) {
            if(person) {
                console.info('device_controller.queryByName', name + ' was found');
                return res.status(200).json({
                        status : 200,
                        message : 'success',
                        data : {
                            id : person['id']
                        }
                    }
                );
            }

            // 设备不存在,添加设备到数据库
            var device = {
                name : name
            };
            Device.create(device, function (err, result) {
                // 保存失败, 转入错误处理
                if(err) {
                    err.target = device.name;
                    return next(err);
                }
                // 保存成功, 返回消息给客户端
                var msg = 'save device ' + device.name + ' successfully';
                console.info('device_controller.create:', msg);
                return res.status(200).json({
                    status : 200,
                    message : 'success',
                    data : {
                        id : result['id']
                    }
                });
            });
        });
    } 
};
