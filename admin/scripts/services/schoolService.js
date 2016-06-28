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
        getCities:function(){
            var promise = $http({
               method:'GET',
               url:baseUrl+'/adminapi/v1/city'
            }).success(function(data,status, headers, conf){
                return data;
            });
            
            return promise;
        },
        getAreas:function(){
            var promise = $http({
               method:'GET',
               url:baseUrl+'/adminapi/v1/area'
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
        },
        getSchoolClasses: function(){
            return ['nursery','lkg','ukg','kg','prep','i','ii','iii','iv','v','vi','vii','viii','ix','x','xi','xii'];
        },
        getSubscriptions: function(schoolId){
            if(typeof schoolId != 'undefined')
                var url = baseUrl+'/adminapi/v1/subscriptions/school/'+schoolId;
            else
                var url = baseUrl+'/adminapi/v1/subscriptions';
            
            var promise = $http({
               method:'GET',
               url:url
            }).success(function(data,status, headers, conf){
                return data;
            });
            return promise;
        },
        getMediums: function(){
            var url = baseUrl+'/adminapi/v1/mediums';
            var promise = $http({
               method:'GET',
               url:url
            }).success(function(data,status, headers, conf){
                return data;
            });
            return promise;
        },
        getParents: function(){
            var url = baseUrl+'/adminapi/v1/parents';
            var promise = $http({
               method:'GET',
               url:url
            }).success(function(data,status, headers, conf){
                return data;
            });
            return promise;
        },
        getFacilities: function(){
            var url = baseUrl+'/adminapi/v1/facilities';
            var promise = $http({
               method:'GET',
               url:url
            }).success(function(data,status, headers, conf){
                return data;
            });
            return promise;
        }
    }
}])