var express = require('express');
var app = express();
var mysql = require("mysql");
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
var conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:""
});

conn.connect(function(err){
    if(err){
        console.log('Error connecting to database');
        return;
    }
    console.log('Connection established');
});

conn.end(function(err){
    
});


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
    
var responseArr = {error:true,success:false, message:'Some error occurred'};


//dynamically include routes (Controllers)
fs.readdirSync('./controllers').forEach(function(){
    if(file.substr(-3) == '.js'){
        route = require('./controllers/'+file);
        route.controller(app);
    }
});



var server = app.listen(8081, function(){
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port);
  
})