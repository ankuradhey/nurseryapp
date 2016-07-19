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
        .controller('facilitiesController', ['$scope', '$http', '$state','$stateParams', 'facilities','$filter', function ($scope, $http, $state, $stateParams, facilities, $filter) {
            $scope.alert = {type: 'danger', show: false, message: 'Oops! Some error occurred.'};
            
            $scope.facilities = facilities.data.facilities;
            
            
            if($stateParams.facilityId){
                $scope.facility =  $filter({facility_id:$stateParams.facilityId})($scope.facilities);
                console.log($scope.facility);
            }
            
            $scope.saveFacility = function(){
            	$scope.$broadcast('show-errors-check-validity');
	            if ($scope.facilityForm.$invalid) {
	                return;
	            }
	            var data = {
	                facility_name: $scope.facility.facility_name,
	                facility_status:1
	            }

	            if ($stateParams.facilityId) {
	                var url = baseUrl + '/adminapi/v1/facility/' + $stateParams.facilityId;
	                var method = 'PUT';
	            } else {
	                var url = baseUrl + '/adminapi/v1/facility';
	                var method = 'POST';
	            }

				console.log(data);

	            $http({
	                method: method,
	                url: url,
	                headers: {'Content-Type': 'application/json'},
	                data: data
	            }).success(function(data, status, headers, conf) {
	                if (data.success) {
	                    $scope.alert.message = data.message;
	                    $scope.alert.show = true;
	                    $scope.alert.type = 'success';
	                    $scope.$broadcast('show-errors-reset');
	                    $state.go('dashboard.facilities');
	                } else {
	                    $scope.alert.message = data.message;
	                    $scope.alert.show = true;
	                    $scope.alert.type = 'danger';
	                }
	            }).error(function(data, status, headers, conf) {
	                $scope.alert.show = true;
	                $scope.alert.type = 'danger';
	            })
            }
            

            $scope.deleteFacility = function(facilityId){

            	if(!facilityId)
            		return;

            	$http({
	                method: 'DELETE',
	                url: baseUrl+'/adminapi/v1/facility/'+facilityId,
	                headers: {'Content-Type': 'application/json'}
	            }).success(function(data, status, headers, conf) {
	                if (data.success) {
	                    $scope.alert.message = data.message;
	                    $scope.alert.show = true;
	                    $scope.alert.type = 'success';
	                    $scope.$broadcast('show-errors-reset');
	                    $state.go('dashboard.facilities');
	                } else {
	                    $scope.alert.message = data.message;
	                    $scope.alert.show = true;
	                    $scope.alert.type = 'danger';
	                }
	            }).error(function(data, status, headers, conf) {
	                $scope.alert.show = true;
	                $scope.alert.type = 'danger';
	            })

            }

        }]);