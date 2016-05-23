'use strict';

/**
 * @ngdoc directive
 * @name sbAdminApp.service:schoolService
 * @author AnkitS
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
.factory('schoolService',['$http',function($http){
    return {
        getSchools:function(){
            var promise = $http({
                method:'GET',
                url:baseUrl+'/adminapi/v1/schools'
            });
            
            promise.success(function(data,status, headers,conf){
                return data;
            })
            
            return promise;
        },
        
        getBoards:function(){
            var promise = $http({
               method:'GET',
               url:baseUrl+'/adminapi/v1/boards'
            }).success(function(data,status, headers, conf){
                return data;
            });
            
            return promise;
        },
        getCountries:function(){
            var promise = $http({
               method:'GET',
               url:baseUrl+'/adminapi/v1/country'
            }).success(function(data,status, headers, conf){
                return data;
            });
            
            return promise;
        },
        getStates:function(){
            var promise = $http({
               method:'GET',
               url:baseUrl+'/adminapi/v1/state'
            }).success(function(data,status, headers, conf){
                return data;
            });
            
            return promise;
        },
        getSchoolTypes: function(){
            var promise = $http({
               method:'GET',
               url:baseUrl+'/adminapi/v1/schooltypes'
            }).success(function(data,status, headers, conf){
                return data;
            });
            return promise;
        }
    }
}])