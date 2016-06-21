/**
 * Created by xuchunlei on 16/5/11.
 */

module.exports = function(orm, db){
    console.log('beacon:', 'define is called');
    var Beacon = db.define('sample_beacon', {
        uuid : { type : 'text', size : 40, required : true },
        major : { type : 'integer', unsigned : true, required : true },
        minor : { type : 'integer', unsigned : true, required : true },
        rssi : { type : 'integer', required : true },
        time : { type : 'integer', size : 8, required : true },
        spot_id : { type : 'integer', required : true },
        device: { type: 'text', required: true },
        raw : { type : 'binary' },
        accuracy : { type : 'number' },
        txpower : { type : 'integer' }
    },
    {
        methods : {
            name : function(){
                return '(' + this.uuid + ',' + this.major + ',' + this.minor + ')'
            }
        }
    });
    
}