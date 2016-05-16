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
.controller('countryController', ['$scope', '$http', 'countries', '$timeout', function($scope, $http, countries, $timeout) {
        $scope.alert = {type: 'danger', show: false, message: 'Oops! Some error occurred.'};
        $scope.countries = countries.data.countries;
}])
.controller('stateController', ['$scope', '$http', 'countries', '$timeout', function($scope, $http, countries, $timeout) {
        $scope.alert = {type: 'danger', show: false, message: 'Oops! Some error occurred.'};
        $scope.states = {};
        $http.get(baseUrl+'/adminapi/v1/state',{'Content-Type':'application/json'})
        .then(function(data, status, headers, conf){
            $scope.states = data.data.states;
        },function(data, status, headers, conf){
            $scope.alert.show = true;
        });

}])
.controller('cityController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
        $scope.alert = {type: 'danger', show: false, message: 'Oops! Some error occurred.'};
        $scope.states = {};
        $http.get(baseUrl+'/adminapi/v1/city',{'Content-Type':'application/json'})
        .then(function(data, status, headers, conf){
            $scope.cities = data.data.cities;
        },function(data, status, headers, conf){
            $scope.alert.show = true;
        });

}])
.controller('areaController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
        $scope.alert = {type: 'danger', show: false, message: 'Oops! Some error occurred.'};
        $scope.states = {};
        $http.get(baseUrl+'/adminapi/v1/area',{'Content-Type':'application/json'})
        .then(function(data, status, headers, conf){
            $scope.areas = data.data.areas;
        },function(data, status, headers, conf){
            $scope.alert.show = true;
        })
}])
.controller('zoneController', ['$rootScope', '$scope', '$http', '$timeout', function($rootScope, $scope, $http, $timeout) {
        $rootScope.collapseVar = 'location';
        $scope.alert = {type: 'danger', show: false, message: 'Oops! Some error occurred.'};
        $scope.states = {};
        $http.get(baseUrl+'/adminapi/v1/zone',{'Content-Type':'application/json'})
        .then(function(data, status, headers, conf){
            $scope.zones = data.data.zones;
        },function(data, status, headers, conf){
            $scope.alert.show = true;
        });

}])
;