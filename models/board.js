var db = require('../db.js');


exports.getAll = function(done){
    db.get().query(
                'select board_id, board_name from board_master where board_status = "1"  ',
                function(err, rows){
                      if (err) 
                        return done(err);
                      done(null, rows);
                });
}