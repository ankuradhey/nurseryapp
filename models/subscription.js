var db = require('../db.js');

module.exports = {
    getAll: function(status, done){
        status = typeof status != 'undefined'?status:"1";
        db.get().query('select * from subscription_plans where plan_status = ? ',status, function(err, rows){
            if(err)
                return done(err);
            else
                return done(null, rows);
        })
    },
    getOne: function(subscriptionId, done){
        db.get().query('select * from subscription_plans where plan_id = ? ',subscriptionId, function(err, rows){
            if(err)
                return done(err);
            else
                return done(null, rows);
        })
    }
}