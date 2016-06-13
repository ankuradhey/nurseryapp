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
       default: var err = new Error('validation path or schema not found');
                response.setError(501,'Validation Schema not found');
                res.json(response);
                break;
   }
    
}