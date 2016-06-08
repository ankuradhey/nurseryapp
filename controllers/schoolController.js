/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var school = require('../models/school.js'),
        board = require('../models/board.js'),
        response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []},
responseClass = function() {
    return {
        error: true,
        success: false,
        code: 501,
        message: 'Oops! Some error occurred',
        errors: []
    }

}
validate = require('validate.js'),
        config = require('../config') //get our config file
        ;


module.exports = {
    getAll: function(req, res) {
        school.getAll(function(err, rows) {
            if (err)
                response.errors = err;
            else {
                response.schools = rows;
                response.success = true;
                response.error = false;
                response.message = 'success';
            }
            res.send(response);
        });
    },
    getAllActive: function(req, res) {
        school.getAllActive(function(err, rows) {
            if (err)
                response.errors = err;
            else {
                response.schools = rows;
                response.success = true;
                response.error = false;
                response.message = 'success';
            }
            res.send(response);
        });
    },
    getOne: function(req, res) {
        var schoolId = req.params.schoolId
        school.getOne(schoolId, function(err, rows) {
            if (err) {
                response = new responseClass();
                response.errors = err;
            }
            else {
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
    getBoards: function(req, res) {
        board.getAll(function(err, rows) {
            if (err)
                response.errors = err;
            else {
                response.boards = rows;
                response.success = true;
                response.error = false;
                response.message = 'success';
            }
            res.send(response);
        })
    },
    addBoard: function(req, res) {
        board.addBoard(req.body.board_name, function(err, rows) {
            if (err) {
                response = new responseClass();
                response.errors = err;
            }
            else {
                response = new responseClass();
                response.message = 'Board Successfully added';
                response.success = true;
                response.error = false;
            }
            res.send(response);
        });
    },
    updateBoard: function(req, res) {
        board.updateBoard(req.params.boardId, req.body, function(err, rows) {
            if (err) {
                response = new responseClass();
                response.errors = err;
            }
            else {
                response = new responseClass();
                response.message = 'Board Successfully updaed';
                response.success = true;
                response.error = false;
            }
            res.send(response);
        });
    },
    getBoard: function(req, res) {
        board.getOne(req.params.boardId, function(err, rows) {
            if (err) {
                response = new responseClass();
                response.errors = err;
            }
            else {
                response = new responseClass();
                response.message = 'Board Successfully got';
                response.success = true;
                response.error = false;
                response.board = rows[0];
            }
            res.send(response);
        });
    },
    deleteBoard: function(req, res) {
        board.deleteBoard(req.params.boardId, function(err, rows) {
            if (err) {
                response = new responseClass();
                response.errors = err;
            }
            else {
                response = new responseClass();
                response.message = 'Board Successfully deleted';
                response.success = true;
                response.error = false;
            }
            res.send(response);
        });
    },
    addSchool: function(req, res) {

        //update school_img path
        if (req.body.school_logo) {
            req.body.school_logo = config.baseUrl + '/uploads/' + req.body.school_logo;
        }

        if (req.body.school_img)
            req.body.school_img = config.baseUrl + '/uploads/' + req.body.school_img;

        response = new responseClass;
        school.getSchoolAvailability(req.body, 0, function(err, rows) {
            console.log(err, rows);
            if (err) {
                response.errors = err;
                res.send(response);
            }
            else if (rows && Object.keys(rows).length) {
                response.message = 'Record already exist';
                for (var i in rows) {
                    if (rows[i]['school_email'] == req.body.school_email)
                        response.message = 'Email already exist';
                    else if (rows[i]['school_affiliation_code'] == req.body.school_affiliation_code)
                        response.message = 'School with same affiliation code already exist';
                    else if (rows[i]['school_phone'] == req.body.school_phone)
                        response.message = 'School with same phone number already exist';
                }
                res.json(response);
            } else {
                school.create(req.body, function(err, rows) {
                    if (err)
                        response.errors = err;
                    else {
                        response.message = 'School Successfully added';
                        response.success = true;
                        response.error = false;
                    }
                    res.send(response);
                })
            }
        });
        ;
    },
    updateSchool: function(req, res) {

        //update school_img path
        if (req.body.school_logo) {
            req.body.school_logo = config.baseUrl + '/uploads/' + req.body.school_logo;
        }

        if (req.body.school_img)
            req.body.school_img = config.baseUrl + '/uploads/' + req.body.school_img;

        var schoolId = req.params.schoolId

        school.getSchoolAvailability(req.body, schoolId, function(err, rows) {
            response = new responseClass;
            if (err) {
                response.errors = err;
                res.send(response);
            } else if (rows && Object.keys(rows).length) {
                response.message = 'Record already exist';
                for (var i in rows) {
                    if (rows[i]['school_email'] == req.body.school_email)
                        response.message = 'Email already exist';
                    else if (rows[i]['school_affiliation_code'] == req.body.school_affiliation_code)
                        response.message = 'School with same affiliation code already exist';
                    else if (rows[i]['school_phone'] == req.body.school_phone)
                        response.message = 'School with same phone number already exist';
                }
                res.send(response);
            } else {
                school.update(schoolId, req.body, function(err, rows) {
                    console.log(err);
                    if (err)
                        response.errors = err;
                    else {
                        response = {};
                        response.message = 'School Updated Successfully';
                        response.success = true;
                        response.error = false;
                    }
                    res.send(response);
                });
            }
        });
    },
    deleteSchool: function(req, res) {
        var schoolId = req.params.schoolId
        school.deleteSchool(schoolId, function(err, rows) {
            if (err)
                response.errors = err;
            else {
                response = {};
                response.message = 'School Deleted Successfully';
                response.success = true;
                response.error = false;
            }
            res.send(response);
        })
    },
    getMediums: function(req, res) {
        school.getMediums(function(err, rows) { // passing status as active : 1 for getting all active school types
            response = new responseClass;
            if (err)
                response.errors = err;
            else {
                response.mediums = rows;
                response.message = 'Success';
                response.success = true;
                response.error = false;
            }
            res.send(response);
        })
    },
    getMedium: function(req, res) {
        school.getMedium(req.params.mediumId, function(err, rows) {
            response = new responseClass;
            if (err)
                response.errors = err;
            else {
                response.medium = rows[0];
                response.message = 'Success';
                response.success = true;
                response.error = false;
            }
            res.send(response);
        })
    },
    addMedium: function(req, res) {
        school.getMediumByName(req.body.medium_name, 0, function(err, rows) {
            response = new responseClass;
            console.log(err, rows);
            if (err) {
                response.errors = err;
                res.send(response);
            } else if (rows && Object.keys(rows).length) {
                response.message = 'Record already exists';
                res.send(response);
            } else {
                console.log('inside');
                school.addMedium(req.body, function(err, rows) { // passing status as active : 1 for getting all active school types
                    if (err)
                        response.errors = err;
                    else {
                        response.message = 'Success';
                        response.success = true;
                        response.error = false;
                    }
                    res.send(response);
                });
            }
        });
    },
    updateMedium: function(req, res) {
        school.getMediumByName(req.body.medium_name, req.params.mediumId, function(err, rows) {
            console.log(rows);
            response = new responseClass;
            if (err) {
                response.errors = err;
                res.send(response);
            } else if (rows && Object.keys(rows).length) {
                response.message = 'Record already exists';
                res.send(response);
            } else {
                console.log('inside');
                school.updateMedium(req.body, req.params.mediumId, function(err, rows) { // passing status as active : 1 for getting all active school types
                    if (err)
                        response.errors = err;
                    else {
                        response.message = 'Success';
                        response.success = true;
                        response.error = false;
                    }
                    res.send(response);
                });
            }
        });
    },
    updateMediumStatus: function(req, res) {
        school.updateMediumStatus(req.body.medium_status, req.params.mediumId, function(err, rows) { // passing status as active : 1 for getting all active school types
            response = new responseClass;
            if (err)
                response.errors = err;
            else {
                response.message = 'Success';
                response.success = true;
                response.error = false;
            }
            res.send(response);
        });
    },
    deleteMedium: function(req, res) {
        school.deleteMedium(req.params.mediumId, function(err, rows) {
            response = new responseClass;
            if (err) {
                response.errors = err;
                console.log(err);
            } else {
                response.success = true;
                response.error = false;
                response.message = 'Success';
            }
            res.send(response);
        })
    },
    getSchoolTypes: function(req, res) {
        school.getSchoolTypes(function(err, rows) { // passing status as active : 1 for getting all active school types
            response = new responseClass;
            if (err)
                response.errors = err;
            else {
                response.types = rows;
                response.message = 'Success';
                response.success = true;
                response.error = false;
            }
            res.send(response);
        })
    },
    getSchoolType: function(req, res) {
        school.getSchoolType(req.params.schoolTypeId, function(err, rows) { // passing status as active : 1 for getting all active school types
            response = new responseClass;
            if (err)
                response.errors = err;
            else {
                response.type = rows[0];
                response.message = 'Success';
                response.success = true;
                response.error = false;
            }
            res.send(response);
        })
    },
    addSchoolType: function(req, res) {
        school.getSchoolTypeByName(req.body.school_type_name, 0, function(err, rows) {
            response = new responseClass;
            console.log(err, rows);
            if (err) {
                response.errors = err;
                res.send(response);
            } else if (rows && Object.keys(rows).length) {
                response.message = 'Record already exists';
                res.send(response);
            } else {
                console.log('inside');
                school.addSchoolType(req.body, function(err, rows) { // passing status as active : 1 for getting all active school types
                    if (err)
                        response.errors = err;
                    else {
                        response.message = 'Success';
                        response.success = true;
                        response.error = false;
                    }
                    res.send(response);
                });
            }
        });
    },
    updateSchoolType: function(req, res) {
        school.getSchoolTypeByName(req.body.school_type_name, req.params.schoolTypeId, function(err, rows) {
            if (err) {
                response.errors = err;
                res.send(response);
            } else if (rows && Object.keys(rows).length) {
                response.message = 'Record already exists';
                res.send(response);
            } else {
                school.updateSchoolType(req.body, req.params.schoolTypeId, function(err, rows) { // passing status as active : 1 for getting all active school types
                    response = new responseClass;
                    if (err)
                        response.errors = err;
                    else {
//                        response.type = rows[0];
                        response.message = 'Success';
                        response.success = true;
                        response.error = false;
                    }
                    res.send(response);
                });
            }

        });
    },
    updateSchoolTypeStatus: function(req, res) {
        console.log(req.body.status, req.params.schoolTypeId);
        school.updateSchoolTypeStatus(req.body.status, req.params.schoolTypeId, function(err, rows) { // passing status as active : 1 for getting all active school types
            response = new responseClass;
            if (err)
                response.errors = err;
            else {
                response.type = rows[0];
                response.message = 'Success';
                response.success = true;
                response.error = false;
            }
            res.send(response);
        });
    },
    deleteSchoolType: function(req, res) {
        school.deleteSchoolType(req.params.schoolTypeId, function(err, rows) { // passing status as active : 1 for getting all active school types
            response = new responseClass;
            if (err)
                response.errors = err;
            else {
                response.message = 'Success';
                response.success = true;
                response.error = false;
            }
            res.send(response);
        });
    }
};