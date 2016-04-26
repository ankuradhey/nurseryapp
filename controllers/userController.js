/*
 * 
 * @todos
 * 1. use async js for simplifying code
 */

var user = require('../models/user.js'),
        response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []},
validate = require('validate.js')
        ;

module.exports.controller = function(app) {

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
            format:{
                pattern:/\d{10}?/
            }
        }
    }

    /*
     * Registration
     * ------------
     * Method: POST
     * 
     */
    app.post('/adduser', function(req, res) {
        var userParams = req.body;
        console.log(userParams);
//        var invalid = validate(userParams, userSchema);
        res.setHeader('Content-Type', 'application/json');
        validate.async(userParams, userSchema).then(function(attributes){// success
            console.log('validating..');
            
            user.validateUser(userParams.user_email, userParams.user_phone, function(err, rows){
                if(err){
                    response.message = "Oops! Some error occurred";
                    console.log(err);
                    res.send(JSON.stringify(response))
                }else if(rows.length){
                    if(rows[0].user_phone == userParams.user_phone)
                        response.message = "User with "+userParams.user_phone+" number already exists";
                    else if(rows[0].user_email == userParams.user_email)
                        response.message = "User with "+userParams.user_email+" email id already exists";
                    else
                        console.log('Error: user with number and phone does not exist. Still user not allowed to register. Resolve this');
                    
                    res.send(JSON.stringify(response));
                    
                }else{
                    user.create(userParams, function(err, userId) {
                        if (err) {
                            console.log(err);
                            response.message = 'Oops! Some error occurred';
                        }else{
                            response.success = true;
                            response.error = false;
                            response.message = 'User successfully registered';
                            response.userId = userId;
                        }
                        res.send(JSON.stringify(response));
                    })
                }
            })
            
        } , function(error){ //error
            console.log(error);
            response.errors = error;
            res.send(JSON.stringify(response));
        });
        
        
//        if (invalid && Object.keys(invalid).length) {
//            var i = 0;
//            //series - first
//            async.each(invalid, function(result, callback) {
//                response.errors[i] = result;
//                i++;
//            }, function(err) {
//                if(err){
//                    response.message = err;
//                }
//            });
//            res.send(JSON.stringify(response));
//        } else {
//            user.create(userParams, function(err, userId) {
//                if (err) {
//                    response.message = err;
//                }else{
//                    response.success = true;
//                    response.error = false;
//                    response.message = 'User successfully registered';
//                    response.userId = userId;
//                }
//                res.send(JSON.stringify(response));
//            })
//
//        }
    });
}