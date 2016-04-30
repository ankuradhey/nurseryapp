var jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
var response = {error:true,success:false,message:'Oops! Some error occurred',code:400}
var userModel = require("../models/user.js");
validate = require('validate.js');

var auth = {
    login: function(req, res){
        var username = req.body.user_email || '';
        var password = req.body.user_password || '';
        
        if(username || password){
            res.status(401);
            response.code = 401;
            response.message = 'Invalid Credentials';
            res.json(JSON.stringify(response));
        }
        
        //use query to validate
        var dbUserObj = auth.validate(username, password);
        
        if(!dbUserObj){
            res.status(401);
            response.message = 'Invalid Credentials';
            res.json(JSON.stringify(response));
            return;
        }else{
            this.generateToken(req.body.userParams);
        }
    },
    validate: function(username, password){
        //username is email here
        var invalid = validate.single(username, {presence:true, email:true});
        if(!invalid){
            userModel.loginCheck(username, password, function(err, rows){
                if(err){
                    res.status(500);
                    response.message = 'Oops! Some error occurred';
                    response.code = 500;
                    response.errors = err;
                    console.log(err);
                    res.json(JSON.stringify(response));
                }else{
                    if(rows.length){
                        return true;
                    }else{
                        return false;
                    }
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
    validateUser: function(username){
        var invalid = validate.single(username, {presence:true, email:true});
        if(!invalid){
            userModel.validateUser(username, username, function(err, rows){
                if(err){
                    res.status(500);
                    response.message = 'Oops! Some error occurred';
                    response.code = 500;
                    response.errors = err;
                    console.log(err);
                    res.json(JSON.stringify(response));
                }else{
                    if(rows.length){
                        return true;
                    }else{
                        return false;
                    }
                }
                    
            });
        }else{
            return false;
        }
    }
};

    //private method
    function genToken(user){
        var token = jwt.sign(user, app.get('superSecret'),{
            expiresInMinutes: app.get('loginExpiryMinutes') // expires in 24 hours
        });
        return {
            token: token,
            user: user,
            expires: app.get('loginExpiryMinues')
        }
    }
module.exports = auth;