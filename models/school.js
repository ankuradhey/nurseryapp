var db = require('../db.js')
        ;


var school = {
    school_id: 1,
    school_name: 'ABPS',
    school_phone: '1234567890',
    school_img: '',
    school_status: 1,
    school_medium: 'hindi',
    school_board: 2
}

var schools = {
    getAll: function(done) {
        var query = 'SELECT s.school_id, s.school_name, board.board_name, s.school_medium, s.school_affiliation_code, s.school_address, s.school_img, s.school_desc as school_description FROM school s \n\
                     join board_master board on board.board_id = s.school_board and board.board_status = "1" \n\
                      where school_status != "2"';
        db.get().query(query, function(err, rows) {
            console.log('select query');
            if (err)
                return done(err)
            return done(null, rows);
        })
    },
    getAllActive: function(done) {
        var query = 'SELECT s.school_id, s.school_name, board.board_name, s.school_medium, s.school_affiliation_code, s.school_address, s.school_img, s.school_desc as school_description FROM school s \n\
                     join board_master board on board.board_id = s.school_board and board.board_status = "1" where school_status = "1" ';
        db.get().query(query, function(err, rows) {
            console.log('select query');
            if (err)
                return done(err)
            return done(null, rows);
        })
    },
    getOne: function(id, done) {
        db.get().query('SELECT s.*, board.board_id, board.board_name, c.country_id, c.country_name, st.state_id, st.state_name, city.city_id, city.city_name, \n\
                        area.area_id, area.area_name, zone.zone_id, zone.zone_name FROM school s\n\
                        join board_master board on board.board_id = s.school_board and board.board_status = "1"\n\
                        join country c on c.country_id = s.school_country and c.country_status = "1"\n\
                        join state st on st.state_id = s.school_state and st.state_status = "1"\n\
                        join city on city.city_id = s.school_city and city.city_status = "1"\n\
                        join location_area area on area.area_id = s.school_area and area.area_status = "1"\n\
                        join location_zone zone on zone.zone_id = s.school_zone and zone.zone_status = "1"\n\
                        where school_id = ?', id, function(err, rows) {
            if (err)
                return done(err)
            done(null, rows)
        })
    },
    create: function(schoolParams, done) {
        var query = 'insert into school set'
        var arr = [];
        var _count = 0;
        for (var i in schoolParams) {
            if (_count + 1 == Object.keys(schoolParams).length)
                query += '  ' + i + ' = ' + '"' + schoolParams[i] + '"';
            else
                query += ' ' + i + ' = ' + '"' + schoolParams[i] + '",';
            _count++;
        }

        console.log(query);
        
        db.get().query(query, function(err, rows) {
            if (err)
                return done(err)
            return done(null, rows);
        });
    },
    deleteSchool:function(schoolId, done){
        db.get().query('update school set school_status = "2" where school_id = "'+schoolId+'" ', function(err, rows){
            if(err)
                return done(err);
            return done(null, rows);
        })
    },
    update: function(schoolId, schoolParams, done){
        var query = 'update school set'
        var arr = [];
        var _count = 0;
        for (var i in schoolParams) {
            if (_count + 1 == Object.keys(schoolParams).length)
                query += '  ' + i + ' = ' + '"' + schoolParams[i] + '"';
            else
                query += ' ' + i + ' = ' + '"' + schoolParams[i] + '",';
            _count++;
        }
        
        query += ' where school_id = '+schoolId;
        console.log(query);
        
        db.get().query(query, function(err, rows) {
            if (err)
                return done(err)
            return done(null, rows);
        });
    }

};

module.exports = schools;