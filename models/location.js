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
    },
            
    getStatesByCountry: function(countryId, done){
        db.get().query('SELECT * FROM state where state_country_id = ? and state_status = "1"  ',countryId, function (err, rows) {
            if (err) 
                return done(err);
            return done(null, rows)
        })
    },
            
    getStates: function(done){
        db.get().query('SELECT * FROM state where state_status = "1"  ', function (err, rows) {
            if (err) 
                return done(err)
            return done(null, rows)
        })
    }
    
} ;               

module.exports = locations;