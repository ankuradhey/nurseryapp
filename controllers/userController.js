/*
 * 
 * @todos
 * 1. use async js for simplifying code
 */

var user = require('../models/user.js'),
        response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []},
        responseClass = function(){
            return {
                error:true,
                success:false,
                code:501,
                message:'Oops! Some error occurred',
                errors:[]
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
    register: function(req, res) {

        var userParams = req.body;
        console.log(userParams);
//        var invalid = validate(userParams, userSchema);
        res.setHeader('Content-Type', 'application/json');
        var $invalidRes = validate(userParams, userSchema);

        if ($invalidRes) {
            response.errors = $invalidRes;
            res.send(JSON.stringify(response));
        } else {
            console.log('$invalidRes',$invalidRes);
            user.validateUser(userParams.user_email, userParams.user_phone, function(err, rows) {
                if (err) {
                    response.message = "Oops! Some error occurred";
                    console.log(err);
                    res.send(JSON.stringify(response))
                } else if (rows.length) {
                    if (rows[0].user_phone == userParams.user_phone)
                        response.message = "User with " + userParams.user_phone + " number already exists";
                    else if (rows[0].user_email == userParams.user_email)
                        response.message = "User with " + userParams.user_email + " email id already exists";
                    else
                        console.log('Error: user with number and phone does not exist. Still user not allowed to register. Resolve this');

                    res.send(JSON.stringify(response));

                } else {
                    user.create(userParams, function(err, userId) {
                        if (err) {
                            console.log(err);
                            response.message = 'Oops! Some error occurred';
                        } else {
                            var token = jwt.sign(userParams, config.secret,{
                                expiresIn: config.loginExpirySeconds // expires in 24 hours
                            });
                            reponse.token = token;
                            response.success = true;
                            response.error = false;
                            response.message = 'User successfully registered';
                            response.userId = userId;
                        }
                        res.send(JSON.stringify(response));
                    })
                }

            });
        }
    },
    /*
     * Login
     * ------------
     * Method: POST
     * 
     */
    // NOT USED ANYMORE
    login: function(req, res) {

        var userParams = req.body;
        res.setHeader('Content-Type', 'application/json');
        validate.async(userParams, userLoginSchema).then(function(attributes) {// success
            console.log('validating..');
            user.validateUser(userParams.user_email, userParams.user_password, function(err, rows) {
                if (err) {
                    response.message = "Oops! Some error occurred";
                    console.log(err);
                    res.send(JSON.stringify(response))
                } else if (rows.length) {
                    response.error = false;
                    response.success = true;
                    response.message = "User successfully logged in";

                    var token = jwt.sign(userParams, app.get('superSecret'), {
                        expiresInMinutes: app.get('loginExpiryMinutes') // expires in 24 hours
                    });

                    response.token = token;

                    res.send(JSON.stringify(response));
                } else {
                    response.message = 'Username or password not correct';
                    res.send(JSON.stringify(response));
                }
            })

        }, function(error) { //error
            console.log(error);
            response.errors = error;
            res.send(JSON.stringify(response));
        });

    },
    
    getOne: function(req, res){
        var $valid = validate.isNumber(parseInt(req.params.userId));
        console.log($valid,req.params.userId);
        if(!$valid){
            res.status(400);
            response.code = 400;
            response.message = 'Invalid user id passed';
            res.json(JSON.stringify(response));
        }else{
        user.getAllByUser(req.params.userId, function(err, rows){
            if(err){
                res.status(500);
                response.code = 500;
                response.message = 'SQL error';
                res.json(JSON.stringify(response));
            }else{
                if(rows && rows.length){
                    response.user = rows[0];
                    response.success = true;
                    response.error = false;
                    response.message = 'Success';
                    res.json(JSON.stringify(response));
                }else{
                    res.status(400);
                    res.json(JSON.stringify(response));
                }
            }
            
        });
        }
    },
    getParents: function(req, res){
        user.getAllParents(function(err, rows){
            if(err){
                response = new responseClass();
                response.message = 'SQL error';
                res.json(response);
            }else{
                response = new responseClass();
                response.parents = rows;
                response.success = true;
                response.error = false;
                response.message = 'Success';
                res.json(response);
            }
            
        });
    }
};