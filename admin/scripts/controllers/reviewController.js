'use strict';

/**
 * @ngdoc function
 * @name sbAdminApp.controller:SchoolCtrl
 * @author AnkitS
 * @description
 * # SchoolCtrl
 * Controller of the sbAdminApp
 */

angular.module('sbAdminApp')
        .controller('reviewController', ['$scope', '$http', '$state', function($scope, $http, $state) {
        $scope.alert = {type: 'danger', show: false, message: 'Oops! Some error occurred.'};

        $scope.init = function() {
            $http({
                method: 'GET',
                url: baseUrl + '/adminapi/v1/reviews',
                headers: {'Content-Type': 'application/json'}
            }).success(function(data, status, headers, conf) {
                if (data.success) {
                    $scope.reviews = data.reviews;
                    $scope.alert.message = data.message;
                    $scope.alert.show = true;
                    $scope.alert.type = 'success';
                } else {
                    $scope.alert.message = 'Oops! Some error occurred';
                    $scope.alert.show = true;
                    $scope.alert.type = 'danger';
                }
            }).error(function(data, status, headers, conf) {
                $scope.alert.show = true;
                $scope.alert.type = 'danger';
            })
        }

        $scope.init();

        $scope.deleteReview = function(reviewId) {
            var s = confirm("Are you sure you want to delete this review?");
            if (!s)
                return;

            $http({
                method: 'DELETE',
                url: baseUrl + '/adminapi/v1/review/' + reviewId,
                headers: {'Content-Type': 'application/json'}
            }).success(function(data, status, headers, conf) {
                if (data.success) {
                    $scope.alert.message = data.message;
                    $scope.alert.show = true;
                    $scope.alert.type = 'success';
                    $state.reload();
                } else {
                    $scope.alert.message = data.message;
                    $scope.alert.show = true;
                    $scope.alert.type = 'danger';
                }
            }).error(function(data, status, headers, conf) {
                $scope.alert.show = true;
                $scope.alert.type = 'danger';
            })
        }

        $scope.updateStatus = function(status, reviewId) {
            var s = confirm("Are you sure you want to update this review?");
            if (!s)
                return;

            $http({
                method: 'PUT',
                url: baseUrl + '/adminapi/v1/review/' + reviewId,
                headers: {'Content-Type': 'application/json'},
                data: {review_status: status}
            }).success(function(data, status, headers, conf) {
                if (data.success) {
                    $scope.alert.message = 'School review status changed successfully';
                    $scope.alert.show = true;
                    $scope.alert.type = 'success';
                    $state.reload();
                } else {
                    $scope.alert.message = data.message;
                    $scope.alert.show = true;
                    $scope.alert.type = 'danger';
                }
            }).error(function(data, status, headers, conf) {
                $scope.alert.show = true;
                $scope.alert.type = 'danger';
            })

        }

    }])
        .controller('reviewAddController', ['$rootScope', '$scope', '$http', '$stateParams', '$state','schools','parents',
    function($rootScope, $scope, $http, $stateParams, $state, schools, parents) {
        $scope.alert = {type: 'danger', show: false, message: 'Oops! Some error occurred.'};
        $scope.review = {};
        $scope.reviewId = $stateParams.reviewId;
        $scope.schools = schools.data.schools;
        $scope.users = parents.data.parents;
        
        if ($scope.reviewId) {
            $http({
                method: 'GET',
                url: baseUrl + '/adminapi/v1/review/' + $scope.reviewId
            }).success(function(data, status, headers, conf) {
                if (data.review && Object.keys(data.review).length) {
                    var review = data.review;
                    $scope.review.school = {school_id:review.school_id,school_name:review.school_name};
                    $scope.review.user = {user_id:review.user_id,user_email:review.user_email};
                    $scope.review.title = review.review_title;
                    $scope.review.desc = review.review_desc;
                    $scope.review.rating = review.review_rating;
                } else {
                    $scope.alert.show = true;
                    $scope.alert.type = 'danger';
                }
            }).error(function(data, status, headers, conf) {
                $scope.alert.show = true;
                $scope.alert.type = 'danger';
            });
        }
        
        $scope.saveReview = function() {
            $scope.$broadcast('show-errors-check-validity');
            if ($scope.reviewForm.$invalid) {
                return;
            }

            var data = {
                review_school_id: $scope.review.school.school_id,
                review_user_id: $scope.review.user.user_id,
                review_title: $scope.review.title,
                review_desc: $scope.review.desc,
                review_rating: $scope.review.rating,
                review_status: '1',
            }

            if ($scope.reviewId) {
                var url = baseUrl + '/adminapi/v1/review/' + $scope.reviewId;
                var method = 'PUT';
            } else {
                var url = baseUrl + '/adminapi/v1/review';
                var method = 'POST';
            }

            $http({
                method: method,
                url: url,
                headers: {'Content-Type': 'application/json'},
                data: data
            }).success(function(data, status, headers, conf) {
                if (data.success) {
                    $scope.alert.message = data.message;
                    $scope.alert.show = true;
                    $scope.alert.type = 'success';
                    $scope.$broadcast('show-errors-reset');
                    $state.go('dashboard.reviews');
                } else {
                    $scope.alert.message = data.message;
                    $scope.alert.show = true;
                    $scope.alert.type = 'danger';
                }
            }).error(function(data, status, headers, conf) {
                $scope.alert.show = true;
                $scope.alert.type = 'danger';
            })

        }
    }])
        ;