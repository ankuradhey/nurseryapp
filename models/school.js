var db = require('../db.js')
    ;
    
    
var school =    {
                    school_id:1,
                    school_name:'ABPS',
                    school_phone:'1234567890',
                    school_img:'',
                    school_status:1,
                    school_medium:'hindi',
                    school_board:2
                }
                
var schools = {
    
    getAll: function(done){
        db.get().query('SELECT * FROM schools', function (err, rows) {
            if (err) 
                return done(err)
            done(null, rows);
        })
    },
    
    getOne: function(id, done){
        db.get().query('SELECT * FROM schools where school_id = ?',id, function (err, rows) {
            if (err) return done(err)
            done(null, rows)
        })
    }
    
} ;               

module.exports = schools;