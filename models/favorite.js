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
    
    
exports.getFavorite = function(userId, done){
    db.get().query('select fav_id, fav_parent_id, fav_school_id, s.school_name, s.school_affiliation_code, s.school_phone, s.school_address   from favorite_list f\n\
                    join school s on s.school_id = f.fav_school_id and s.school_status = "1" \n\
                    where f.favorite_status = "1" and fav_parent_id = ? ',userId, function(err, rows) {
            console.log(err);
            if (err)
                return done(err)
            return done(null, rows);
        })
}