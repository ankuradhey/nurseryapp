var express = require('express'),
    app = express(),
    mysql = require("mysql"),
    bodyParser = require('body-parser'),
    db = require('./db'),
    fs = require('fs')
    async = require("async");
    
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

//dynamically include routes (Controllers)
fs.readdirSync('./controllers').forEach(function(file){
    if(file.substr(-3) == '.js'){
        route = require('./controllers/'+file);
        route.controller(app);
    }
});



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