var db = require('../db.js');


exports.getReviews = function(done){
    db.get().query(
                'select r.review_id, r.review_desc, r.review_rating, r.review_status, r.review_title, concat(u.user_first_name, " ",u.user_last_name) as user_full_name, \n\
                 s.school_name from reviews r \n\
                 join user u on u.user_id = r.review_user_id and u.user_status != "2" and u.user_type = "parent" \n\
                 join school s on r.review_school_id = s.school_id and s.school_status != "2"\n\
                 where review_status != "2"  ',
                function(err, rows){
                      if (err) 
                        return done(err);
                      done(null, rows);
                });
}

exports.getReview = function(reviewId, done){
    db.get().query(
                'select r.review_id, r.review_desc, r.review_rating, r.review_status, r.review_title, u.user_email, u.user_id, s.school_id,\n\
                 s.school_name from reviews r \n\
                 join user u on u.user_id = r.review_user_id and u.user_status != "2" and u.user_type = "parent" \n\
                 join school s on r.review_school_id = s.school_id and s.school_status != "2"\n\
                 where review_id = ?  ',reviewId,
                function(err, rows){
                      if (err) 
                        return done(err);
                      done(null, rows);
                });
}

exports.addReview = function(reviewParams, done){
        var query = 'insert into reviews set'
        var arr = [];
        var _count = 0;
        for (var i in reviewParams) {
            if (_count + 1 == Object.keys(reviewParams).length)
                query += '  ' + i + ' = ' + '"' + reviewParams[i] + '"';
            else
                query += ' ' + i + ' = ' + '"' + reviewParams[i] + '",';
            _count++;
        }
        
        console.log(query);
        
        db.get().query(query, function(err, rows) {
            if (err)
                return done(err)
            return done(null, rows);
        });
    }

exports.update = function(reviewId, reviewParams, done){
        var query = 'update reviews set'
        var arr = [];
        var _count = 0;
        for (var i in reviewParams) {
            if (_count + 1 == Object.keys(reviewParams).length)
                query += '  ' + i + ' = ' + '"' + reviewParams[i] + '"';
            else
                query += ' ' + i + ' = ' + '"' + reviewParams[i] + '",';
            _count++;
        }
        
        query += ' where review_id = '+reviewId;
        console.log(query);
        
        db.get().query(query, function(err, rows) {
            if (err)
                return done(err)
            return done(null, rows);
        });
    };
    
    
    exports.deleteReview = function(reviewId, done){
    db.get().query(
                'update reviews set review_status = "2" where review_id = ? ',reviewId,
                function(err, rows){
                      if (err) 
                        return done(err);
                      done(null, rows);
                });
}

exports.getReviewsBySchool = function(schoolId, done){
    db.get().query(
                'select r.review_id, r.review_desc, r.review_rating, r.review_status, r.review_title, concat(u.user_first_name, " ",u.user_last_name) as user_full_name, \n\
                 s.school_name from reviews r \n\
                 join user u on u.user_id = r.review_user_id and u.user_status != "2" and u.user_type = "parent" \n\
                 join school s on r.review_school_id = s.school_id and s.school_status != "2"\n\
                 where review_status != "2" and s.school_id = ?  ',schoolId,
                function(err, rows){
                      if (err) 
                        return done(err);
                      done(null, rows);
                });
}