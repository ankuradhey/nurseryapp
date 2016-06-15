var db = require('../db.js');

exports.addEnquiry = function(enquiryParams, done){
        var query = 'insert into school_enquiry set'
        var arr = [];
        var _count = 0;
        for (var i in enquiryParams) {
            if (_count + 1 == Object.keys(enquiryParams).length)
                query += '  ' + i + ' = ' + '"' + enquiryParams[i] + '"';
            else
                query += ' ' + i + ' = ' + '"' + enquiryParams[i] + '",';
            _count++;
        }
        
        db.get().query(query, function(err, rows) {
            if (err)
                return done(err)
            return done(null, rows);
        });
    }