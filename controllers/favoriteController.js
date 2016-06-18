var favorite = require('../models/favorite.js');
//var response = require('../middlewares/jsonResponse.js');
var responseClass = function() {
    return {
        error: true,
        success: false,
        code: 501,
        message: 'Oops! Some error occurred',
        errors: []
    }
};

module.exports = {
    addFavorite: function (req, res) {
        favorite.getFavorite(req.body.fav_parent_id, function (err, rows) {
            response = new responseClass();
            if (err) {
                console.log(err);
                //response.setError(501,null,err);
                response.errors = err;
                res.send(response);
            } else if(rows && rows.length){
                 
                if(req.body.fav_status == 0){ //remove favourite from favorite list
                    favorite.removeFavorite(req.body, function(err, rows){
                        if(err){
                            console.log(err);
                            response.errors = err;
                            res.send(response);
                        }else{
                            response.success = true;
                            response.error = false;
                            response.message = 'Success';
                            res.send(response);
                        }
                    });
                    
                }else{
                    response.message = 'Duplicate record found error';
                    response.code = 501;
                    res.send(response);
                }
            }else{
                favorite.addFavorite(req.body, function (err, rows) {
                    response = new responseClass;
                    if (err) {
                        console.log(err);
                        response.errors = err;
//                        response.setError(501,null,err);
                        res.send(response);
                    } else {
                        response.success = true;
                        response.error = false;
                        response.message = 'Success';
                        res.send(response);
                    }
                });
            }
        })

    },
    getFavorite: function (req, res) {
        favorite.getFavorite(req.params.parentId, function (err, rows) {
            response = new responseClass;
            if (err) {
                console.log(err);
                response.errors = err;
//                response.setError(501,null,err);
                res.send(response);
            } else {
                //response.setSuccess('Success',rows);
                response.success = true;
                response.error = false;
                response.message = 'Success';
                response.favorites = rows;
                res.send(response);
            }
        })
    },
    checkFavorite: function (req, res) { //to check whether favorite school already exists
    //TO DO - validation for checking whether school id exists and valid parent id and against parent same or not
//        favorite.
    }
}