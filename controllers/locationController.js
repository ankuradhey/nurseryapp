/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var location = require('../models/location.js'),
    response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []},
    validate = require('validate.js')
    ;
    

module.exports = {
    getCountries: function(req, res){
        location.getCountries(function(err, rows){
            if(err)
                response.errors = err;
            else{
                response.countries = rows;
                response.success = true;
                response.error = false;
                response.message = 'success';
            }
            res.send(response);
        });
    },
    getStates:function(req, res){
        var countryId = 0;
        
        if(req.params.hasOwnProperty('countryId'))
            countryId = req.params.countryId;
        
        console.log(countryId)
        
        if(countryId){
            location.getStatesByCountry(countryId, function(err, rows){
                if(err)
                    response.errors = err;
                else{
                    response.states = rows;
                    response.success = true;
                    response.error = false;
                    response.message = 'success';
                }
                res.send(response);
            })
        }else{
            location.getStates(function(err, rows){
                if(err)
                    response.errors = err;
                else{
                    response.states = rows;
                    response.success = true;
                    response.error = false;
                    response.message = 'success';
                }
                res.send(response);
            })
        }
    },
};