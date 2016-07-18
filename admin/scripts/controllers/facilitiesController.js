'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:facilitiesController
 * @author AnkitS
 * @description
 * # SchoolCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
        .controller('facilitiesController', ['$scope', '$http', '$state','$stateParams', 'facilities', function ($scope, $http, $state, $stateParams, facilities) {
            $scope.alert = {type: 'danger', show: false, message: 'Oops! Some error occurred.'};
            
            $scope.facilities = facilities.data.facilities;
            
            
            if($stateParams.facilityId){
                $scope.facility =  $filter({facility_id:$stateParams.facilityId})($scope.facilities);
                console.log($scope.facility);
            }
            
            
        }]);