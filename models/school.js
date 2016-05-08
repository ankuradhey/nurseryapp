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
        var query = 'SELECT s.school_name, board.board_name, s.school_medium, s.school_affiliation_code FROM school s \n\
                     join board_master board on board.board_id = s.school_board and board.board_status = "1" \n\
                     where school_status = "1" ';
        db.get().query(query, function (err, rows) {
            console.log('select query');
            if (err) 
                return done(err)
            return done(null, rows);
        })
    },
    
    getOne: function(id, done){
        db.get().query('SELECT * FROM school where school_id = ?',id, function (err, rows) {
            if (err) return done(err)
            done(null, rows)
        })
    }
    
} ;               

module.exports = schools;