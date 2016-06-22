var db = require('../db.js');


exports.getSchools = function(schoolParams, done) {
    console.log('SELECT s.school_id, s.school_name, board.board_name, s.school_medium, s.school_affiliation_code, s.school_address, s.school_img, \n\
                    s.school_desc as school_description, if(fav.fav_id,"1","0") as fav_status, sum(if(review_id,1,0)) as review_count ,avg(if(review_rating,review_rating,0)) as review_rating  FROM school s \n\
                     join board_master board on board.board_id = s.school_board and board.board_status = "1"  \n\
                     left join reviews r on r.review_school_id = s.school_id and r.review_status = "1" \n\
                     left join favorite_list fav on s.school_id = fav.fav_school_id and fav.fav_parent_id = ? \n\
                     where school_status = "1" and ( lower(s.school_name) like "%?%" and review_rating in (?) ) \n\
                     group by s.school_id  ',[(schoolParams.school_name || '' ).toLowerCase(), (schoolParams.review_rating || [0,1,2,3,4,5].toString())]);
    
    db.get().query(
            'SELECT s.school_id, s.school_name, board.board_name, s.school_medium, s.school_affiliation_code, s.school_address, s.school_img, \n\
                    s.school_desc as school_description, if(fav.fav_id,"1","0") as fav_status, sum(if(review_id,1,0)) as review_count ,avg(if(review_rating,review_rating,0)) as review_rating  FROM school s \n\
                     join board_master board on board.board_id = s.school_board and board.board_status = "1"  \n\
                     left join reviews r on r.review_school_id = s.school_id and r.review_status = "1" \n\
                     left join favorite_list fav on s.school_id = fav.fav_school_id and fav.fav_parent_id = ? \n\
                     where school_status = "1" and ( lower(s.school_name) like "%?%" and review_rating in (?) ) \n\
                     group by s.school_id  ',[(schoolParams.school_name || '' ).toLowerCase(), (schoolParams.review_rating || [0,1,2,3,4,5].toString())],
            function(err, rows) {
                if (err)
                    return done(err);
                done(null, rows);
            });
}
