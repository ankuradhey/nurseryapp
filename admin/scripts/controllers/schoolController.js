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

.controller('SchoolCtrl', ['$scope', '$http','schools','$state', function($scope, $http, schools, $state) {
    $scope.alert = {type:'danger', show:false,message:'Oops! Some error occurred.'};
    console.log('schools list - ',schools);
    $scope.schools = schools.data.schools;
    $state;
    $scope.deleteSchool = function (schoolId){
        $http({
            method:'DELETE',
            url:baseUrl+'/adminapi/v1/school/'+schoolId,
            headers:{'Content-Type':'application/json'}
        }).success(function(data,status,headers,conf){
            if(data.success){
                $scope.alert.message = data.message;
                $scope.alert.show = true;
                $scope.alert.type = 'success';
                
                $state.reload();
            }else{
                $scope.alert.message = data.message;
                $scope.alert.show = true;
                $scope.alert.type = 'danger';
            }
        }).error(function(data,status,headers,conf){
            $scope.alert.show = true;
            $scope.alert.type = 'danger';
        })
    }
    
}])
.controller('SchoolAddCtrl',['$rootScope', '$scope','$http','$stateParams','boards','countries', function($rootScope, $scope,$http, $stateParams,boards, countries){
    $scope.alert = {type:'danger', show:false,message:'Oops! Some error occurred.'};
    $scope.boards = boards.data.boards;
    $scope.countries = countries.data.countries;
    $scope.schoolId = $stateParams.schoolId;
    $scope.school = {name:'',affiliation:'',phone:'',address:'',board:'',medium:'',year:'',};
    $scope.location = {country:{country_id:'',country_name:'-- Select --'},state:'',city:'',area:'',zone:''};
    //check if its an edit case
    
    if($scope.schoolId){
        $http({
            method:'GET',
            url:baseUrl+'/adminapi/v1/school/'+$scope.schoolId
        }).success(function(data, status, headers, conf){
            if(data.school && Object.keys(data.school).length){
                var school = data.school;
                $scope.school.name = school.school_name;
                $scope.school.affiliation = school.school_affiliation_code;
                $scope.school.phone = school.school_phone;
                $scope.school.address = school.school_address;
                $scope.school.board = {board_id:school.board_id,board_name:school.board_name};
                $scope.school.medium = school.school_medium;
                $scope.school.year = school.school_establish_year;
                $scope.location.country = {country_id:school.country_id,country_name:school.country_name};
                $scope.location.state = {state_id:school.state_id,state_name:school.state_name};
                $scope.location.city = {city_id:school.city_id,city_name:school.city_id};
                $scope.location.area = {area_id:school.area_id,area_name:school.area_name};
                $scope.location.zone = {zone_id:school.zone_id,zone_name:school.zone_name};
            }else{
                $scope.alert.show = true;
                $scope.alert.type = 'danger';
            }
        }).error(function(data, status, headers, conf){
            $scope.alert.show = true;
            $scope.alert.type = 'danger';
        });
    }
    
    $scope.$watch('location.country',function(newvalue, oldvalue){
        if(newvalue.country_id){
            $scope.getStates();
        }
    });
    
    $scope.getStates = function(){
        console.log('getstates function called');
        var countryId = $scope.location.country.country_id;
        var promise = $http({
               method:'GET',
               url:baseUrl+'/adminapi/v1/state/'+countryId
            }).success(function(data,status, headers, conf){
                $scope.states = data.states;
            });
    }
    
    $scope.$watch('location.state',function(newvalue, oldvalue){
        if(newvalue.state_id){
            $scope.getCities();
        }
    });
    
    $scope.getCities = function(){
        var stateId = $scope.location.state.state_id;
        var promise = $http({
               method:'GET',
               url:baseUrl+'/adminapi/v1/city/'+stateId
            }).success(function(data,status, headers, conf){
                $scope.cities = data.cities;
            });
    }
    
    $scope.$watch('location.city',function(newvalue, oldvalue){
        if(newvalue.city_id){
            $scope.getAreas();
        }
    });
    
    $scope.getAreas = function(){
        var cityId = $scope.location.city.city_id;
        var promise = $http({
               method:'GET',
               url:baseUrl+'/adminapi/v1/area/'+cityId
            }).success(function(data,status, headers, conf){
                $scope.areas = data.areas;
            });
    }
    
    $scope.$watch('location.area',function(newvalue, oldvalue){
        if(newvalue.area_id){
            $scope.getZones();
        }
    });
    
    $scope.getZones = function(){
        var areaId = $scope.location.area.area_id;
        var promise = $http({
               method:'GET',
               url:baseUrl+'/adminapi/v1/zone/'+areaId
            }).success(function(data,status, headers, conf){
                $scope.zones = data.zones;
            });
    }
    
    $scope.getYears = function(){
        var arr = {};
        
        for(var i=1980;i<=2016;i++)
            arr[i] = i;
        
        return arr;
    }
    
    $scope.saveSchool = function(){
        $scope.$broadcast('show-errors-check-validity');
        if ($scope.schoolForm.$invalid) { return; }
        
        
        var data = {
            school_name:$scope.school.name,
            school_affiliation_code:$scope.school.affiliation,
            school_phone:$scope.school.phone,
            school_address:$scope.school.address,
            school_board:$scope.school.board.board_id,
            school_medium:$scope.school.medium,
            school_establish_year:$scope.school.year,
            school_country:$scope.location.country.country_id,
            school_state:$scope.location.state.state_id,
            school_city:$scope.location.city.city_id,
            school_area:$scope.location.area.area_id,
            school_zone:$scope.location.zone.zone_id,
        }

        if($scope.schoolId){
            var url = baseUrl+'/adminapi/v1/school/'+$scope.schoolId;
            var method = 'PUT';
        }else{
            var url = baseUrl+'/adminapi/v1/school';
            var method = 'POST';
        }
        
        $http({
            method:method,
            url:url,
            headers:{'Content-Type':'application/json'},
            data:data
        }).success(function(data,status,headers,conf){
            if(data.success){
                $scope.alert.message = data.message;
                $scope.alert.show = true;
                $scope.alert.type = 'success';
                $scope.$broadcast('show-errors-reset');
            }else{
                $scope.alert.message = data.message;
                $scope.alert.show = true;
                $scope.alert.type = 'danger';
            }
        }).error(function(data,status,headers,conf){
            $scope.alert.show = true;
            $scope.alert.type = 'danger';
        })
    }
    
}])
;