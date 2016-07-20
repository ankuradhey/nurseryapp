var db = require('../db.js');

module.exports = {
    getAll: function(status, done) {
        status = typeof status != 'undefined' ? status : "1";
        db.get().query('select * from subscription_plans where plan_status != "2" ', status, function(err, rows) {
            if (err)
                return done(err);
            else
                return done(null, rows);
        })
    },
    getOne: function(subscriptionId, done) {
        db.get().query('select * from subscription_plans where plan_id = ? ', subscriptionId, function(err, rows) {
            if (err)
                return done(err);
            else
                return done(null, rows);
        })
    },
    getSubscriptionByName: function(subscriptionName, subscriptionId, done) {
        db.get().query('select * from subscription_plans where lower(plan_name) = ? and plan_id != ? ', [(subscriptionName || '').toLowerCase().trim(), subscriptionId], function(err, rows) {
            if (err)
                return done(err);
            else
                return done(null, rows);
        })
    },
    addSubscription: function(subscriptionParams, done) {
        db.get().query('insert into subscription_plans set plan_name = ?, plan_amount = ?, plan_duration = ?, plan_type = ?, plan_status = "1"  ', [subscriptionParams.plan_name, subscriptionParams.plan_amount, subscriptionParams.plan_duration, subscriptionParams.plan_type], function(err, rows) {

            console.log('inside insert query');

            if (err)
                return done(err)
            return done(null, rows);
        });
    },
    addSchoolAdvertisement: function(subscriptionParams, done) {
    console.log(subscriptionParams);
        db.get().query('insert into school_subscription set ?  ', [subscriptionParams], function(err, rows) {
            console.log('inside insert school advertisement query');
            if (err)
                return done(err)
            return done(null, rows);
        });
    },
    updateSchoolAdvertisement: function(schoolSubscriptionId, subscriptionParams, done) {
        db.get().query('update school_subscription set ? where subscription_id = ? ', [subscriptionParams, schoolSubscriptionId], function(err, rows) {
            console.log('inside insert school advertisement query');
            if (err)
                return done(err)
            return done(null, rows);
        });
    },
    updateSubscription: function(subscriptionParams, subscriptionId, done) {
        console.log(subscriptionParams, subscriptionId)
        db.get().query('update subscription_plans set ? where plan_id = ?  ', [subscriptionParams, parseInt(subscriptionId)], function(err, rows) {

            console.log('inside update query', rows);

            if (err)
                return done(err)
            return done(null, rows);
        });
    },
    getSchoolAdvertisements: function(done) {
        db.get().query('select * from school_subscription subscription\n\
                        join subscription_plans plan on plan.plan_id = subscription.subscription_plan_id and plan.plan_status = "1" and plan.plan_type="advertisement" \n\
                        left join school  on school.school_id = subscription.subscription_school_id and school.school_status = "1"  \n\
                        where subscription_status = "1" ', function(err, rows) {
            
            if (err)
                return done(err);
            else
                return done(null, rows);
        });
    },
    getSchoolAdvertisement: function(schoolSubscriptionId, done) {
        db.get().query('select * from school_subscription subscription\n\
                        join subscription_plans plan on plan.plan_id = subscription.subscription_plan_id and plan.plan_status = "1" and plan.plan_type="advertisement" \n\
                        left join school  on school.school_id = subscription.subscription_school_id and school.school_status = "1"  \n\
                        where subscription_id = ? ',  schoolSubscriptionId,function(err, rows) {
            if (err)
                return done(err);
            else
                return done(null, rows);
        });
    },
    getAdvertisementBySchool: function(schoolId, done) {
        db.get().query('select * from school_subscription subscription where subscription_school_id = ? ',  schoolId,function(err, rows) {
            if (err)
                return done(err);
            else
                return done(null, rows);
        });
    },
    getAdvertisements: function(done) {
        db.get().query('select * from subscription_plans subscription where plan_type = "advertisement" and plan_status = "1" ', function(err, rows) {
            if (err)
                return done(err);
            else
                return done(null, rows);
        });
    }
}