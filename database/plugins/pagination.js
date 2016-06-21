/**
 * 查询分页插件
 * Created by xuchunlei on 16/5/12.
 */

module.exports = function (db) {
    console.info('setup pagination plugin');
    return {
      define : function (model) {
          // 默认每页大小
          model.settings.set('pagination.size', 20);

          model.page = function (n, size) {
              if(!isNaN(size)){
                model.settings.set('pagination.size', size);
              }
              var pageSize = model.settings.get('pagination.size');
              var m = this.limit ? this : this.all();
              return m.offset((n - 1) * pageSize).limit(pageSize);
          };

          /**
           * 获取页数
           * @param cb
           */
          model.pages = function (cb) {
              model.count(function (err, count) {
                  if(err){
                      return cb(err);
                  }
                  return cb(null, Math.ceil(count / model.settings.get("pagination.perpage")));
              })
          };
      }
    };
};
