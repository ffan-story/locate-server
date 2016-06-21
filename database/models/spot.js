/**
 * 采集点Model
 * Created by xuchunlei on 16/5/11.
 */

module.exports = function (orm, db) {
  var Spot = db.define('spot', {
      x : { type : 'number', required : true },
      y : { type : 'number', required : true },
      d : { type : 'number', required : true },
      zone_id : { type : 'integer', required : true }
  },
  {
      methods : {
          name : function(){
              return '(' + this.x + ',' + this.y + ',' + this.d + ')'
          }
      }
  });
};