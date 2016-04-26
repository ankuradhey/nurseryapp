var db = require('../db.js')
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
  db.get().query('INSERT INTO user (user_type, user_email, user_password, user_first_name, user_last_name, user_phone, user_last_login) VALUES(?, ?, ?, ?, ?, ?, ?)', userParams, function(err, result) {
    if (err) 
        return done(err);
    done(null, result.insertId)
  })
}

exports.getAll = function(done) {
  db.get().query('SELECT * FROM comments', function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}

exports.validateUser = function(userEmail, phone, done){
    db.get().query('SELECT * FROM user WHERE user_email = ? or user_phone = ? ', [userEmail,phone], function (err, rows) {
        console.log('errror: '+err);
        if (err) 
            return done(err);
        
        done(null, rows)
    })
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
  db.get().query('SELECT * FROM comments WHERE user_id = ?', userId, function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}