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
        .controller('parentController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
        $scope.alert = {type: 'danger', show: false, message: 'Oops! Some error occurred.'};
        $scope.parents = {};

        $http.get(baseUrl + '/adminapi/v1/parents', {'Content-Type': 'application/json'})
                .then(function(data, status, headers, conf) {
            $scope.parents = data.data.parents;
        }, function(data, status, headers, conf) {
            $scope.alert.show = true;
        });

    }])
        .controller('parentAddController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
        $scope.alert = {type: 'danger', show: false, message: 'Oops! Some error occurred.'};
        $scope.parents = {};


        $scope.saveParent = function() {

            $scope.$broadcast('show-errors-check-validity');
            if ($scope.schoolForm.$invalid) {
                return;
            }


            var data = {
                school_name: $scope.school.name,
                school_affiliation_code: $scope.school.affiliation,
                school_phone: $scope.school.phone,
                school_address: $scope.school.address,
                school_board: $scope.school.board.board_id,
                school_medium: $scope.school.medium,
                school_establish_year: $scope.school.year,
                school_country: $scope.location.country.country_id,
                school_state: $scope.location.state.state_id,
                school_city: $scope.location.city.city_id,
                school_area: $scope.location.area.area_id,
                school_zone: $scope.location.zone.zone_id,
            }

            if ($scope.schoolId) {
                var url = baseUrl + '/adminapi/v1/school/' + $scope.schoolId;
                var method = 'PUT';
            } else {
                var url = baseUrl + '/adminapi/v1/school';
                var method = 'POST';
            }

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

        $http.get(baseUrl + '/adminapi/v1/parents', {'Content-Type': 'application/json'})
                .then(function(data, status, headers, conf) {
            $scope.parents = data.data.parents;
        }, function(data, status, headers, conf) {
            $scope.alert.show = true;
        });

    }])
        ;
