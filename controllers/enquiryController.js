/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []};
var enquiry = require('../models/enquiry.js');
var responseClass = function() {
    return {
        error: true,
        success: false,
        code: 501,
        message: 'Oops! Some error occurred',
        errors: []
    }
}

module.exports = {
    addEnquiry: function(req, res){
        enquiry.addEnquiry(req.body, function(err, rows){
            response = new responseClass;
            if(err){
                console.log(err);
                response.errors = err;
                res.send(response);
            }else{
                response.success = true;
                response.error = false;
                response.message = 'Success';
                res.send(response);
            }
        })
    }
}