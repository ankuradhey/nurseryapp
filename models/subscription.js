var db = require('../db.js');

module.exports = {
    getAll: function(status, done){
        status = typeof status != 'undefined'?status:"1";
        db.get().query('select * from subscription_plans where plan_status != "2" ',status, function(err, rows){
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
    getSubscriptionByName: function(subscriptionName, subscriptionId, done){
        db.get().query('select * from subscription_plans where lower(plan_name) = ? and plan_id != ? ',[(subscriptionName || '').toLowerCase().trim(), subscriptionId], function(err, rows){
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
    },
    updateSubscription: function(subscriptionParams, subscriptionId, done){
        console.log(subscriptionParams, subscriptionId)
        db.get().query('update subscription_plans set ? where plan_id = ?  ',[subscriptionParams, parseInt(subscriptionId)], function(err, rows) {
            
            console.log('inside update query', rows);
            
            if (err)
                return done(err)
            return done(null, rows);
        });
    }
}