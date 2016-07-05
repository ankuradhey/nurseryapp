var schema = require('./schema.js'),
    validate = require('validate.js'),
    response = require('./jsonResponse.js');
;
module.exports = function(req, res, next){

   switch(req.path){
       case '/register':    var $invalid = validate(req.body, schema.userSchema)
                            if($invalid){
                                response.setError();
                                res.json(response);
                            }else{
                                next();
                            }
                            break;
       case '/api/v1/review':   var $invalid = validate(req.body, schema.reviewSchema);
                                console.log('inside review schema validation');
                                if($invalid){
                                    response.setError();
                                    res.json(response);
                                }else{
                                    console.log('inside review schema validation');
                                    next();
                                }
                                break;
       case '/api/v1/enquiry':  var $invalid = validate(req.body, schema.enquirySchema);
                                if($invalid){
                                    response.setError();
                                    res.json(response);
                                }else{
                                    console.log('inside review schema validation');
                                    next();
                                }
                                break;
        case '/api/v1/favorite':    var $invalid = validate(req.body, schema.favSchema);
                                    if($invalid){
                                        response.setError(505, 'Validation error', $invalid);
                                        res.json(response);
                                    }else{
                                        console.log('inside fav schema validation');
                                        next();
                                    }
                                    break;
        case '/adminapi/v1/subscription':    var $invalid = validate(req.body, schema.subscriptionSchema);
                                    if($invalid){
                                        response.setError(505, 'Validation error', $invalid);
                                        res.json(response);
                                    }else{
                                        console.log('inside subscription schema validation');
                                        next();
                                    }
                                    break;
       default: var err = new Error('validation path or schema not found');
                response.setError(501,'Validation Schema not found');
                res.json(response);
                break;
   }
    
}