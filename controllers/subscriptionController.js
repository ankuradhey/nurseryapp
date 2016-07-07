/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []};
var subscription = require('../models/subscription.js');
var responseClass = function () {
    return {
        error: true,
        success: false,
        code: 501,
        message: 'Oops! Some error occurred',
        errors: []
    }

};


module.exports = {
    getAll: function (req, res) {
        console.log('getting list of subscriptions');
        subscription.getAll("1", function (err, rows) {
            response = new responseClass;
            if (err) {
                console.log(err);
                response.errors = err;
                res.send(response);
            } else {
                response.plans = rows;
                response.error = false;
                response.success = true;
                response.message = 'Success';
                res.send(response);
            }
        });
    },
    getOne: function (req, res) {
        console.log('getting one of subscription ');
        subscription.getOne(req.params.subscriptionId, function (err, rows) {
            response = new responseClass;
            if (err) {
                console.log(err);
                response.errors = err;
                res.send(response);
            } else {
                response.plan = rows[0];
                response.error = false;
                response.success = true;
                response.message = 'Success';
                res.send(response);
            }
        });
    },
    addSubscription: function (req, res) {
        console.log('adding subscription', req.body.plan_name);
        subscription.getSubscriptionByName(req.body.plan_name, '', function (err, rows) {
            response = new responseClass;
            console.log(rows);
            if (err) {
                console.log(err);
                response.errors = err;
                res.send(response);
            } else if (rows && rows.length) {
                console.log('duplicate plan name required');
                response.message = 'Duplicate record found';
                res.send(response);
            } else {
                subscription.addSubscription(req.body, function (err, rows) {
                    if (err) {
                        console.log(err);
                        response.errors = err;
                        res.send(response);
                    } else {
                        response.error = false;
                        response.success = true;
                        response.message = 'Success';
                        res.send(response);
                    }
                })
            }
        })
    },
    updateSubscription: function (req, res) {
        console.log('updating subscription', req.body.plan_name);
        subscription.getSubscriptionByName(req.body.plan_name, req.params.subscriptionId, function (err, rows) {
            response = new responseClass;
            console.log(rows);
            if (err) {
                console.log(err);
                response.errors = err;
                res.send(response);
            } else if (rows && rows.length) {
                console.log('duplicate plan name found');
                response.message = 'Duplicate record found';
                res.send(response);
            } else {
                subscription.updateSubscription(req.body, req.params.subscriptionId, function (err, rows) {
                    if (err) {
                        console.log(err);
                        response.errors = err;
                        res.send(response);
                    } else {
                        response.error = false;
                        response.success = true;
                        response.message = 'Success';
                        res.send(response);
                    }
                })
            }
        })
    },
    updateSubscriptionStatus: function (req, res) {
        console.log('updating subscription status', req.body.plan_status);
        subscription.updateSubscription(req.body, req.params.subscriptionId, function (err, rows) {
            response = new responseClass;
            if (err) {
                console.log(err);
                response.errors = err;
                res.send(response);
            } else {
                response.error = false;
                response.success = true;
                response.message = 'Success';
                res.send(response);
            }
        })

    }
};