var mysql = require('mysql')
  , async = require('async')

var PRODUCTION_DB = false
  , TEST_DB = true;

exports.MODE_TEST = 'mode_test'
exports.MODE_PRODUCTION = 'mode_production'

TEST_CONFIG = {
   host:'localhost',
   user:'root',
   password:'',
   database: 'nursery_app'
}

PRODUCTION_CONFIG = {
   host:'ec2-54-201-182-195.us-west-2.compute.amazonaws.com',
   user:'root',
   password:'',
   database: 'nurseryapp'
}

/*
 * AWS 
 *  
 *  DB instance - kulfidb
 *  master username - kufliadmin
 *  master password - kulfibaba
 *  db - nurseryapp
 */


var state = {
  pool: null,
  mode: null,
}

exports.connect = function(mode, done) {
    state.pool = mysql.createPool(
                    mode==exports.MODE_PRODUCTION?PRODUCTION_CONFIG:TEST_CONFIG
                 )
    state.mode = mode
    done()
}

exports.get = function() {
  return state.pool
}

exports.fixtures = function(data) {
  var pool = state.pool
  if (!pool) return done(new Error('Missing database connection.'))

  var names = Object.keys(data.tables)
  async.each(names, function(name, cb) {
    async.each(data.tables[name], function(row, cb) {
      var keys = Object.keys(row)
        , values = keys.map(function(key) { return "'" + row[key] + "'" })

      pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', cb)
    }, cb)
  }, done)
}

exports.drop = function(tables, done) {
  var pool = state.pool
  if (!pool) return done(new Error('Missing database connection.'))

  async.each(tables, function(name, cb) {
    pool.query('DELETE * FROM ' + name, cb)
  }, done)
}