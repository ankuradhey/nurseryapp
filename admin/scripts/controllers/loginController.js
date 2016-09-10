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
        .controller("loginController", ["$scope", "$location", "$window", "authService", "$state", function ($scope, $location, $window, authService, $state) {
                $scope.userInfo = null;
                $scope.loginVisible = true;
                $scope.pageTitle = "Please Sign In";
                
                $scope.login = function () {
                    $scope.$broadcast('show-errors-check-validity');
                    if ($scope.loginForm.$invalid) {
                        return;
                    }
                    
                    authService.login($scope.user.email, $scope.user.password)
                            .then(function (result) {
                                $scope.userInfo = result;
//                                $state.go('dashboard.home');
                                $location.path("/dashboard/home");
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
                
                $scope.scrollToForgot = function(){
                    $scope.loginVisible = false;
                    $scope.pageTitle = "Forgot Password";
                }
                
                $scope.scrollToLogin = function(){
                    $scope.loginVisible = true;
                    $scope.pageTitle = "Please Sign In";
                }
                
                $scope.forgotPasswordSbmt = function(){
                    authService.forgotPassword($scope.forgot.email)
                            .then(function (result) {
                        console.log('--> Debugging response data', result);
                                if(result.success)
                                    $window.alert("Forgot password request sent successfully");
                                else
                                    $window.alert(result.message);
//                              
                            }, function (error) {
                                $window.alert("Invalid credentials");
                                console.log(error);
                            });
                }
            }]);