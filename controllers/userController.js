/*
 * 
 * @todos
 * 1. use async js for simplifying code
 */

var user = require('../models/user.js'),
        response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []},
responseClass = function () {
    return {
        error: true,
        success: false,
        code: 501,
        message: 'Oops! Some error occurred',
        errors: []
    }
}
validate = require('validate.js'),
        config = require('../config'),
        jwt = require("jsonwebtoken")
        ;

//defining schema for user
var userSchema = {
    user_type: {
        presence: true,
        inclusion: {
            within: ['parent', 'school', 'admin'],
            message: "Please enter valid user type"
        }
    },
    user_email: {
        presence: true,
        email: {
            message: "Please enter valid email address"
        }
    },
    user_password: {
        presence: true,
        length: {
            minimum: 6,
            maximum: 50
        }
    },
    user_first_name: {
        presence: true
    },
    user_last_name: {
        presence: true
    },
    user_phone: {
        presence: true,
        format: {
            pattern: /\d{10}?/
        }
    }
};

var userLoginSchema = {
    user_email: {
        presence: true,
        email: {
            message: "Please enter valid email address"
        }
    },
    user_password: {
        presence: true,
        length: {
            minimum: 6,
            maximum: 50
        }
    },
    user_type: {
        presence: true,
        inclusion: {
            within: ['parent', 'school', 'admin'],
            message: "Please enter valid user type"
        }
    }
}

module.exports = {
    /*
     * Registration
     * ------------
     * Method: POST
     * 
     */
    register: function (req, res) {

        var userParams = req.body;
        console.log(userParams);
//        var invalid = validate(userParams, userSchema);
        res.setHeader('Content-Type', 'application/json');
        var $invalidRes = validate(userParams, userSchema);
        response = new responseClass();
        if ($invalidRes) {
            response.errors = $invalidRes;
            res.send(JSON.stringify(response));
        } else {
            console.log('$invalidRes', $invalidRes);
            user.validateUser(userParams.user_email, userParams.user_phone, function (err, rows) {
                if (err) {
                    response.message = "Oops! Some error occurred";
                    console.log(err);
                    console.log('error occurred');
                    res.send(JSON.stringify(response))
                } else if (rows.length) {
                    if (rows[0].user_phone == userParams.user_phone)
                        response.message = "User with " + userParams.user_phone + " number already exists";
                    else if (rows[0].user_email == userParams.user_email)
                        response.message = "User with " + userParams.user_email + " email id already exists";
                    else
                        console.log('Error: user with number and phone does not exist. Still user not allowed to register. Resolve this');
                    console.log('user found');
                    res.send(JSON.stringify(response));

                } else {
                    user.create(userParams, function (err, userId) {
                        if (err) {
                            console.log(err);
                            response.message = 'Oops! Some error occurred';
                        } else {
                            var token = jwt.sign(userParams, config.secret, {
                                expiresIn: config.loginExpirySeconds // expires in 24 hours
                            });
                            reponse.token = token;
                            response.success = true;
                            response.error = false;
                            response.message = 'User successfully registered';
                            response.userId = userId;
                            console.log('User registered! Hurray!!');
                        }
                        res.send(response);
                    })
                }

            });
        }
    },
    getOne: function (req, res) {
        var $valid = validate.isNumber(parseInt(req.params.userId));
        console.log($valid, req.params.userId);
        response = new responseClass();
        if (!$valid) {
            response.code = 400;
            response.message = 'Invalid user id passed';
            res.json(response);
        } else {
            user.getAllByUser(req.params.userId, function (err, rows) {
                if (err) {
                    response.code = 500;
                    response.message = 'SQL error';
                    res.json(response);
                } else {
                    if (rows && rows.length) {
                        response.user = rows[0];
                        response.success = true;
                        response.error = false;
                        response.message = 'Success';
                        res.json(response);
                    } else {
                        response.code = 400;
                        res.json(response);
                    }
                }

            });
        }
    },
    getParents: function (req, res) {
        user.getAllParents(function (err, rows) {
            if (err) {
                response = new responseClass();
                response.message = 'SQL error';
                res.json(response);
            } else {
                response = new responseClass();
                response.parents = rows;
                response.success = true;
                response.error = false;
                response.message = 'Success';
                res.json(response);
            }

        });
    },
    addParent: function (req, res) {
        //check if user with same id or email exists
        user.validateUser(req.body.user_email, req.body.user_phone, function (err, rows) {
            response = new responseClass();
            if (err) {
                response.code = 501;
                response.errors = err;
                res.json(response);
            } else {
                //user already exists
                if (rows && rows.length) {
                    response.code = 502;
                    response.message = 'User already exists';
                    res.json(response);
                } else {
                    user.create(req.body, function (err, userId) {
                        if (err) {
                            response.code = 501;
                            response.errors = err;
                            res.json(response);
                        } else {
                            response.message = 'Success';
                            response.success = true;
                            response.error = false;
                            res.json(response);
                        }
                    })
                }
            }
        })
    },
    deleteParent: function (req, res) {
        //check if user with same id or email exists
        response = new responseClass();
        user.deleteParent(req.params.parentId, function (err, rows) {
            console.log(rows);
            if (err) {
                response.code = 501;
                response.errors = err;
                res.json(response);
            } else {
                if(rows.affectedRows){
                    response.message = 'Success';
                    response.success = true;
                    response.error = false;
                    res.json(response);
                }else{
                    response.code = 501;
                    response.errors = err;
                    res.json(response);
                }
            }
        })
    },
    updateParent: function (req, res) {
        //check if user with same id or email exists
        response = new responseClass();
        user.updateSocial( req.body, {user_id:req.params.parentId}, function (err, rows) {
            console.log(rows);
            if (err) {
                response.code = 501;
                response.errors = err;
                res.json(response);
            } else {
                if(rows.affectedRows){
                    response.message = 'Success';
                    response.success = true;
                    response.error = false;
                    res.json(response);
                }else{
                    response.code = 501;
                    response.errors = err;
                    res.json(response);
                }
            }
        })
    }
};