'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
   //Datepicker
.directive("customDatepicker", function(){
  return {
    restrict: "E",
    scope:{
      ngModel: "=",
      dateOptions: "=",
      opened: "=",
    },
    link: function($scope, element, attrs) {
      $scope.open = function(event){
        console.log("open");
        event.preventDefault();
        event.stopPropagation();
        $scope.opened = true;
      };

      $scope.clear = function () {
        $scope.ngModel = null;
      };
    },
    templateUrl: 'scripts/directives/datepicker/datepicker.html'
  }
});


