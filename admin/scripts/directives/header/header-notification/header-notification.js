'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
        .directive('headerNotification', ["$rootScope", "authService", function ($rootScope, authService) {
                return {
                    templateUrl: 'scripts/directives/header/header-notification/header-notification.html',
                    restrict: 'E',
                    replace: true,
                    link: function ($scope, element, attrs) {
                        $scope.logout = function () {
                            authService.logout()
                                    .then(function (result) {}, function (error) {});
                        }
                        $scope.userId = $rootScope.user.userId;
                    }
                }
            }]);


