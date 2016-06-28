/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []};
var facility = require('../models/facility.js');

module.exports = {
    
    getFacilities: function(req, res){
        console.log('facility model being used now');
        facility.getFacilities(function(err, rows){
            if(err){
                console.log(err);
                res.errors = err;
                res.status = response.code;
                res.send(response);
            }else{
                response.facilities = rows;
                response.error = false;
                response.success = true;
                response.message = 'Success';
                res.send(response);
            }
        });
    }
};