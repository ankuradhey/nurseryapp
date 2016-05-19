'use strict';

/**
 * @ngdoc directive
 * @name sbAdminApp.service:authService
 * @author AnkitS
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
        .factory("authService", ["$rootScope", "$http", "$q", "$window", function ($rootScope, $http, $q, $window) {
                var userInfo;
                var accessLevels = routingConfig.accessLevels,
                    userRoles = routingConfig.userRoles;
                    
                $rootScope.accessLevels = accessLevels;
                $rootScope.userRoles = userRoles;
                
                function login(userName, password) {
                    var deferred = $q.defer();

                    $http.post(baseUrl+"/login", {user_email: userName, user_password: password})
                            .then(function (result) {
                                console.log(result)
                                if(result.data.success){
                                    userInfo = {
                                        accessToken: result.data.token,
                                        userName: result.data.user.user_email,
                                        role:result.data.user.user_type
                                    };
                                    $rootScope.user = userInfo;
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
                    return deferred.promise;
                }

                function getUserInfo() {
                    return userInfo;
                }
                
                function authorize(accessLevel, role){
                    if(role === undefined)
                        role = $rootScope.user.role;
                    return accessLevel & role;
                    
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
                    getUserInfo: getUserInfo,
                    accessLevels: accessLevels,
                    userRoles: userRoles,
                    user: getUserInfo,
                    authorize: authorize
                };
            }]);