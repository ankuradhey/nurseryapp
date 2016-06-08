'use strict';

/**
 * @ngdoc function
 * @name sbAdminApp.controller:countryController
 * @author AnkitS
 * @description
 * # SchoolCtrl
 * Controller of the sbAdminApp
 */

angular.module('sbAdminApp')
        .controller('parentController', ['$scope', '$http', '$timeout', '$state', function($scope, $http, $timeout, $state) {
        $scope.alert = {type: 'danger', show: false, message: 'Oops! Some error occurred.'};
        $scope.parents = {};

        $http.get(baseUrl + '/adminapi/v1/parents', {'Content-Type': 'application/json'})
                .then(function(data, status, headers, conf) {
            $scope.parents = data.data.parents;
        }, function(data, status, headers, conf) {
            $scope.alert.show = true;
        });

        $scope.deleteParent = function(userId) {
            
            var s = confirm("Are you sure you want to delete parent?");
            if (!s)
                return;
            
            $http({
                url: baseUrl + '/adminapi/v1/parent/' + userId,
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'}
            }).success(function(data, status, headers, conf) {
                if (data.success) {
                    $scope.alert.message = data.message;
                    $scope.alert.show = true;
                    $scope.alert.type = 'success';
                    $state.reload();
                } else {
                    $scope.alert.show = true;
                }
            }).error(function(data, status, headers, conf) {
                $scope.alert.message = data.message;
                $scope.alert.show = true;
                $scope.alert.type = 'danger';
                $state.reload();
            });

        }

        $scope.updateStatus = function(status, userId) {
            var s = confirm("Are you sure you want to " + (status ? 'deactivate' : 'activate') + " this parent?");
            if (!s)
                return;

            $http({
                method: 'PUT',
                url: baseUrl + '/adminapi/v1/parent/' + userId,
                headers: {'Content-Type': 'application/json'},
                data: {user_status: status}
            }).success(function(data, status, headers, conf) {
                if (data.success) {
                    $scope.alert.message = 'Parent status changed successfully';
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
        .controller('parentAddController', ['$scope', '$http', '$timeout', '$state', '$stateParams', function($scope, $http, $timeout, $state, $stateParams) {
        $scope.alert = {type: 'danger', show: false, message: 'Oops! Some error occurred.'};
        $scope.parents = {};
        $scope.user = {user_password: '123456'};
        $scope.parentId = $stateParams.parentId;

        if ($scope.parentId) {
            $http({
                method: 'GET',
                url: baseUrl + '/adminapi/v1/parent/' + $scope.parentId
            }).success(function(data, status, headers, conf) {
                if (data.user && Object.keys(data.user).length) {
                    var parent = data.user;
                    $scope.user.user_email = parent.user_email;
//                            $scope.user.user_password = parent.user_password;
                    $scope.user.user_password = '';
                    $scope.user.user_first_name = parent.user_first_name;
                    $scope.user.user_last_name = parent.user_last_name;
                    $scope.user.user_phone = parent.user_phone;
                    $scope.user.user_address = parent.user_address;
                } else {
                    $scope.alert.show = true;
                    $scope.alert.type = 'danger';
                }
            }).error(function(data, status, headers, conf) {
                $scope.alert.show = true;
                $scope.alert.type = 'danger';
            });
        }

        $scope.saveParent = function() {
            $scope.$broadcast('show-errors-check-validity');
            if ($scope.parentForm.$invalid) {
                return;
            }

            var data = {
                user_type: 'parent',
                user_email: $scope.user.user_email,
                user_password: $scope.user.user_password,
                user_first_name: $scope.user.user_first_name,
                user_last_name: $scope.user.user_last_name,
                user_phone: $scope.user.user_phone,
                user_address: $scope.user.user_address,
                user_status: '1',
            }

            if ($scope.parentId) {
                if (!$scope.user.user_password)
                    delete data.user_password;

                var url = baseUrl + '/adminapi/v1/parent/' + $scope.parentId;
                var method = 'PUT';
            } else {

                if (!$scope.user.user_password)
                    $scope.user.user_password = '123456';

                var url = baseUrl + '/adminapi/v1/parent';
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
                    //$state.reload();
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
