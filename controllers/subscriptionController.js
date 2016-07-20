/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []};
var subscription = require('../models/subscription.js');
var responseClass = function() {
    return {
        error: true,
        success: false,
        code: 5012,
        message: 'Oops! Some error occurred',
        errors: []
    }

};

console.log('inside subscription controller')

module.exports = {
    getAll: function(req, res) {
        console.log('getting list of subscriptions');
        subscription.getAll("1", function(err, rows) {
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
    getOne: function(req, res) {
        console.log('getting one of subscription ');
        subscription.getOne(req.params.subscriptionId, function(err, rows) {
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
    addSubscription: function(req, res) {
        console.log('adding subscription', req.body.plan_name);
        subscription.getSubscriptionByName(req.body.plan_name, '', function(err, rows) {
            response = new responseClass;
            if (err) {
                console.log(err);
                response.errors = err;
                res.send(response);
            } else if (rows && rows.length) {
                console.log('duplicate plan name required');
                response.message = 'Duplicate record found';
                res.send(response);
            } else {
                subscription.addSubscription(req.body, function(err, rows) {
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
    updateSubscription: function(req, res) {
        console.log('updating subscription', req.body.plan_name);
        subscription.getSubscriptionByName(req.body.plan_name, req.params.subscriptionId, function(err, rows) {
            response = new responseClass;
            if (err) {
                console.log(err);
                response.errors = err;
                res.send(response);
            } else if (rows && rows.length) {
                console.log('duplicate plan name found');
                response.message = 'Duplicate record found';
                res.send(response);
            } else {
                subscription.updateSubscription(req.body, req.params.subscriptionId, function(err, rows) {
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
    updateSubscriptionStatus: function(req, res) {
        console.log('updating subscription status', req.body.plan_status);
        subscription.updateSubscription(req.body, req.params.subscriptionId, function(err, rows) {
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

    },
    getSchoolAdvertisements: function(req, res) {
        console.log('inside school advertisements');
        subscription.getSchoolAdvertisements(function(err, rows) {
            response = new responseClass;
            if (err) {
                console.log(err);
                response.errors = err;
                res.send(response);
            } else {
                response.error = false;
                response.success = true;
                response.message = 'Success';
                response.subscriptions = rows;
                res.send(response);
            }
        })
    },
    getSchoolAdvertisement: function(req, res) {
        subscription.getSchoolAdvertisement(req.params.schoolSubscriptionId, function(err, rows) {
            response = new responseClass;
            console.log('inside school subscription', rows);
            if (err) {
                console.log(err);
                response.errors = err;
                res.send(response);
            } else {
                response.error = false;
                response.success = true;
                response.message = 'Success';
                response.subscription = rows[0];
                res.send(response);
            }
        })
    },
    getAdvertisements: function(req, res) {
        subscription.getAdvertisements(function(err, rows) {
            response = new responseClass;
            if (err) {
                console.log(err);
                response.errors = err;
                res.send(response);
            } else {
                response.error = false;
                response.success = true;
                response.message = 'Success';
                response.advertisements = rows;
                res.send(response);
            }
        })
    },
    addSchoolAdvertisement: function(req, res) {
        if (req.body.subscription_school_id) {
            subscription.getAdvertisementBySchool(req.body.subscription_school_id, function(err, rows) {
                response = new responseClass;
                if (err) {
                    console.log(err);
                    response.errors = err;
                    res.send(response);
                } else if (rows && Object.keys(rows).length) {
                    console.log('duplicate record found');
                    response.message = 'School is already added with advertisement';
                    res.send(response);
                }
                else {
                    subscription.addSchoolAdvertisement(req.body, function(err, rows) {
                        response = new responseClass;
                        if (err) {
                            console.log(err);
                            response.errors = err;
                            res.send(response);
                        } else {
                            if (rows && rows.affectedRows) {
                                response.error = false;
                                response.success = true;
                                response.message = 'Success';
                                response.advertisements = rows;
                                res.send(response);
                            } else {
                                console.log(err);
                                response.errors = err;
                                res.send(response);
                            }
                        }
                    })
                }
            });
        } else {

            subscription.addSchoolAdvertisement(req.body, function(err, rows) {
                response = new responseClass;
                if (err) {
                    console.log(err);
                    response.errors = err;
                    res.send(response);
                } else {
                    if (rows && rows.affectedRows) {
                        response.error = false;
                        response.success = true;
                        response.message = 'Success';
                        response.advertisements = rows;
                        res.send(response);
                    } else {
                        console.log(err);
                        response.errors = err;
                        res.send(response);
                    }
                }
            })
        }

    },
    updateSchoolAdvertisement: function(req, res) {
        subscription.updateSchoolAdvertisement(req.params.schoolSubscriptionId, req.body, function(err, rows) {
            response = new responseClass;
            if (err) {
                console.log(err);
                response.errors = err;
                res.send(response);
            } else {
                if (rows && rows.affectedRows) {
                    response.error = false;
                    response.success = true;
                    response.message = 'Success';
                    res.send(response);
                } else {
                    response.errors = err;
                    res.send(response);
                }
            }
        });

    }
};