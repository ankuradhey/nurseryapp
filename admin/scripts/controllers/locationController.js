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
        .controller('countryController', ['$scope', '$http', 'countries', '$timeout', function($scope, $http, countries, $timeout) {
        $scope.alert = {type: 'danger', show: false, message: 'Oops! Some error occurred.'};
        $scope.countries = countries.data.countries;
    }])
        .controller('countryAddController', ['$scope', '$http', '$stateParams','$state', function($scope, $http, $stateParams, $state) {
        $scope.alert = {type: 'danger', show: false, message: 'Oops! Some error occurred.'};
        $scope.location = {country_name:''};
        $scope.countryId = $stateParams.countryId;

        if ($scope.countryId) {
            $http({
                method: 'GET',
                url: baseUrl + '/adminapi/v1/country/' + $scope.countryId
            }).success(function(data, status, headers, conf) {
                if (data.country && Object.keys(data.country).length) {
                    var country = data.country;
                    $scope.location.country_name = country.country_name;
                } else {
                    $scope.alert.show = true;
                    $scope.alert.type = 'danger';
                }
            }).error(function(data, status, headers, conf) {
                $scope.alert.show = true;
                $scope.alert.type = 'danger';
            });
        }

        $scope.saveCountry = function() {
            $scope.$broadcast('show-errors-check-validity');
            if ($scope.locationForm.$invalid) {
                return;
            }
            var data = {country_name: $scope.location.country_name, country_status: "1"};

            if ($scope.countryId) {
                var url = baseUrl + '/adminapi/v1/country/' + $scope.countryId;
                var method = 'PUT';
            } else {
                var url = baseUrl + '/adminapi/v1/country';
                var method = 'POST';
            }
            
            $http({
                        method: method,
                        url: url,
                        headers: {'Content-Type': 'application/json'},
                        data: data
                    }).success(function (data, status, headers, conf) {
                        if (data.success) {
                            $scope.alert.message = data.message;
                            $scope.alert.show = true;
                            $scope.alert.type = 'success';
                            $state.go('dashboard.countries');
                            $scope.$broadcast('show-errors-reset');
                        } else {
                            $scope.alert.message = data.message;
                            $scope.alert.show = true;
                            $scope.alert.type = 'danger';
                        }
                    }).error(function (data, status, headers, conf) {
                        $scope.alert.show = true;
                        $scope.alert.type = 'danger';
                    })

        }

    }])
        .controller('stateController', ['$scope', '$http', 'countries', '$timeout', function($scope, $http, countries, $timeout) {
        $scope.alert = {type: 'danger', show: false, message: 'Oops! Some error occurred.'};
        $scope.states = {};
        $http.get(baseUrl + '/adminapi/v1/state', {'Content-Type': 'application/json'})
                .then(function(data, status, headers, conf) {
            $scope.states = data.data.states;
        }, function(data, status, headers, conf) {
            $scope.alert.show = true;
        });

    }])
        .controller('cityController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
        $scope.alert = {type: 'danger', show: false, message: 'Oops! Some error occurred.'};
        $scope.states = {};
        $http.get(baseUrl + '/adminapi/v1/city', {'Content-Type': 'application/json'})
                .then(function(data, status, headers, conf) {
            $scope.cities = data.data.cities;
        }, function(data, status, headers, conf) {
            $scope.alert.show = true;
        });

    }])
        .controller('areaController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
        $scope.alert = {type: 'danger', show: false, message: 'Oops! Some error occurred.'};
        $scope.states = {};
        $http.get(baseUrl + '/adminapi/v1/area', {'Content-Type': 'application/json'})
                .then(function(data, status, headers, conf) {
            $scope.areas = data.data.areas;
        }, function(data, status, headers, conf) {
            $scope.alert.show = true;
        })
    }])
        .controller('zoneController', ['$rootScope', '$scope', '$http', '$timeout', function($rootScope, $scope, $http, $timeout) {
        $rootScope.collapseVar = 'location';
        $scope.alert = {type: 'danger', show: false, message: 'Oops! Some error occurred.'};
        $scope.states = {};
        $http.get(baseUrl + '/adminapi/v1/zone', {'Content-Type': 'application/json'})
                .then(function(data, status, headers, conf) {
            $scope.zones = data.data.zones;
        }, function(data, status, headers, conf) {
            $scope.alert.show = true;
        });

    }])
        ;