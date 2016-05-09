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
    $scope.schools = schools.data.schools;
    
}])
.controller('SchoolAddCtrl',['$scope','$http','boards','countries',function($scope,$http, boards, countries){
    $scope.boards = boards.data.boards;
    $scope.countries = countries.data.countries;
    
    $scope.getStates = function(){
        var countryId = $scope.location.countryId;
        var promise = $http({
               method:'GET',
               url:baseUrl+'/adminapi/v1/state/'+countryId
            }).success(function(data,status, headers, conf){
                $scope.states = data.states;
            });
    }
    
    $scope.getCities = function(){
        var stateId = $scope.location.stateId;
        var promise = $http({
               method:'GET',
               url:baseUrl+'/adminapi/v1/city/'+stateId
            }).success(function(data,status, headers, conf){
                $scope.cities = data.cities;
            });
    }
    
    $scope.getAreas = function(){
        var cityId = $scope.location.cityId;
        var promise = $http({
               method:'GET',
               url:baseUrl+'/adminapi/v1/area/'+cityId
            }).success(function(data,status, headers, conf){
                $scope.areas = data.areas;
            });
    }
    
    $scope.getZones = function(){
        var areaId = $scope.location.areaId;
        var promise = $http({
               method:'GET',
               url:baseUrl+'/adminapi/v1/zone/'+areaId
            }).success(function(data,status, headers, conf){
                $scope.zones = data.zones;
            });
    }
    
    
    $scope.formData      = {};
    $scope.school = {year:""};
    $scope.opened        = false;
  
    //Datepicker
    $scope.dateOptions = {
        'year-format': "'yy'",
        'show-weeks' : false
    };

}])
;