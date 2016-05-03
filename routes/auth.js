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
            res.status(401);
            response.code = 401;
            response.message = 'Invalid Credentials';
            res.json(JSON.stringify(response));
            return;
        }
        
        //use query to validate
        auth.validate(username, password, function(err, result){
            if(err){
                res.status(500);
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
                    var _token = generateToken(req.body);
                    response.token = _token.token;
                    response.user = _token.user;
                    res.json(response);
                    return;
                }else{
                    res.status(500);
                    response.message = 'Invalid Username or password';
                    response.code = 500;
                    response.errors = err;
                    console.log(err);
                    res.json(JSON.stringify(response));
                }
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
            res.status(402);
            response.code = 402;
            response.message = 'Invalid Email address';
            res.json(JSON.stringify(response));
            return;
        }
    },
    validateUser: function(username, done){
        var invalid = validate.single(username, {presence:true, email:true});
        console.log(invalid);
        if(!invalid){
            userModel.validateUser(username, username, function(err, rows){
                if(err){
                    done(err, []);
                }else{
                    done(null,rows);
                }
                    
            });
        }else{
            done(null, []);
//            return false;
        }
    }
};

    //private method
    function generateToken(user){
        var token = jwt.sign(user, config.secret,{
            expiresIn: config.loginExpirySeconds // expires in 24 hours
        });
        return {
            token: token,
            user: user,
            expires: config.loginExpirySeconds
        }
    }
module.exports = auth;