var db = require('../db.js')
    ;
    
var locations = {
    
    getCountries: function(done){
        var query = 'SELECT country_id, country_name, country_status from country where country_status != "2" ';
        db.get().query(query, function (err, rows) {
            if (err) 
                return done(err)
            return done(null, rows);
        })
    },
    getCountryByName: function(name, countryId, done){
        countryId = typeof countryId != 'undefined'?countryId:0;
        db.get().query('SELECT * FROM country where country_name = ? and country_id != ? and country_status != "2" ',[name, countryId], function (err, rows) {
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
    deleteCountry: function(countryId, done){
        console.log("update country set country_status = '2' where country_id = "+countryId+" ");
        
        db.get().query('update country set country_status = "2" where country_id = ? ',[countryId], function (err, rows) {
            if (err) return done(err)
            done(null, rows);
        });
    },
    updateCountryStatus: function(status,countryId, done){
        console.log(status, countryId)
        db.get().query('update country set country_status = ? where country_id = ? ',[status, countryId], function (err, rows) {
            console.log(rows)
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
        db.get().query('SELECT * FROM state where state_status != "2"  ', function (err, rows) {
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
    deleteState: function(stateId, done){
        db.get().query('update state set state_status = "2" where state_id = ?  ',[stateId] , function (err, rows) {
            if (err) 
                return done(err)
            return done(null, rows)
        })
    },
    updateStateStatus: function(status, stateId, done){
        db.get().query('update state set state_status = ? where state_id = ?  ',[status, stateId] , function (err, rows) {
            if (err) 
                return done(err)
            return done(null, rows)
        })
    },
    updateCity: function(reqParams, cityId, done){
        db.get().query('update city set city_name = ?, city_state_id = ? where city_id = ?  ',[reqParams.city_name, reqParams.city_state_id, cityId] , function (err, rows) {
            if (err) 
                return done(err)
            return done(null, rows)
        })
    },
    deleteCity: function(cityId, done){
        db.get().query('update city set city_status = "2" where city_id = ?  ',[cityId] , function (err, rows) {
            if (err) 
                return done(err)
            return done(null, rows)
        })
    },
    updateCityStatus: function(status, cityId, done){
        db.get().query('update city set city_status = ? where city_id = ?  ',[status, cityId] , function (err, rows) {
            if (err) 
                return done(err)
            return done(null, rows)
        })
    },
    updateArea: function(reqParams, areaId, done){
        db.get().query('update location_area set area_name = ?, city_id = ? where area_id = ?  ',[reqParams.area_name, reqParams.area_city_id, areaId] , function (err, rows) {
            if (err) 
                return done(err)
            return done(null, rows)
        })
    },
    updateAreaStatus: function(areaStatus, areaId, done){
        db.get().query('update location_area set area_status = ? where area_id = ?  ',[areaStatus, areaId] , function (err, rows) {
            if (err) 
                return done(err)
            return done(null, rows)
        })
    },
    deleteArea: function(areaId, done){
        db.get().query('update location_area set area_status = "2" where area_id = ?  ',[areaId] , function (err, rows) {
            if (err) 
                return done(err)
            return done(null, rows)
        })
    },
    updateZone: function(reqParams, zoneId, done){
        db.get().query('update location_zone set zone_name = ?, zone_area_id = ? where zone_id = ?  ',[reqParams.zone_name, reqParams.zone_area_id, zoneId] , function (err, rows) {
            if (err) 
                return done(err)
            return done(null, rows)
        })
    },
    updateZoneStatus: function(status, zoneId, done){
        db.get().query('update location_zone set zone_status = ? where zone_id = ?  ',[status, zoneId] , function (err, rows) {
            if (err) 
                return done(err)
            return done(null, rows)
        })
    },
    deleteZone: function(zoneId, done){
        db.get().query('update location_zone set zone_status = "2" where zone_id = ?  ',[zoneId] , function (err, rows) {
            if (err) 
                return done(err)
            return done(null, rows)
        })
    },
    addState: function(reqParams, done){
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
    addArea: function(reqParams, done){
        db.get().query('insert into location_area set area_name = ?, city_id = ?, area_status = "1"  ',[reqParams.area_name, reqParams.area_city_id] , function (err, rows) {
            if (err) 
                return done(err)
            return done(null, rows)
        })
    },
    addZone: function(reqParams, done){
        console.log('add zone by name queried');
        db.get().query('insert into location_zone set zone_name = ?, zone_area_id = ?, zone_status = "1"  ',[reqParams.zone_name, reqParams.zone_area_id] , function (err, rows) {
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
    getStateByName: function(reqParams, done, stateId){
        stateId = typeof stateId !== 'undefined'?stateId:0;
        console.log('get state query run');
        db.get().query('SELECT * FROM state s \n\
                        where state_name = ? and state_country_id = ? and state_status != "2" and state_id != ? ', [reqParams.state_name, reqParams.state_country_id, stateId ],function (err, rows) {
            if (err) 
                return done(err)
            return done(null, rows)
        })
    },
    getCityByName: function(reqParams, done, cityId){
        cityId = typeof cityId !== 'undefined'? cityId:0;
        db.get().query('SELECT * FROM city c \n\
                        where city_name = ? and city_state_id = ? and city_status != "2" and city_id != ? ', [reqParams.city_name, reqParams.city_state_id, cityId] ,function (err, rows) {
            if (err) 
                return done(err)
            return done(null, rows)
        })
    },
    
    getAreaByName: function(reqParams, done, areaId){
        areaId = typeof areaId !== 'undefined'? areaId:0;
        db.get().query('SELECT * FROM location_area c \n\
                        where area_name = ? and city_id = ? and area_status != "2" and area_id != ? ', [reqParams.area_name, reqParams.area_city_id, areaId] ,function (err, rows) {
            if (err) 
                return done(err)
            return done(null, rows)
        })
    },
    getZoneByName: function(reqParams, done, zoneId){
        console.log('get zone by name queried');
        zoneId = typeof zoneId !== 'undefined'? zoneId:0;
        db.get().query('SELECT * FROM location_zone z \n\
                        where zone_name = ? and zone_area_id = ? and zone_status != "2" and zone_id != ? ', [reqParams.zone_name, reqParams.zone_area_id,zoneId] ,function (err, rows) {
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
        db.get().query('SELECT * FROM city where city_status != "2"  ', function (err, rows) {
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
        db.get().query('SELECT area_id, area_name, area_status FROM location_area where area_status != "2"  ', function (err, rows) {
            if (err) 
                return done(err)
            return done(null, rows)
        })
    },
    getArea: function(areaId, done){
        db.get().query('SELECT area_id, area_name, city.city_id, city.city_name FROM location_area \n\
                        join city on city.city_id = location_area.city_id and city.city_status != "2"\n\
                        where area_id = ?  ',areaId, function (err, rows) {
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
        db.get().query('SELECT zone_id, zone_name, zone_status FROM location_zone where zone_status != "2"  ', function (err, rows) {
            if (err) 
                return done(err)
            return done(null, rows)
        })
    },
    
    getZone: function(zoneId, done){
        db.get().query('SELECT zone_id, zone_name, area.area_id, area.area_name FROM location_zone zone\n\
                        join location_area area on area.area_id = zone.zone_area_id and area.area_status != "2"\n\
                        where zone_id = ?  ',zoneId, function (err, rows) {
            if (err) 
                return done(err)
            return done(null, rows)
        })
    }
    
} ;               

module.exports = locations;