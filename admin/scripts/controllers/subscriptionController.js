'use strict';

/**
 * @ngdoc function
 * @name sbAdminApp.controller:subscriptionController
 * @author AnkitS
 * @description
 * # SchoolCtrl
 * Controller of the sbAdminApp
 */

angular.module('sbAdminApp')

        .controller('subscriptionController', ['$scope', '$http', '$state', '$stateParams', 'subscription', function ($scope, $http, $state, $stateParams, subscription) {
                $scope.alert = {type: 'danger', show: false, message: 'Oops! Some error occurred.'};
                $scope.subscriptions = subscription.data.plans;
                $scope.plan = {};
                $state;
                $scope.subscriptionId = $stateParams.subscriptionId;
                if ($scope.subscriptionId) {
                    $http({
                        method: 'GET',
                        url: baseUrl + '/adminapi/v1/subscription/' + $scope.subscriptionId,
                        headers: {'Content-Type': 'application/json'}
                    }).success(function (data, status, headers, conf) {
                        if (data.success) {
                            $scope.plan = data.plan;
                            $scope.setDateTo();
                        }
                        else {
                            $scope.alert.message = data.message;
                            $scope.alert.show = true;
                            $scope.alert.type = 'danger';
                        }
                    }).error(function (data, status, headers, conf) {
                        $scope.alert.show = true;
                        $scope.alert.type = 'danger';
                    })
                }


                $scope.changeSubscription = function () {
                    var subscriptionId = $scope.plan.plan_id;
                    $state.go('dashboard.addsubscription', {subscriptionId: subscriptionId})
                }


                $scope.today = function () {
                    $scope.dt = new Date();
                };
                $scope.today();

                $scope.inlineOptions = {
                    customClass: getDayClass,
                    minDate: new Date(),
                    showWeeks: true
                };

                $scope.popup1 = {
                    opened: false
                };

                $scope.dateOptions = {
                    dateDisabled: disabled,
                    formatYear: 'yy',
                    maxDate: new Date(2020, 5, 22),
                    minDate: new Date(),
                    startingDay: 1
                };

                // Disable weekend selection
                function disabled(data) {
                    var date = data.date,
                            mode = data.mode;
                    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
                }

                $scope.toggleMin = function () {
                    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
                    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
                };

                $scope.setDate = function (year, month, day) {
                    console.log('----set date called--');
                    $scope.dt = new Date(year, month, day);
                };

                $scope.open1 = function () {
                    $scope.popup1.opened = true;
                };

                function getDayClass(data) {
                    var date = data.date,
                            mode = data.mode;
                    if (mode === 'day') {
                        var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                        for (var i = 0; i < $scope.events.length; i++) {
                            var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                            if (dayToCheck === currentDay) {
                                return $scope.events[i].status;
                            }
                        }
                    }

                    return '';
                }

                $scope.setDateTo = function () {
                    var dateFrom = $scope.dt;
                    var dateTo = new Date(new Date(dateFrom).setMonth(dateFrom.getMonth() + $scope.plan.plan_duration + 1));
                    $scope.dateTo = dateTo.getDate() + '-' + dateTo.getMonth() + '-' + dateTo.getFullYear();
                }
                
                $scope.updateStatus = function(status, planId){
                    $http({
                        method: 'PATCH',
                        url: baseUrl + '/adminapi/v1/subscription/' + planId,
                        data:{plan_status:status},
                        headers: {'Content-Type': 'application/json'}
                    }).success(function (data, status, headers, conf) {
                        if (data.success) {
                            $state.reload();
                        }
                        else {
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
        .controller('addSubscriptionController', ['$scope', '$http', '$state', '$stateParams', function ($scope, $http, $state, $stateParams) {
                $scope.alert = {type: 'danger', show: false, message: 'Oops! Some error occurred.'};
                $scope.subscriptionId = $stateParams.subscriptionId;
                if ($scope.subscriptionId) {
                    $http({
                        method: 'GET',
                        url: baseUrl + '/adminapi/v1/subscription/' + $scope.subscriptionId,
                        headers: {'Content-Type': 'application/json'}
                    }).success(function (data, status, headers, conf) {
                        if (data.success) {
                            $scope.plan = data.plan;
                        }
                        else {
                            $scope.alert.message = data.message;
                            $scope.alert.show = true;
                            $scope.alert.type = 'danger';
                        }
                    }).error(function (data, status, headers, conf) {
                        $scope.alert.show = true;
                        $scope.alert.type = 'danger';
                    })
                }
                
                
                $scope.saveSubscription = function () {
                    
                    if($scope.subscriptionId){
                        var url = baseUrl + '/adminapi/v1/subscription/'+$scope.subscriptionId;
                    }else{
                        var url = baseUrl + '/adminapi/v1/subscription/';
                    }
                    
                    $http({
                        method: $scope.subscriptionId?'PUT':'POST',
                        url: url,
                        headers: {'Content-Type': 'application/json'},
                        data: $scope.plan
                    }).success(function (data, status, headers, conf) {
                        if (data.success) {
                            $state.go('dashboard.subscriptions');
                        } else {
                            alert(data.message || 'Oops! Some error occurred');
//                    $scope.$broadcast('show-error-alert');
                        }
                    }).error(function (data, status, headers, conf) {
                        $scope.alert.show = true;
                        $scope.alert.type = 'danger';
                    })
                }
            }
        ]);
;