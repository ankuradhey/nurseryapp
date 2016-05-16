var express = require('express'),
    app = express(),
    mysql = require("mysql"),
    bodyParser = require('body-parser'),
    config = require('./config'), //get our config file
    db = require('./db'),
    fs = require('fs')
    async = require("async")
    moment = require("moment"),
    multer = require("multer"),
    jwt = require("jsonwebtoken") // used to create, sign, and verify tokens
    ;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));


 var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            var updatedFileName = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
            req.updatedFileName = updatedFileName;
            console.log('filename uploaded - ',file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
            cb(null, updatedFileName);
        }
    });
    

var upload = multer({ //multer settings
                    storage: storage
                }).single('file');


app.set('superSecret', config.secret);
app.set('loginExpiryMinutes', config.loginExpiryMinutes);


app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

/*
 * File upload
 */
app.post('/upload',function(req, res){
    upload(req, res, function(err){
        if(err){
            res.json({error:true,success:false,message:'Some error occurred',errors:err,code:500});
            return;
        }
            res.json({error:false,success:true,message:'Success',filename:req.updatedFileName})
    })
})

// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you 
// are sure that authentication is not needed
app.all('/api/v1/*', [require('./middlewares/validateRequest')]);

app.use('/',require('./routes'));

app.use(function(req, res, next){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
 

//dynamically include routes (Controllers)
//fs.readdirSync('./controllers').forEach(function(file){
//    if(file.substr(-3) == '.js'){
//        route = require('./controllers/'+file);
//        route.controller(app);
//    }
//});

// Connect to MySQL on start
db.connect(db.MODE_TEST, function(err) {
  if (err) {
    console.log('Unable to connect to MySQL.')
    process.exit(1)
  } else {
    app.listen(3000, function() {
      console.log('Listening on port 3000...')
    })
  }
})

    
var responseArr = {error:true,success:false, message:'Some error occurred'};


var server = app.listen(7071, function(){
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port);
  
})