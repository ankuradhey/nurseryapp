var jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
var response = {error:true,success:false,message:'Oops! Some error occurred',code:400}
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
    generateToken: function(user){
        
    }
}