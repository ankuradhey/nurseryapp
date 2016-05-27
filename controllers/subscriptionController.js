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
        code: 501,
        message: 'Oops! Some error occurred',
        errors: []
    }

};


module.exports = {
    
    getAll: function(req, res){
        console.log('getting list of subscriptions');
        subscription.getAll("1", function(err, rows){
            response = new responseClass;
            if(err){
                console.log(err);
                response.errors = err;
                res.send(response);
            }else{
                response.plans = rows;
                response.error = false;
                response.success = true;
                response.message = 'Success';
                res.send(response);
            }
        });
    },
    getOne: function(req, res){
        console.log('getting one of subscription ');
        subscription.getOne(req.params.subscriptionId, function(err, rows){
            response = new responseClass;
            if(err){
                console.log(err);
                response.errors = err;
                res.send(response);
            }else{
                response.plan = rows[0];
                response.error = false;
                response.success = true;
                response.message = 'Success';
                res.send(response);
            }
        });
    }
};