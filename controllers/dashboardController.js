/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []};
var dashboard = require('../models/dashboard.js');

module.exports = {
    
    getCount: function(req, res){
        console.log('dashboard model being used now');
        dashboard.getCount(function(err, rows){
            if(err){
                console.log(err);
                res.errors = err;
                res.status = response.code;
                res.send(response);
            }else{
                response.items = rows[0];
                response.error = false;
                response.success = true;
                response.message = 'Success';
                res.send(response);
            }
        });
    }
};