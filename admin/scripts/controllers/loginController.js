'use strict';

/**
 * @ngdoc function
 * @name sbAdminApp.controller:loginController
 * @author AnkitS
 * @description
 * # SchoolCtrl
 * Controller of the sbAdminApp
 */

angular.module('sbAdminApp')
        .controller("loginController", ["$scope", "$location", "$window", "authService", function ($scope, $location, $window, authService) {
                $scope.userInfo = null;
                $scope.login = function () {
                    $scope.$broadcast('show-errors-check-validity');
                    if ($scope.loginForm.$invalid) {
                        return;
                    }
                    
                    authService.login($scope.user.email, $scope.user.password)
                            .then(function (result) {
                                $scope.userInfo = result;
                                $location.path("/");
                            }, function (error) {
                                $window.alert("Invalid credentials");
                                console.log(error);
                            });
                };

                $scope.cancel = function () {
                    $scope.userName = "";
                    $scope.password = "";
                    $scope.role = "";
                };
            }]);