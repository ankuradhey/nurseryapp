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
    },
    getSubscriptionByName: function(subscriptionName, done){
        db.get().query('select * from subscription_plans where lower(plan_name) = ? ',(subscriptionName || '').toLowerCase().trim(), function(err, rows){
            if(err)
                return done(err);
            else
                return done(null, rows);
        })
    },
    addSubscription: function(subscriptionParams, done){
        
        db.get().query('insert into subscription_plans set plan_name = ?, plan_amount = ?, plan_duration = ?, plan_status = "1"  ',[subscriptionParams.plan_name, subscriptionParams.plan_amount, subscriptionParams.plan_duration], function(err, rows) {
            
            console.log('inside insert query');
            
            if (err)
                return done(err)
            return done(null, rows);
        });
    }
}