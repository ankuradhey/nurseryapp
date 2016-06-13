'use strict';


var response = function(){
    var error = true,
        success = false,
        code = 501,
        message = 'Oops! Some error occurred',
        errors = [],
        setError = function(code, message, errArr){
            this.error = true;
            this.success = false;
            this.errors = errArr || [];
            this.code = code || 501;
            this.message = message || 'Oops! Some error occurred';
        },
        setSuccess = function(message, data){
            this.error = false;
            this.success = true;
            this.code = 200;
            this.message = message || 'Success';
            if(data)
                this.data = data;
        };   
    
    return {
        error: error,
        success: success,
        code: code,
        message: message,
        errors: errors,
        setError: setError,
        setSuccess: setSuccess
    }
}

module.exports = response;