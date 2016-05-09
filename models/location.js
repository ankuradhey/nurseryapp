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
    },
    
    getCitiesByState: function(stateId, done){
        db.get().query('SELECT city_id, city_name FROM city where city_state_id = ? and city_status = "1"  ',stateId, function (err, rows) {
            if (err) 
                return done(err);
            return done(null, rows)
        })
    },
            
    getCities: function(done){
        db.get().query('SELECT * FROM city where city_status = "1"  ', function (err, rows) {
            if (err) 
                return done(err)
            return done(null, rows)
        })
    },
            
    getAreaByCity: function(cityId, done){
        db.get().query('SELECT area_id, area_name FROM location_area where city_id = ? and area_status = "1"  ',cityId, function (err, rows) {
            if (err) 
                return done(err);
            return done(null, rows)
        })
    },
            
    getAreas: function(done){
        db.get().query('SELECT area_id, area_name FROM location_area where area_status = "1"  ', function (err, rows) {
            if (err) 
                return done(err)
            return done(null, rows)
        })
    },
            
    getZonesByArea: function(areaId, done){
        db.get().query('SELECT zone_id, zone_name FROM location_zone where zone_area_id = ? and zone_status = "1"  ',areaId, function (err, rows) {
            if (err) 
                return done(err);
            return done(null, rows)
        })
    },
            
    getZones: function(done){
        db.get().query('SELECT zone_id, zone_name FROM location_zone where zone_status = "1"  ', function (err, rows) {
            if (err) 
                return done(err)
            return done(null, rows)
        })
    }
    
} ;               

module.exports = locations;