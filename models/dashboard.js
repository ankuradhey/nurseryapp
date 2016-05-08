var db = require('../db.js');


exports.getCount = function(done){
    db.get().query(
                'select (select count(*) from school) as school_count, (select count(*) from user where user_type = "parent") as parent_count, 0 as payment_count, 0 as support_count  ',
                function(err, rows){
                      if (err) 
                        return done(err);
                      done(null, rows);
                });
}