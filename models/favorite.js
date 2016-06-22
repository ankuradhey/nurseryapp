var db = require('../db.js');

exports.addFavorite = function(favParams, done){
        var query = 'insert into favorite_list set'
        var arr = [];
        var _count = 0;
        for (var i in favParams) {
            if (_count + 1 == Object.keys(favParams).length)
                query += '  ' + i + ' = ' + '"' + favParams[i] + '"';
            else
                query += ' ' + i + ' = ' + '"' + favParams[i] + '",';
            _count++;
        }
        
        db.get().query(query, function(err, rows) {
            if (err)
                return done(err)
            return done(null, rows);
        });
    }
    
exports.removeFavorite = function(favParams, done){
    db.get().query('delete from favorite_list where fav_parent_id = ? and fav_school_id = ? ',[favParams.fav_parent_id, favParams.fav_school_id], function(err, rows) {
            if (err)
                return done(err)
            return done(null, rows);
        });
}

exports.getFavorite = function(userId, schoolId,done){
    console.log('select fav_id, fav_parent_id, fav_school_id, s.school_name, s.school_affiliation_code, s.school_phone, s.school_address from favorite_list f\n\
                    join school s on s.school_id = f.fav_school_id and s.school_status = "1" \n\
                    where f.fav_status = "1" and fav_parent_id = ? and fav_school_id = ? ');
    
    
    db.get().query('select fav_id, fav_parent_id, fav_school_id, s.school_name, s.school_affiliation_code, s.school_phone, s.school_address from favorite_list f\n\
                    join school s on s.school_id = f.fav_school_id and s.school_status = "1" \n\
                    where f.fav_status = "1" and fav_parent_id = ? and fav_school_id = ? ',[userId, schoolId], function(err, rows) {
            console.log(err);
            if (err)
                return done(err)
            return done(null, rows);
        })
}