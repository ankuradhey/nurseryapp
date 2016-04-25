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
        var invalid = validate(userParams, userSchema);
        console.log(invalid);
        if (invalid && Object.keys(invalid).length) {
            var i = 0;
            async.each(invalid, function(result, callback){
               response.errors[i] = result;
               i++;
            }, function(err){
                response.message = err;
            });
            return response;
        } else {
            user.create(userParams, function(err, userId) {
                
                if (err) {
                    response.message = err;
                }
                res.send(JSON.stringify({'success': true}));
            })

        }
    });
}