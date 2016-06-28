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
                response.errors = err;
                response.status = response.code;
                res.send(response);
            }else{
                response.facilities = rows;
                response.error = false;
                response.success = true;
                response.message = 'Success';
                res.send(response);
            }
        });
    },
    addFacility: function(req, res){
        console.log('adding facility - controller');
        facility.getFacilityByName(req.body.facility_name, function(err, rows){
            if(err){
                console.log(err);
                response.errors = err;
                response.status = 501;
                response.message = 'Server error';
                res.send(response);
            }else if(rows && rows.length){
                response.message = 'Facility already present';
                res.send(response);
            }else{
                facility.addFacility(req.body ,function(err, result){
                    if(err){
                        console.log(err);
                        response.errors = err;
                        response.status = 501;
                        response.message = 'Server error';
                        res.send(response);
                    }else{
                        response.error = false;
                        response.success = true;
                        response.message = 'Success';
                        response.facility = {facility_id:result.insertId,facility_name:req.body.facility_name}
                        res.send(response);
                    }
                })
            }
        });
    }
};