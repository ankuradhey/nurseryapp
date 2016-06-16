var favorite = require('../models/favorite.js');
var response = require('../middlewares/jsonResponse.js');

module.exports = {
    addFavorite: function (req, res) {
        favorite.getFavorite(req.body.fav_parent_id, function (err, rows) {
            if (err) {
                console.log(err);
                response.setError(501,null,err);
                res.send(response);
            } else if(rows && rows.length){
                response.setError(502, 'Duplicate record found error', err);
                res.send(response);
            }else{
                favorite.addFavorite(req.body, function (err, rows) {
                    response = new responseClass;
                    if (err) {
                        console.log(err);
                        response.setError(501,null,err);
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
                response.setError(501,null,err);
                res.send(response);
            } else {
                response.setSuccess('Success',rows);
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