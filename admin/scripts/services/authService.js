'use strict';

/**
 * @ngdoc directive
 * @name sbAdminApp.service:authService
 * @author AnkitS
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
        .factory("authService", ["$http", "$q", "$window", function ($http, $q, $window) {
                var userInfo;

                function login(userName, password) {
                    var deferred = $q.defer();

                    $http.post(baseUrl+"/login", {user_email: userName, user_password: password})
                            .then(function (result) {
                                console.log(result)
                                if(result.data.success){
                                    userInfo = {
                                        accessToken: result.data.token,
                                        userName: result.data.userName,
                                        role:result.data.userRole
                                    };
                                    $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
                                    deferred.resolve(userInfo);
                                }else{
                                    deferred.reject(result.message);
                                }
                            }, function (error) {
                                deferred.reject(error);
                            });

                    return deferred.promise;
                }

                function logout() {
                    var deferred = $q.defer();
                        userInfo = null;
                        $window.sessionStorage["userInfo"] = null;
                        deferred.resolve();
                        $window.location.hash = '/login';
//                            
//                    $http({
//                        method: "POST",
//                        url: "/logout",
//                        headers: {
//                            "access_token": userInfo.accessToken
//                        }
//                    }).then(function (result) {
//                        if(result.success){
//                            userInfo = null;
//                            $window.sessionStorage["userInfo"] = null;
//                            deferred.resolve(result);
//                        }else{
//                            deferred.reject(result.message);
//                        }
//                    }, function (error) {
//                        deferred.reject(error);
//                    });

                    return deferred.promise;
                }

                function getUserInfo() {
                    return userInfo;
                }

                function init() {
                    if ($window.sessionStorage["userInfo"]) {
                        userInfo = JSON.parse($window.sessionStorage["userInfo"]);
                    }
                }
                init();

                return {
                    login: login,
                    logout: logout,
                    getUserInfo: getUserInfo
                };
            }]);