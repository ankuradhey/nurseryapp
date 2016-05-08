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

.controller('SchoolCtrl', ['$scope', '$http','schools', function($scope, $http, schools) {
    console.log('schools list - ',schools);
    $scope.schools = schools;
      
}]);