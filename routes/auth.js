var jwt = require("jsonwebtoken"), // used to create, sign, and verify tokens
response = {error:true,success:false,message:'Oops! Some error occurred',code:400},
userModel = require("../models/user.js"),
validate = require('validate.js'),
config = require('../config')
;

var auth = {
    login: function(req, res){
        var username = req.body.user_email || '';
        var password = req.body.user_password || '';
        
        console.log('username and password are - ',username, password);
        if(!username || !password){
            console.log('inside');
            res.status(200);
            response.code = 401;
            response.message = 'Invalid Credentials';
            res.json(JSON.stringify(response));
            return;
        }
        
        //use query to validate
        auth.validate(username, password, function(err, result){
            if(err){
                res.status(200);
                response.message = 'Oops! Some error occurred';
                response.code = 500;
                response.errors = err;
                console.log(err);
                response.developer = {message:'Db error occurred'};
                console.log(response);
                res.json(JSON.stringify(response));
                return;
            }else{
                if(result.length){
                    response.message = 'Success';
                    response.success = true;
                    response.error = false;
                    generateToken(req.body, function(_token){
                        response.token = _token.token;
                        response.user = _token.user;
                        res.json(response);
                        return;
                    });
                    
                }else{
                    res.status(200);
                    response.message = 'Invalid Username or password';
                    response.code = 500;
                    response.errors = err;
                    console.log(err);
                    res.json(JSON.stringify(response));
                }
            }
        });
        
    },
    socialLogin:function(req, res){
        var socialId = req.body.socialId || '';
        var socialType = req.body.socialType || 'facebook';
        console.log('socialId and socialType are - ',socialId, socialType);
        
        if(!socialType || !socialId){
            res.status(401);
            response.code = 401;
            response.message = 'Invalid Credentials';
            res.json(JSON.stringify(response));
            return;
        }
        
        //check if user already exists
        auth.socialValidate(socialId, socialType, function(err, result){
            if(err){
                res.status(200);
                response.message = 'Oops! Some error occurred';
                response.code = 500;
                response.errors = err;
                console.log(err);
                response.developer = {message:'Db error occurred'};
                console.log(response);
                res.json(JSON.stringify(response));
                return;
            }else{
                if(result.length){
                    response.message = 'Success';
                    response.success = true;
                    response.error = false;
                    generateToken(req.body, function(_token){
                        response.token = _token.token;
                        response.user = _token.user;
                        res.json(response);
                        return;
                    });
                    
                }else{
                    //if user not found then register it
                    userModel.validateUser(req.body.user_email, req.body.user_phone, function(err, rows){
//                        console.log('checked user exists - ',rows);
                        if(err){
                            res.status(200);
                            response.message = 'Oops! Some error occurred';
                            response.code = 500;
                            response.errors = err;
                            console.log(err);
                            response.developer = {message:'Db error occurred'};
                            console.log(response);
                            res.json(JSON.stringify(response));
                            return;
                        }else{
                            if(rows.length){
                                auth.socialUserUpdate(socialId,socialType, req.body, rows[0], function(err, result){
                                    if(err){
                                        response.errors = err;
                                        res.json(response);
                                        return;
                                    }else{
                                        if(result.affectedRows){
                                            console.log('result after update socially - ',result);
                                            response.message = 'Success';
                                            response.success = true;
                                            response.error = false;
                                            generateToken(req.body, function(_token){
                                                response.token = _token.token;
                                                response.user = _token.user;
                                                res.json(response);
                                                return;
                                            });
                                            
                                        }else{
                                            response.message = 'Some error occurred';
                                            res.json(response);
                                            return;
                                        }
                                    }
                                })
                            }else{
                                auth.socialSignUp(socialId, socialType, req.body, function(err, result){
                                    if(err){
                                        response.errors = err;
                                        res.json(response);
                                    }else{
                                        console.log('socially user registered');
                                        response.message = 'Success';
                                        response.success = true;
                                        response.error = false;
                                        generateToken(req.body, function(_token){
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
    socialUserUpdate: function(socialId, socialType, reqParams, userData, done){
        var updateData = {};
        if(reqParams['user_email'] && !userData['user_email']){
            updateData['user_email'] = reqParams['user_email'];
        }
        if(reqParams['user_first_name'] && !userData['user_first_name']){
            updateData['user_first_name'] = reqParams['user_first_name'];
        }
        if(reqParams['user_last_name'] && !userData['user_last_name']){
            updateData['user_last_name'] = reqParams['user_last_name'];
        }
        if(reqParams['user_phone'] && !userData['user_phone']){
            updateData['user_phone'] = reqParams['user_phone'];
        }
        
        if(socialType == 'facebook')
            updateData['user_facebook_id'] = socialId;
        else
            updateData['user_google_id'] = socialId;

        console.log(updateData, Object.keys(updateData).length, userData.user_id);
        
        
        if(Object.keys(updateData).length){
            userModel.updateSocial(updateData, userData, function(err, rows){
                if(err){
                    return done(err);
                }
                else{
                    return done(null, rows);
                }
                
            })
        }else{
            return done('no parameters found for user to be updated');
        }
    },
    socialSignUp: function(socialId, socialType, userParams, done){
        delete userParams.socialId;
        delete userParams.socialType;
        userModel.socialSignUp(socialId, socialType, userParams, function(err, result){
            if(err)
                done(err);
            else
                done(null, result);
        })
    },
    socialValidate:function(socialId, socialType, done){
        userModel.socialLoginCheck(socialId, socialType, function(err, rows){
            if(err){
                done(err, []);
            }else{
                done(null,rows);
            }
        });
    },
    validate: function(username, password, done){
        //username is email here
        var invalid = validate.single(username, {presence:true, email:true});
        if(!invalid){
            userModel.loginCheck(username, password, function(err, rows){
                if(err){
                    done(err, []);
                }else{
                    done(null,rows);
                }
            });
        }else{
            done('Invalid Email address');
        }
    },
    validateUser: function(username, done){
        //var invalid = validate.single(username, {presence:true, email:true});
        //if(!invalid)
        {
            userModel.validateUser(username, username, function(err, rows){
                if(err){
                    done(err, []);
                }else{
                    done(null,rows);
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
    function generateToken(user, done){
        var token = jwt.sign(user, config.secret,{
            expiresIn: config.loginExpirySeconds // expires in 24 hours
        });
        return done({
            token: token,
            user: user,
            expires: config.loginExpirySeconds
        });
    }
module.exports = auth;