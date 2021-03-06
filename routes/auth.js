var jwt = require("jsonwebtoken"), // used to create, sign, and verify tokens
        response = {error: true, success: false, message: 'Oops! Some error occurred', code: 400},
responseClass = function() {
    return {
        error: true,
        success: false,
        code: 501,
        message: 'Oops! Some error occurred',
        errors: []
    }

}
userModel = require("../models/user.js"),
        validate = require('validate.js'),
        config = require('../config'),
        nodemailer = require('nodemailer'),
        transporter = nodemailer.createTransport('smtps://ankuradhey%40gmail.com:alldayilovesports@smtp.gmail.com')
        ;

var auth = {
    login: function(req, res) {
        var username = req.body.user_email || '';
        var password = req.body.user_password || '';

        console.log('username and password are - ', username, password);
        response = new responseClass;
        if (!username || !password) {
            console.log('inside');
            res.status(200);
            response.code = 401;
            response.message = 'Invalid Credentials';
            res.json(response);
            return;
        }

        //use query to validate
        auth.validate(username, password, function(err, result) {
            if (err) {
                res.status(200);
                response.message = 'Oops! Some error occurred';
                response.code = 500;
                response.errors = err;
                console.log(err);
                response.developer = {message: 'Db error occurred'};
                console.log(response);
                res.json(response);
                return;
            } else {
                if (result.length && result[0].user_type == 'parent') {
                    response.message = 'Success';
                    response.success = true;
                    response.error = false;
                    var userDetails = {
                        user_email: result[0].user_email,
                        user_type: result[0].user_type,
                        user_id: result[0].user_id,
                        full_name: result[0].user_full_name,
                        first_name: result[0].first_name,
                        last_name: result[0].last_name,
                        phone: result[0].user_phone,
                    };
                    generateToken(userDetails, function(_token) {
                        response.token = _token.token;
                        response.user = _token.user;
                        res.json(response);
                        return;
                    });

                } else {
                    res.status(200);
                    response.message = 'Invalid Username or password';
                    response.code = 500;
                    response.errors = err;
                    console.log(err);
                    res.json(response);
                }
            }
        });

    },
    adminLogin: function(req, res) {
        var username = req.body.user_email || '';
        var password = req.body.user_password || '';

        console.log('username and password are - ', username, password);
        response = new responseClass;
        //use query to validate
        auth.validate(username, password, function(err, result) {
            if (err) {
                res.status(200);
                response.message = 'Oops! Some error occurred';
                response.code = 500;
                response.errors = err;
                console.log(err);
                response.developer = {message: 'Db error occurred'};
                console.log(response);
                res.json(response);
                return;
            } else {
                if (result.length) {
                    if (result[0].user_type == 'school' || result[0].user_type == 'admin') {
                        response.message = 'Success';
                        response.success = true;
                        response.error = false;
                        var userDetails = {user_email: result[0].user_email, user_type: result[0].user_type, user_id: result[0].user_id};
                        generateToken(userDetails, function(_token) {
                            response.token = _token.token;
                            response.user = _token.user;
                            res.json(response);
                            return;
                        });
                    } else {
                        response.message = 'Usernot authorized to access';
                        response.code = 501;
                        response.error = true;
                        response.success = false;
                        res.json(response);
                        return;
                    }
                } else {
                    res.status(200);
                    response.message = 'Invalid Username or password';
                    response.code = 500;
                    response.errors = err;
                    console.log(err);
                    res.json(response);
                }
            }
        });

    },
    socialLogin: function(req, res) {
        var socialId = req.body.socialId || '';
        var socialType = req.body.socialType || 'facebook';
        console.log('socialId and socialType are - ', socialId, socialType);

        if (!socialType || !socialId) {
            res.status(401);
            response.code = 401;
            response.message = 'Invalid Credentials';
            res.json(response);
            return;
        }

        //check if user already exists
        auth.socialValidate(socialId, socialType, function(err, result) {
            if (err) {
                res.status(200);
                response.message = 'Oops! Some error occurred';
                response.code = 500;
                response.errors = err;
                console.log(err);
                response.developer = {message: 'Db error occurred'};
                console.log(response);
                res.json(response);
                return;
            } else {
                if (result.length) {
                    response.message = 'Success';
                    response.success = true;
                    response.error = false;
                    var userDetails = {
                        user_email: result[0].user_email,
                        user_type: result[0].user_type,
                        user_id: result[0].user_id,
                        full_name: result[0].user_full_name,
                        first_name: result[0].first_name,
                        last_name: result[0].last_name,
                        phone: result[0].user_phone,
                    };
                    generateToken(userDetails, function(_token) {
                        response.token = _token.token;
                        response.user = _token.user;
                        res.json(response);
                        return;
                    });

                } else {
                    //if user not found then register it
                    userModel.validateUser(req.body.user_email, req.body.user_phone, function(err, rows) {
//                        console.log('checked user exists - ',rows);
                        if (err) {
                            res.status(200);
                            response.message = 'Oops! Some error occurred';
                            response.code = 500;
                            response.errors = err;
                            console.log(err);
                            response.developer = {message: 'Db error occurred'};
                            console.log(response);
                            res.json(response);
                            return;
                        } else {
                            if (rows.length) {
                                auth.socialUserUpdate(socialId, socialType, req.body, rows[0], function(err, result) {
                                    if (err) {
                                        response.errors = err;
                                        res.json(response);
                                        return;
                                    } else {
                                        if (result.affectedRows) {
                                            console.log('result after update socially - ', result);
                                            response.message = 'Success';
                                            response.success = true;
                                            response.error = false;
                                            var userDetails = req.body;
                                            userDetails.user_id = rows[0].user_id;
                                            generateToken(userDetails, function(_token) {
                                                response.token = _token.token;
                                                response.user = _token.user;
                                                res.json(response);
                                                return;
                                            });

                                        } else {
                                            response.message = 'Some error occurred';
                                            res.json(response);
                                            return;
                                        }
                                    }
                                })
                            } else {
                                auth.socialSignUp(socialId, socialType, req.body, function(err, result) {
                                    if (err) {
                                        response.errors = err;
                                        res.json(response);
                                    } else {
                                        console.log('socially user registered');
                                        response.message = 'Success';
                                        response.success = true;
                                        response.error = false;
                                        generateToken(req.body, function(_token) {
                                            response.token = _token.token;
                                            response.user = _token.user;
                                            res.json(response);
                                            return;
                                        });

                                    }

                                })
                            }
                        }
                    })
                }
            }
        });

    },
    socialUserUpdate: function(socialId, socialType, reqParams, userData, done) {
        var updateData = {};
        if (reqParams['user_email'] && !userData['user_email']) {
            updateData['user_email'] = reqParams['user_email'];
        }
        if (reqParams['user_first_name'] && !userData['user_first_name']) {
            updateData['user_first_name'] = reqParams['user_first_name'];
        }
        if (reqParams['user_last_name'] && !userData['user_last_name']) {
            updateData['user_last_name'] = reqParams['user_last_name'];
        }
        if (reqParams['user_phone'] && !userData['user_phone']) {
            updateData['user_phone'] = reqParams['user_phone'];
        }

        if (socialType == 'facebook')
            updateData['user_facebook_id'] = socialId;
        else
            updateData['user_google_id'] = socialId;

        console.log(updateData, Object.keys(updateData).length, userData.user_id);


        if (Object.keys(updateData).length) {
            userModel.updateSocial(updateData, userData, function(err, rows) {
                if (err) {
                    return done(err);
                }
                else {
                    return done(null, rows);
                }

            })
        } else {
            return done('no parameters found for user to be updated');
        }
    },
    socialSignUp: function(socialId, socialType, userParams, done) {
        delete userParams.socialId;
        delete userParams.socialType;
        userModel.socialSignUp(socialId, socialType, userParams, function(err, result) {
            if (err)
                done(err);
            else
                done(null, result);
        })
    },
    forgotPassword: function(req, res, done) {

        //TO DO - email validation
        userModel.getSchoolUser(req.body.user_email, function(err, data) {
            if (err) {
                response = new responseClass;
                response.errors = err;
                console.log(err);
                return res.json(response);
            } else {
                console.log(data);
                var mailOptions = {
                    from: '"Nurseryapp" <ankuradhey@gmail.com>', // sender address 
                    to: req.body.user_email, // list of receivers 
                    subject: 'Forgot Password', // Subject line 
                    text: 'To reset your password, <br /> here is your link <br /> <a href="' + config.baseUrl + '/user/resetpassword/' + data[0].school_activation_code + '">click here</a>.', // plaintext body 
                    html: 'To reset your password, <br /> here is your link <br /> <a href="' + config.baseUrl + '/user/resetpassword/' + data[0].school_activation_code + '">click here</a>.' // html body
                };
                // send mail with defined transport object 
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error);
                        return res.json(response);
                    } else {
                        console.log('Message sent: ' + info.response);
                        response.message = 'Invalid Username or password';
                        response.error = false;
                        response.success = true;
                        res.json(response);
                        //done(null);
                    }

                });
            }
        });



    },
    socialValidate: function(socialId, socialType, done) {
        userModel.socialLoginCheck(socialId, socialType, function(err, rows) {
            if (err) {
                done(err, []);
            } else {
                done(null, rows);
            }
        });
    },
    validate: function(username, password, done) {
        //username is email here
        var invalid = validate.single(username, {presence: true, email: true});
        if (!invalid) {
            userModel.loginCheck(username, password, function(err, rows) {
                if (err) {
                    done(err, []);
                } else {
                    done(null, rows);
                }
            });
        } else {
            done('Invalid Email address');
        }
    },
    validateUser: function(username, done) {
        //var invalid = validate.single(username, {presence:true, email:true});
        //if(!invalid)
        {
            userModel.validateUser(username, username, function(err, rows) {
                if (err) {
                    done(err, []);
                } else {
                    done(null, rows);
                }

            });
        }
        //else{
        //  done(null, []);
//            return false;
        //}
    }
};

//private method
function generateToken(user, done) {
    console.log(user);
    var token = jwt.sign(user, config.secret, {
        expiresIn: config.loginExpirySeconds // expires in 24 hours
    });
    return done({
        token: token,
        user: user,
        expires: config.loginExpirySeconds
    });
}
module.exports = auth;