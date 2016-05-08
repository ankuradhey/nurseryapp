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
        }
    }
}])