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
                $rootScope.user = {role:1};
                
                function login(userName, password) {
                    var deferred = $q.defer();

                    $http.post(baseUrl+"/admin/login", {user_email: userName, user_password: password})
                            .then(function (result) {
                                console.log(result)
                                if(result.data.success){
                                    userInfo = {
                                        accessToken: result.data.token,
                                        userName: result.data.user.user_email,
                                        userId: result.data.user.user_id,
//                                        role:result.data.user.user_type
                                        role:userRoles[result.data.user.user_type]
                                    };
                                    $rootScope.user = userInfo;
                                    $window.localStorage["userInfo"] = JSON.stringify(userInfo);
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
                        $window.localStorage["userInfo"] = null;
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
                    if ($window.localStorage["userInfo"]) {
                        userInfo = JSON.parse($window.localStorage["userInfo"]);
                        $rootScope.user = userInfo;
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