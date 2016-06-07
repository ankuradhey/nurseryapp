var db = require('../db.js')
md5 = require('md5')
        ;


var school = {
    school_id: 1,
    school_name: 'ABPS',
    school_phone: '1234567890',
    school_img: '',
    school_status: 1,
    school_medium: 'hindi',
    school_board: 2
}

var schools = {
    getAll: function(done) {
        var query = 'SELECT s.school_id, s.school_name, board.board_name, medium.medium_name, s.school_affiliation_code, s.school_address, s.school_img, s.school_desc as school_description, s.school_status FROM school s \n\
                     join school_medium medium on medium.medium_id = s.school_medium and medium.medium_status = "1"\n\
                    join board_master board on board.board_id = s.school_board and board.board_status = "1" \n\
                      where school_status != "2"';
        db.get().query(query, function(err, rows) {
            console.log(err);
            if (err)
                return done(err)
            return done(null, rows);
        })
    },
    getAllActive: function(done) {
        var query = 'SELECT s.school_id, s.school_name, board.board_name, s.school_medium, s.school_affiliation_code, s.school_address, s.school_img, s.school_desc as school_description FROM school s \n\
                     join board_master board on board.board_id = s.school_board and board.board_status = "1" where school_status = "1" ';
        db.get().query(query, function(err, rows) {
            console.log('select query');
            if (err)
                return done(err)
            return done(null, rows);
        })
    },
    getOne: function(id, done) {
        db.get().query('SELECT s.*, board.board_id, board.board_name, c.country_id, c.country_name, st.state_id, st.state_name, city.city_id, city.city_name,  \n\
                        stype.school_type_id, stype.school_type_name, area.area_id, area.area_name, zone.zone_id, zone.zone_name, \n\
                        medium.medium_id, medium.medium_name \n\
                        FROM school s\n\
                        left join school_medium medium on medium.medium_id = s.school_medium and medium.medium_status = "1" \n\
                        join board_master board on board.board_id = s.school_board and board.board_status = "1"\n\
                        left join school_type stype on stype.school_type_id = s.school_type and stype.school_type_status = "1"\n\
                        left join country c on c.country_id = s.school_country and c.country_status = "1"\n\
                        left join state st on st.state_id = s.school_state and st.state_status = "1"\n\
                        left join city on city.city_id = s.school_city and city.city_status = "1"\n\
                        left join location_area area on area.area_id = s.school_area and area.area_status = "1"\n\
                        left join location_zone zone on zone.zone_id = s.school_zone and zone.zone_status = "1"\n\
                        where school_id = ?', id, function(err, rows) {
            if (err)
                return done(err)
            done(null, rows)
        })
    },
    create: function(schoolParams, done) {

        if (schoolParams.hasOwnProperty("school_password")) {
            schoolParams.school_password = md5(schoolParams.school_password);
        }

        var query = 'insert into school set'
        var arr = [];
        var _count = 0;
        for (var i in schoolParams) {
            if (_count + 1 == Object.keys(schoolParams).length)
                query += '  ' + i + ' = ' + '"' + schoolParams[i] + '"';
            else
                query += ' ' + i + ' = ' + '"' + schoolParams[i] + '",';
            _count++;
        }

        db.get().query(query, function(err, rows) {
            if (err)
                return done(err)
            return done(null, rows);
        });
    },
    deleteSchool: function(schoolId, done) {
        db.get().query('update school set school_status = "2" where school_id = "' + schoolId + '" ', function(err, rows) {
            if (err)
                return done(err);
            return done(null, rows);
        })
    },
    update: function(schoolId, schoolParams, done) {
        var query = 'update school set'
        var arr = [];
        var _count = 0;
        for (var i in schoolParams) {
            if (_count + 1 == Object.keys(schoolParams).length)
                query += '  ' + i + ' = ' + '"' + schoolParams[i] + '"';
            else
                query += ' ' + i + ' = ' + '"' + schoolParams[i] + '",';
            _count++;
        }

        query += ' where school_id = ' + schoolId;

        db.get().query(query, function(err, rows) {
            if (err)
                return done(err)
            return done(null, rows);
        });
    },
    getMediums: function(done) {
        db.get().query('select * from school_medium where medium_status != "2"', function(err, rows) {
            console.log(err);
            if (err)
                return done(err);
            return done(null, rows);
        })
    },
    getMedium: function(mediumId, done) {
        db.get().query('select * from school_medium where medium_status != "2" and medium_id = ?', mediumId, function(err, rows) {
            console.log(err);
            if (err)
                return done(err);
            return done(null, rows);
        })
    },
    getMediumByName: function(mediumName, mediumId, done) {
        mediumId = typeof mediumId != 'undefined' ? mediumId : 0;
        console.log([mediumName.toLowerCase(), mediumId]);
        db.get().query('select * from school_medium where medium_status != 2 and medium_name = ? and medium_id != ? ', [mediumName.toLowerCase(), mediumId], function(err, rows) {
            console.log(err);
            if (err)
                return done(err);
            return done(null, rows);
        })
    },
    addMedium: function(mediumParams, done) {
        db.get().query('insert into school_medium set medium_name = ?, medium_status = "1" ', [mediumParams.medium_name, mediumParams.medium_status], function(err, rows) {
            if (err)
                return done(err)
            return done(null, rows);
        });
    },
    updateMediumStatus: function(mediumStatus, mediumId, done) {
        db.get().query('update school_medium set medium_status = ? where medium_id = ? ', [mediumStatus, mediumId], function(err, rows) {
            if (err)
                return done(err)
            return done(null, rows);
        });
    },
    updateMedium: function(mediumParams, mediumId, done) {

        var query = 'update school_medium set'
        var arr = [];
        var _count = 0;
        for (var i in mediumParams) {
            if (_count + 1 == Object.keys(mediumParams).length)
                query += '  ' + i + ' = ' + '"' + mediumParams[i] + '"';
            else
                query += ' ' + i + ' = ' + '"' + mediumParams[i] + '",';
            _count++;
        }

        query += ' where medium_id = ' + mediumId;

        db.get().query(query, function(err, rows) {
            if (err)
                return done(err)
            return done(null, rows);
        });

    },
    deleteMedium: function(mediumId, done) {
        console.log(mediumId)
        db.get().query('update school_medium set medium_status = "2" where medium_id = ? ', mediumId, function(err, rows) {
            console.log(err, rows);
            if (err)
                return done(err)
            return done(null, rows);
        });
    },
    getSchoolTypes: function(done) {

        db.get().query('select school_type_id, \n\
                        concat(\n\
                                school_type_name, \n\
                                " [", \n\
                                substring(school_type_classes, 1, locate(",",school_type_classes,1)-1),\n\
                                "->",\n\
                                SUBSTRING_INDEX(school_type_classes,",",-1),\n\
                                "]"\n\
                            ) as school_type_name, school_type_classes, school_type_status from school_type where school_type_status != "2"  ', function(err, rows) {
            console.log(err);
            if (err)
                return done(err);
            return done(null, rows);
        })
    },
    getSchoolType: function(schoolTypeId, done) {
        db.get().query('select * from school_type where school_type_status != "2" and school_type_id = ?  ', schoolTypeId, function(err, rows) {
            if (err)
                return done(err);
            return done(null, rows);
        })
    },
    getSchoolAvailability: function(schoolParams, schoolId, done) {
        schoolId = typeof schoolId != 'undefined' ? schoolId : 0;
        console.log('getSchoolAvailability - ', [schoolId, schoolParams.school_email, schoolParams.school_affiliation_code, schoolParams.school_phone]);
        db.get().query('select school_email, school_affiliation_code, school_phone  from school \n\
                        where school_status != "2" and school_id != ? and (school_email = ? or school_affiliation_code = ? or school_phone = ?) ',
                [schoolId, schoolParams.school_email, schoolParams.school_affiliation_code, schoolParams.school_phone], function(err, rows) {
            if (err)
                return done(err);
            return done(null, rows);
        })
    },
    getSchoolByAffiliate: function(schoolAffiliateCode, schoolTypeId, done) {
        schoolTypeId = typeof schoolTypeId != 'undefined' ? schoolTypeId : 0;
//        console.log('select * from school_type where school_type_status != "2" and school_type_name = ? and school_type_id != ? ', [schoolTypeName, schoolTypeId]);
        db.get().query('select * from school_type where school_type_status != "2" and school_type_name = ? and school_type_id != ? ', [schoolTypeName, schoolTypeId], function(err, rows) {
            if (err)
                return done(err);
            return done(null, rows);
        })
    },
    getSchoolTypeByName: function(schoolTypeName, schoolTypeId, done) {
        schoolTypeId = typeof schoolTypeId != 'undefined' ? schoolTypeId : 0;
//        console.log('select * from school_type where school_type_status != "2" and school_type_name = ? and school_type_id != ? ', [schoolTypeName, schoolTypeId]);
        db.get().query('select * from school_type where school_type_status != "2" and school_type_name = ? and school_type_id != ? ', [schoolTypeName, schoolTypeId], function(err, rows) {
            if (err)
                return done(err);
            return done(null, rows);
        })
    },
    addSchoolType: function(schoolTypeParams, done) {
        schoolTypeParams.school_type_classes = schoolTypeParams.school_type_classes.join(',');
        db.get().query('insert into school_type set school_type_name = ?, school_type_classes = ?, school_type_status = "1"', [schoolTypeParams.school_type_name, schoolTypeParams.school_type_classes], function(err, rows) {
            if (err)
                return done(err)
            return done(null, rows);
        });
    },
    updateSchoolType: function(schoolTypeParams, schoolTypeId, done) {
        schoolTypeParams.school_type_classes = schoolTypeParams.school_type_classes.join(',');
        console.log([schoolTypeParams.school_type_name, schoolTypeParams.school_type_classes, schoolTypeId]);
        db.get().query('update school_type set school_type_name = ?, school_type_classes = ? where school_type_id = ? ', [schoolTypeParams.school_type_name, schoolTypeParams.school_type_classes, schoolTypeId], function(err, rows) {
            if (err)
                return done(err)
            return done(null, rows);
        });
    },
    updateSchoolTypeStatus: function(status, schoolTypeId, done) {
        db.get().query('update school_type set school_type_status = ? where school_type_id = ? ', [status, schoolTypeId], function(err, rows) {
            if (err)
                return done(err)
            return done(null, rows);
        });
    },
};

module.exports = schools;