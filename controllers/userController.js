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
            presence: true
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
        res.setHeader('Content-Type', 'application/json');
//        var invalid = validate(userParams, userSchema);
        
        validate.async(userParams, userSchema).then(function(attributes){// success
            console.log(attributes)
        } , function(error){ //error
            response.errors = error;
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