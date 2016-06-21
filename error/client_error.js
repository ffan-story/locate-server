/**
 * Created by xuchunlei on 16/5/12.
 */

module.exports = function (err, req, res, next) {
    
    if(err.errno > 400 && err.errno < 500) {
        res.status(200).json({ status : err.errno, message : err.message });
    }else {
        next(err);
    }
}