var db = require('../db.js'),
        md5 = require('md5')
    ;
/*
 * Eg user json format
 */
var user = {
                user_type:'parent',
                user_email:'ankuradhey@gmail.com',
                user_password:'password',
                user_first_name:'Ankit',
                user_last_name:'Sharma',
                user_phone:9990994856,
                user_img:'no-image.jpeg',
                user_status:'1'
            };



exports.create = function(userParams, done) {
//  var values = [userId, text, new Date().toISOString()]
  db.get().query('INSERT INTO user (user_type, user_email, user_password, user_first_name, user_last_name, user_phone, user_last_login) VALUES(?, ?, ?, ?, ?, ?, ?)', 
  [userParams.user_type, userParams.user_email, md5(userParams.user_password), userParams.user_first_name, userParams.user_last_name, userParams.user_phone, moment().format('YYYY-MM-DD HH:mm:ss')], function(err, result) {
    if (err) 
        return done(err);
    done(null, result.insertId)
  })
}

exports.socialSignUp = function(socialId, socialType,userParams, done){
    var query = 'insert into user set'
    var arr = [];
    var _count = 0;
    for(var i in userParams){
        if(_count+1 == Object.keys(userParams).length)
            query += '  '+i+' = '+'"'+userParams[i]+'"';
        else
            query += ' '+i+' = '+'"'+userParams[i]+'",';
        _count++;
    }
    
    if(socialType == 'facebook')
        query += ' user_facebook_id =  '+'"'+socialId+'"';
    else
        query += ' user_google_id =  '+'"'+socialId+'"';
    
    console.log(query);
    
    db.get().query(query, function (err, rows) {
        if (err) 
            return done(err)
        return done(null, rows);
    });
      
}

exports.updateSocial = function(userParams, user, done){
  var query = 'update user set ';
  var _count = 0;
  for(var i in userParams){
      if(_count+1 == Object.keys(userParams).length)
          query += ' '+i+' = '+'"'+userParams[i]+'"';
      else
          query += ' '+i+' = '+'"'+userParams[i]+'",';
      _count++;
  }
  
  if(_count){
      query += ' where user_id =  '+user.user_id;
    
    console.log(query);
        
      db.get().query(query, function (err, rows) {
        if (err) 
            return done(err)
        return done(null, rows);
      })
  }
  else
      return done('no query found');
}



exports.getAll = function(done) {
  db.get().query('SELECT * FROM comments', function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}

exports.validateUser = function(userEmail, phone, done){
    db.get().query('SELECT * FROM user WHERE user_email = ? or user_phone = ? ', [userEmail,phone], function (err, rows) {
        if (err)
            return done(err);
        
        done(null, rows)
    });
}

exports.socialLoginCheck = function(socialId, socialType, done){
    if(socialType == 'facebook'){
        db.get().query('SELECT * FROM user where user_facebook_id = ? ',socialId, function(err, rows){
            if(err)
                return done(err);
            
            done(null,rows);
        });
    }else{
        db.get().query('SELECT * FROM user where user_google_id = ? ',socialId, function(err, rows){
            if(err)
                return done(err);
            
            done(null,rows);
        });
    }
}

exports.loginCheck = function(userEmail, userPassword, done){
    db.get().query('SELECT user_id, user_email, concat(user_first_name, " ", user_last_name) as user_full_name, user_type, user_phone, \n\
                    user_first_name as first_name, user_last_name as last_name\n\
                    FROM user where user_email = ? and user_password = ? and user_status = "1" \n\
                     union \n\
                    SELECT school_id as user_id, school_email as user_email, school_name as user_full_name, "school" as user_type, school_phone as user_phone, \n\
                    school_name as first_name, school_name as last_name\n\
                    FROM school where school_email = ? and school_password = ? and school_status = "1" \n\
',[userEmail, md5(userPassword), userEmail, md5(userPassword)], function(err, rows){
        if(err)
            return done(err);
        
        done(null, rows);
    });
}

exports.getSchoolUser = function(userEmail, done){
    db.get().query('SELECT school_id as user_id, school_email as user_email, school_name as user_full_name, "school" as user_type, school_phone as user_phone, \n\
                    school_name as first_name, school_name as last_name\n\
                    FROM school where school_email = ? and school_status = "1" \n\
',[userEmail, userEmail], function(err, rows){
        if(err)
            return done(err);
        
        done(null, rows);
    });
}

exports.getAllByEmail = function(userEmail, done){
    db.get().query('SELECT * FROM user WHERE user_email = ?', userEmail, function (err, rows) {
        console.log(err);
        if (err) return done(err)
        done(null, rows)
    })
}

exports.getAllByPhone = function(userPhone, done){
    db.get().query('SELECT * FROM user WHERE user_phone = ?', userPhone, function (err, rows) {
        if (err) return done(err)
        done(null, rows)
    })
}

exports.getAllByUser = function(userId, done) {
  db.get().query('SELECT * FROM user WHERE user_id = ?', userId, function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}

exports.getAllParents = function(done){
  db.get().query('select user_id, user_email, user_first_name, user_last_name, user_phone, user_address, user_status from user where user_type= "parent" and user_status != "2" ', function(err, rows){
      if(err)
          return done(err);
      done(null, rows);
  })
}

exports.deleteParent = function(parentId, done){
  db.get().query('update user set user_status = "2" where user_id = "'+parentId+'" ', function(err, rows){
      if(err)
          return done(err);
      done(null, rows);
  })
}

exports.getPayments = function(userId, userType,done){
  db.get().query('select trnx_type, trnx_user_type, trnx_payment_method, trnx_amount, trnx_status, trnx_added_time from user_transaction \n\
                 where trnx_user_id = ? and trnx_user_type = ?',[userId, userType], function(err, rows){
                    if(err)
                        return done(err);
                    done(null, rows)
                 })
}