
module.exports.controller = function(app){
    
    /*
     * Registration
     * ------------
     * Method: POST
     * 
     */
    app.post('/adduser',function(req, res){

        res.setHeader('Content-Type','application/json');
        res.send(JSON.stringify({'success':true}));
    });
}