var searchModel = require('../models/search.js'),
responseClass = function() {
    return {
        error: true,
        success: false,
        code: 501,
        message: 'Oops! Some error occurred',
        errors: []
    }
},
validate = require('validate.js'),
config = require('../config') //get our config file
;

module.exports = {
    getSchools: function(req,res){
        searchModel.getSchools(req.body, function(err, rows){
            
        })
    }
}

