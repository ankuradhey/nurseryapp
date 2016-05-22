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
        
        $scope.init = function(){
            $http({
                        method: 'GET',
                        url: baseUrl + '/adminapi/v1/reviews',
                        headers: {'Content-Type': 'application/json'}
                    }).success(function (data, status, headers, conf) {
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
                    }).error(function (data, status, headers, conf) {
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

    }]);