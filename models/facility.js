var db = require('../db.js');

module.exports = {
    getFacilities: function(done) {
        db.get().query(
                'select facility_id, facility_name from facilities where facility_status = "1"  ',
                function(err, rows) {
                    if (err)
                        return done(err);
                    done(null, rows);
                });
    }
}