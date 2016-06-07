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
        .controller('countryController', ['$scope', '$http', 'countries', '$timeout','$state', function($scope, $http, countries, $timeout, $state) {
        $scope.alert = {type: 'danger', show: false, message: 'Oops! Some error occurred.'};
        $scope.countries = countries.data.countries;
        
        
        $scope.updateStatus = function(status, countryId) {
            var s = confirm("Are you sure you want to update status of this country?");
            if (!s)
                return;

            $http({
                method: 'PATCH',
                url: baseUrl + '/adminapi/v1/country/' + countryId,
                headers: {'Content-Type': 'application/json'},
                data: {country_status: status}
            }).success(function(data, status, headers, conf) {
                if (data.success) {
                    $scope.alert.message = 'School status changed successfully';
                    $scope.alert.show = true;
                    $scope.alert.type = 'success';
                    $state.reload();
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
        
        
        $scope.deleteCountry = function(countryId) {
            var s = confirm("Are you sure you want to delete this school?");
            if (!s)
                return;

            $http({
                method: 'DELETE',
                url: baseUrl + '/adminapi/v1/country/' + countryId,
                headers: {'Content-Type': 'application/json'}
            }).success(function(data, status, headers, conf) {
                if (data.success) {
                    $scope.alert.message = data.message;
                    $scope.alert.show = true;
                    $scope.alert.type = 'success';
                    $state.reload();
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
        .controller('stateController', ['$scope', '$http', 'countries', '$timeout','$state', function($scope, $http, countries, $timeout, $state) {
        $scope.alert = {type: 'danger', show: false, message: 'Oops! Some error occurred.'};
        $scope.states = {};
        $http.get(baseUrl + '/adminapi/v1/state', {'Content-Type': 'application/json'})
                .then(function(data, status, headers, conf) {
            $scope.states = data.data.states;
        }, function(data, status, headers, conf) {
            $scope.alert.show = true;
        });
        
        $scope.updateStatus = function(status, stateId) {
            var s = confirm("Are you sure you want to update status of this country?");
            if (!s)
                return;

            $http({
                method: 'PATCH',
                url: baseUrl + '/adminapi/v1/state/' + stateId,
                headers: {'Content-Type': 'application/json'},
                data: {state_status: status}
            }).success(function(data, status, headers, conf) {
                if (data.success) {
                    $scope.alert.message = 'State status changed successfully';
                    $scope.alert.show = true;
                    $scope.alert.type = 'success';
                    $state.reload();
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
        
        $scope.deleteState = function(stateId) {
            var s = confirm("Are you sure you want to delete this school?");
            if (!s)
                return;

            $http({
                method: 'DELETE',
                url: baseUrl + '/adminapi/v1/state/' + stateId,
                headers: {'Content-Type': 'application/json'}
            }).success(function(data, status, headers, conf) {
                if (data.success) {
                    $scope.alert.message = data.message;
                    $scope.alert.show = true;
                    $scope.alert.type = 'success';
                    $state.reload();
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

    }])
    .controller('stateAddController', ['$scope', '$http', '$stateParams','countries', '$state', function($scope, $http, $stateParams, countries, $state) {
        $scope.alert = {type: 'danger', show: false, message: 'Oops! Some error occurred.'};
        $scope.location = {country:{}};
        $scope.countries = countries.data.countries;
        $scope.stateId = $stateParams.stateId;

        if ($scope.stateId) {
            $http({
                method: 'GET',
                url: baseUrl + '/adminapi/v1/state/stateid/' + $scope.stateId
            }).success(function(data, status, headers, conf) {
                if (data.state && Object.keys(data.state).length) {
                    var state = data.state;
                    $scope.location.country = {country_id:state.state_country_id, country_name:state.country_name}
                    $scope.location.state_name = state.state_name;
                } else {
                    $scope.alert.show = true;
                    $scope.alert.type = 'danger';
                }
            }).error(function(data, status, headers, conf) {
                $scope.alert.show = true;
                $scope.alert.type = 'danger';
            });
        }

        $scope.saveState = function() {
            $scope.$broadcast('show-errors-check-validity');
            if ($scope.locationForm.$invalid) {
                return;
            }
            var data = {state_country_id: $scope.location.country.country_id, state_name: $scope.location.state_name};

            if ($scope.stateId) {
                var url = baseUrl + '/adminapi/v1/state/' + $scope.stateId;
                var method = 'PUT';
            } else {
                var url = baseUrl + '/adminapi/v1/state';
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
                            $state.go('dashboard.states');
                            $scope.$broadcast('show-errors-reset');0
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
    .controller('cityAddController', ['$scope', '$http', '$stateParams','states', '$state', function($scope, $http, $stateParams, states, $state) {
        $scope.alert = {type: 'danger', show: false, message: 'Oops! Some error occurred.'};
        $scope.location = {state:{}};
        $scope.states = states.data.states;
        $scope.cityId = $stateParams.cityId;

        if ($scope.cityId) {
            $http({
                method: 'GET',
                url: baseUrl + '/adminapi/v1/city/cityid/' + $scope.cityId
            }).success(function(data, status, headers, conf) {
                if (data.city && Object.keys(data.city).length) {
                    var city = data.city;
                    $scope.location.state = {state_id:city.state_id, state_name:city.state_name}
                    $scope.location.city_name = city.city_name;
                } else {
                    $scope.alert.show = true;
                    $scope.alert.type = 'danger';
                }
            }).error(function(data, status, headers, conf) {
                $scope.alert.show = true;
                $scope.alert.type = 'danger';
            });
        }

        $scope.saveCity = function() {
            $scope.$broadcast('show-errors-check-validity');
            if ($scope.locationForm.$invalid) {
                return;
            }
            var data = {city_state_id: $scope.location.state.state_id, city_name: $scope.location.city_name};

            if ($scope.cityId) {
                var url = baseUrl + '/adminapi/v1/city/' + $scope.cityId;
                var method = 'PUT';
            } else {
                var url = baseUrl + '/adminapi/v1/city';
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
                            $state.go('dashboard.cities');
                            $scope.$broadcast('show-errors-reset');0
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
.controller('areaAddController', ['$scope', '$http', '$stateParams','cities', '$state', function($scope, $http, $stateParams, cities, $state) {
        $scope.alert = {type: 'danger', show: false, message: 'Oops! Some error occurred.'};
        $scope.location = {city:{}};
        $scope.cities = cities.data.cities;
        $scope.areaId = $stateParams.areaId;

        if ($scope.areaId) {
            $http({
                method: 'GET',
                url: baseUrl + '/adminapi/v1/area/areaid/' + $scope.areaId
            }).success(function(data, status, headers, conf) {
                if (data.area && Object.keys(data.area).length) {
                    var area = data.area;
                    $scope.location.city = {city_id:area.city_id, city_name:area.city_name}
                    $scope.location.area_name = area.area_name;
                } else {
                    $scope.alert.show = true;
                    $scope.alert.type = 'danger';
                }
            }).error(function(data, status, headers, conf) {
                $scope.alert.show = true;
                $scope.alert.type = 'danger';
            });
        }

        $scope.saveArea = function() {
            $scope.$broadcast('show-errors-check-validity');
            if ($scope.locationForm.$invalid) {
                return;
            }
            var data = {area_city_id: $scope.location.city.city_id, area_name: $scope.location.area_name};

            if ($scope.areaId) {
                var url = baseUrl + '/adminapi/v1/area/' + $scope.areaId;
                var method = 'PUT';
            } else {
                var url = baseUrl + '/adminapi/v1/area';
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
                            $state.go('dashboard.areas');
                            $scope.$broadcast('show-errors-reset');0
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
.controller('zoneAddController', ['$scope', '$http', '$stateParams','areas', '$state', function($scope, $http, $stateParams, areas, $state) {
        $scope.alert = {type: 'danger', show: false, message: 'Oops! Some error occurred.'};
        $scope.location = {zone:{}};
        $scope.areas = areas.data.areas;
        $scope.zoneId = $stateParams.zoneId;

        if ($scope.zoneId) {
            $http({
                method: 'GET',
                url: baseUrl + '/adminapi/v1/zone/zoneid/' + $scope.zoneId
            }).success(function(data, status, headers, conf) {
                if (data.zone && Object.keys(data.zone).length) {
                    var zone = data.zone;
                    $scope.location.area = {area_id:zone.area_id, city_name:zone.area_name}
                    $scope.location.zone_name = zone.zone_name;
                } else {
                    $scope.alert.show = true;
                    $scope.alert.type = 'danger';
                }
            }).error(function(data, status, headers, conf) {
                $scope.alert.show = true;
                $scope.alert.type = 'danger';
            });
        }

        $scope.saveZone = function() {
            $scope.$broadcast('show-errors-check-validity');
            if ($scope.locationForm.$invalid) {
                return;
            }
            var data = {zone_area_id: $scope.location.area.area_id, zone_name: $scope.location.zone_name};

            if ($scope.zoneId) {
                var url = baseUrl + '/adminapi/v1/zone/' + $scope.zoneId;
                var method = 'PUT';
            } else {
                var url = baseUrl + '/adminapi/v1/zone';
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
                            $state.go('dashboard.zones');
                            $scope.$broadcast('show-errors-reset');0
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
        ;