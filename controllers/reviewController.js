/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var response = {'error': true, 'success': false, 'code': 501, 'message': 'Oops! some error occurred', errors: []};
var review = require('../models/review.js');

module.exports = {
    
    getReviews: function(req, res){
        review.getReviews(function(err, rows){
            if(err){
                console.log(err);
                res.errors = err;
                res.status = response.code;
                res.send(response);
            }else{
                response.reviews = rows;
                response.error = false;
                response.success = true;
                response.message = 'Success';
                res.send(response);
            }
        });
    },
    updateReview: function(req, res) {
        var reviewId = req.params.reviewId
        review.update(reviewId, req.body, function(err, rows) {
            if (err)
                response.errors = err;
            else {
                response = {};
                response.message = 'Review Updated Successfully';
                response.success = true;
                response.error = false;
            }
            res.send(response);
        })
    },
    deleteReview: function(req, res) {
        var reviewId = req.params.reviewId
        review.deleteReview(reviewId, function(err, rows) {
            if (err)
                response.errors = err;
            else {
                response = {};
                response.message = 'Review Deleted Successfully';
                response.success = true;
                response.error = false;
            }
            res.send(response);
        })
    }
};