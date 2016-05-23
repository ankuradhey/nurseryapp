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
    getCountryByName: function(name, done){
        db.get().query('SELECT * FROM country where country_name = ? and country_status != "2" ',name, function (err, rows) {
            if (err) return done(err)
            done(null, rows)
        })
    },
    getCountry: function(id, done){
        db.get().query('SELECT * FROM country where country_id = ? and country_status = "1" ',id, function (err, rows) {
            if (err) return done(err)
            done(null, rows)
        })
    },
    addCountry: function(reqParams, done){
        db.get().query('INSERT into country set country_name = ? , country_status = "1" ',[reqParams.country_name], function (err, rows) {
            if (err) return done(err)
            done(null, rows);
        });
    },
    updateCountry: function(reqParams,countryId, done){
        db.get().query('update country set country_name = ? where country_id = ? ',[reqParams.country_name, countryId], function (err, rows) {
            if (err) return done(err)
            done(null, rows);
        });
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
    updateState: function(reqParams, stateId, done){
        db.get().query('update state set state_name = ?, state_country_id = ? where state_id = ?  ',[reqParams.state_name, reqParams.state_country_id, stateId] , function (err, rows) {
            if (err) 
                return done(err)
            return done(null, rows)
        })
    },
    updateCity: function(reqParams, cityId, done){
        db.get().query('update city set city_name = ?, city_state_id = ? where city_id = ?  ',[reqParams.state_name, reqParams.state_country_id, cityId] , function (err, rows) {
            if (err) 
                return done(err)
            return done(null, rows)
        })
    },
    addState: function(reqParams, done){
    console.log('insert query');
        db.get().query('insert into state set state_name = ?, state_country_id = ?, state_status = "1"  ',[reqParams.state_name, reqParams.state_country_id] , function (err, rows) {
            if (err) 
                return done(err)
            return done(null, rows)
        })
    },
    addCity: function(reqParams, done){
        db.get().query('insert into city set city_name = ?, city_state_id = ?, city_status = "1"  ',[reqParams.city_name, reqParams.city_state_id] , function (err, rows) {
            if (err) 
                return done(err)
            return done(null, rows)
        })
    },
    getState: function(stateId, done){
        console.log('get state query run');
        db.get().query('SELECT * FROM state s \n\
                        join country c on c.country_id = s.state_country_id and c.country_status = "1" \n\
                        where state_id = ? and state_status = "1"  ', stateId ,function (err, rows) {
            if (err) 
                return done(err)
            return done(null, rows)
        })
    },
    getStateByName: function(reqParams, done){
        console.log('get state query run');
        db.get().query('SELECT * FROM state s \n\
                        where state_name = ? and state_status != "2"  ', reqParams.state_name ,function (err, rows) {
            if (err) 
                return done(err)
            return done(null, rows)
        })
    },
    getCityByName: function(reqParams, done, cityId){
        cityId = typeof cityId !== 'undefined'? cityId:0;
        db.get().query('SELECT * FROM city c \n\
                        where city_name = ? and city_status != "2" and city_id != ? ', [reqParams.city_name, cityId] ,function (err, rows) {
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
    
    getCity: function(cityId, done){
        db.get().query('SELECT * FROM city c join state s on s.state_id = c.city_state_id where city_id = ?  ', cityId,function (err, rows) {
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