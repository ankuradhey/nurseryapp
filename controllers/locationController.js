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
    getBoards:function(req, res){
        board.getAll(function(err, rows){
            if(err)
                response.errors = err;
            else{
                response.boards = rows;
                response.success = true;
                response.error = false;
                response.message = 'success';
            }
            res.send(response);
        })
    }
};