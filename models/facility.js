var db = require('../db.js');

module.exports = {
    getFacilities: function (done) {
        db.get().query(
                'select facility_id, facility_name from facilities where facility_status = "1"  ',
                function (err, rows) {
                    if (err)
                        return done(err);
                    done(null, rows);
                });
    },
    getFacilityByName: function (facilityName, done) {
        db.get().query(
                'select * from facilities where lower(facility_name) like "%?%"  ',
                (facilityName || '').trim().toLowerCase(),
                function (err, rows) {
                    if (err)
                        return done(err);
                    done(null, rows);
                });
    },
    addFacility: function(facilityParams, done){
        db.get().query(
                'insert into facilities set facility_name = ?  ',
                facilityParams.facility_name,
                function (err, rows) {
                    if (err)
                        return done(err);
                    done(null, rows);
                });
    }
}