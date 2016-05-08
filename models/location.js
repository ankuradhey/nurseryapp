var db = require('../db.js')
    ;
    
var locations = {
    
    getCountries: function(done){
        var query = 'SELECT country_id, country_name from country where country_status = "1" ';
        db.get().query(query, function (err, rows) {
            if (err) 
                return done(err)
            return done(null, rows);
        })
    },
    
    getCountry: function(id, done){
        db.get().query('SELECT * FROM country where country_id = ? and country_status = "1" ',id, function (err, rows) {
            if (err) return done(err)
            done(null, rows)
        })
    }
    
} ;               

module.exports = locations;