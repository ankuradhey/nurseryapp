'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('MainCtrl', function($scope,$position, $http) {
      
      $scope.dashboardData = {
          count:{
              'schools':0,
              'parents':0,
              'payments':0,
              'support':0
          }
      };
      
      $http({
          method:'GET',
          url: baseUrl+'/adminapi/v1/dashboard'
      }).then(function successCallback(response){
          $scope.dashboardData.count.schools = response.data.items.school_count;
          $scope.dashboardData.count.parents = response.data.items.parent_count;
          $scope.dashboardData.count.payments = response.data.items.payment_count;
          $scope.dashboardData.count.support = response.data.items.support_count;
      }, function errorCallback(response){
          alert('Something went wrong');
          console.log(response);
      });
      
  });
