var jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
var validateUser = require('../routes/auth').validateUser;
var response = {'error':true,'success':false,'code':400,'message':'Oops! Some error occurred'},
        config = require('../config');
module.exports = function (req, res, next) {

    // When performing a cross domain request, you will recieve
    // a preflighted request first. This is to check if our the app
    // is safe. 

    // We skip the token outh for [OPTIONS] requests.
    //if(req.method == 'OPTIONS') next();
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
    console.log('validating request with token...',token, key);
    if (token && key) {
        try {
            
            var decoded = jwt.verify(token, config.secret, function(err, decoded){
                if(err){
                    res.status(400);
                    response.message = err.message;
                    res.json(JSON.stringify(response));
                    return;
                }
            });


            // Authorize the user to see if s/he can access our resources

            var dbUser = validateUser(key, function(err, rows){
                if(err){
                    res.status(500);
                    response.message = 'Oops! Some error occurred';
                    response.code = 500;
                    response.errors = err;
                    console.log(err);
                    res.json(JSON.stringify(response));
                }else{
                    if(rows.length)
                        next();
                    else{
                        // No user with this name exists, respond back with a 401
                        res.status(401);
                        response.message = 'Invalid user';
                        response.code = 401;
                        res.json(JSON.stringify(response));
                        return;
                    }
                }
            }); // The key would be the logged in user's username
                
                    //additional conditions
//                  if(){
//                    next(req,res); // To move to next middleware
//                } else {
//                    res.status(403);
//                    res.json({
//                        "status": 403,
//                        "message": "Not Authorized"
//                    });
//                    return;
//                }

        } catch (err) {
            res.status(500);
            response.code = 500;
            response.errors = err;
            res.json(response);
        }
    }else{
        res.status(401);
        response.code = 401;
        response.message = "Invalid Token or key"
        res.json(response);
    }

};