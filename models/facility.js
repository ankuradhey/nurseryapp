var db = require('../db.js');

module.exports = {
    getFacilities: function (done) {
        db.get().query(
                'select facility_id, facility_name from facilities where facility_status != "2"  ',
                function (err, rows) {
                    if (err)
                        return done(err);
                    done(null, rows);
                });
    },
    getFacilityByName: function (facilityName, done) {
        console.log(facilityName);
        db.get().query(
                'select * from facilities where lower(facility_name) like ?  and facility_status != "2" ',
                (facilityName || '').trim().toLowerCase(),
                function (err, rows) {

                    console.log(err, rows);

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
    },
    deleteFacility: function(facilityId, done){
        db.get().query(
            'update facilities set facility_status = "2" where facility_id = ?',facilityId, function(err, rows){
                if (err)
                        return done(err);
                    done(null, rows);
            })
    }
}