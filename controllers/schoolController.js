/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var school = require('../models/school.js'),
    board = require('../models/board.js'),
    response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []},
    responseClass = function(){
        return {
            error:true,
            success: false,
            code: 501,
            message:'Oops! Some error occurred',
            errors:[]
        }
        
    }
    validate = require('validate.js')
    ;
    

module.exports = {
    getAll: function(req, res){
        school.getAll(function(err, rows){
            if(err)
                response.errors = err;
            else{
                response.schools = rows;
                response.success = true;
                response.error = false;
                response.message = 'success';
            }
            res.send(response);
        });
    },
    getAllActive: function(req, res){
        school.getAllActive(function(err, rows){
            if(err)
                response.errors = err;
            else{
                response.schools = rows;
                response.success = true;
                response.error = false;
                response.message = 'success';
            }
            res.send(response);
        });
    },
    getOne: function(req, res){
        var schoolId = req.params.schoolId
        school.getOne(schoolId,function(err, rows){
            if(err){
                response = new responseClass();
                response.errors = err;
            }
            else{
                response = new responseClass();
                response.school = rows[0];
                response.success = true;
                response.error = false;
                response.message = 'success';
            }
            res.send(response);
        })
        //TO DO
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
    },
    addBoard: function(req, res){
        board.addBoard(req.body.board_name, function(err, rows){
            if(err){
                response = new responseClass();
                response.errors = err;
            }
            else{
                response = new responseClass();
                response.message = 'Board Successfully added';
                response.success = true;
                response.error = false;
            }
            res.send(response);
        });
    },
    updateBoard: function(req, res){
        board.updateBoard(req.params.boardId, req.body, function(err, rows){
            if(err){
                response = new responseClass();
                response.errors = err;
            }
            else{
                response = new responseClass();
                response.message = 'Board Successfully updaed';
                response.success = true;
                response.error = false;
            }
            res.send(response);
        });
    },
    getBoard: function(req, res){
        board.getOne(req.params.boardId, function(err, rows){
            if(err){
                response = new responseClass();
                response.errors = err;
            }
            else{
                response = new responseClass();
                response.message = 'Board Successfully got';
                response.success = true;
                response.error = false;
                response.board = rows[0];
            }
            res.send(response);
        });
    },
    deleteBoard: function(req, res){
        board.deleteBoard(req.params.boardId, function(err, rows){
            if(err){
                response = new responseClass();
                response.errors = err;
            }
            else{
                response = new responseClass();
                response.message = 'Board Successfully deleted';
                response.success = true;
                response.error = false;
            }
            res.send(response);
        });
    },
    addSchool: function(req, res){
        school.create(req.body, function(err, rows){
            if(err)
                response.errors = err;
            else{
                response.message = 'School Successfully added';
                response.success = true;
                response.error = false;
            }
            res.send(response);
        });
    },
    updateSchool: function(req, res){
        var schoolId = req.params.schoolId
        school.update(schoolId, req.body, function(err, rows){
            if(err)
                response.errors = err;
            else{
                response = {};
                response.message = 'School Updated Successfully';
                response.success = true;
                response.error = false;
            }
            res.send(response);
        })
    },
    deleteSchool: function(req, res){
        var schoolId = req.params.schoolId
        school.deleteSchool(schoolId, function(err, rows){
            if(err)
                response.errors = err;
            else{
                response = {};
                response.message = 'School Deleted Successfully';
                response.success = true;
                response.error = false;
            }
            res.send(response);
        })
    }
};