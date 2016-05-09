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
            response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []};
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
        
        if(countryId){
            location.getStatesByCountry(countryId, function(err, rows){
                response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []};
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
                response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []};
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
    getCities:function(req, res){
        var stateId = 0;
        
        if(req.params.hasOwnProperty('stateId'))
            stateId = req.params.stateId;
        
        if(stateId){
            location.getCitiesByState(stateId, function(err, rows){
                response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []};
                if(err)
                    response.errors = err;
                else{
                    response.cities = rows;
                    response.success = true;
                    response.error = false;
                    response.message = 'success';
                }
                res.send(response);
            })
        }else{
            location.getCities(function(err, rows){
                response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []};
                if(err)
                    response.errors = err;
                else{
                    response.cities = rows;
                    response.success = true;
                    response.error = false;
                    response.message = 'success';
                }
                res.send(response);
            })
        }
    },
    getAreas:function(req, res){
        var cityId = 0;
        
        if(req.params.hasOwnProperty('cityId'))
            cityId = req.params.cityId;
        
        if(cityId){
            location.getAreaByCity(cityId, function(err, rows){
                response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []};
                if(err)
                    response.errors = err;
                else{
                    response.areas = rows;
                    response.success = true;
                    response.error = false;
                    response.message = 'success';
                }
                res.send(response);
            })
        }else{
            location.getAreas(function(err, rows){
                response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []};
                if(err)
                    response.errors = err;
                else{
                    response.areas = rows;
                    response.success = true;
                    response.error = false;
                    response.message = 'success';
                }
                res.send(response);
            })
        }
    },
    
    getZones:function(req, res){
        var areaId = 0;
        
        if(req.params.hasOwnProperty('areaId'))
            areaId = req.params.areaId;
        
        if(areaId){
            location.getZonesByArea(areaId, function(err, rows){
                response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []};
                if(err)
                    response.errors = err;
                else{
                    response.zones = rows;
                    response.success = true;
                    response.error = false;
                    response.message = 'success';
                }
                res.send(response);
            })
        }else{
            location.getZones(function(err, rows){
                response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []};
                if(err)
                    response.errors = err;
                else{
                    response.zones = rows;
                    response.success = true;
                    response.error = false;
                    response.message = 'success';
                }
                res.send(response);
            })
        }
    },
};