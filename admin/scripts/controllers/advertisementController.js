'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:advertisementController
 * @author AnkitS
 * @description
 * # SchoolCtrl
 * Controller of the sbAdminApp
 */

angular.module('sbAdminApp')
        .controller('advertisementController', ['$scope', '$http', '$state', 'Upload', function ($scope, $http, $state, Upload) {
                $scope.alert = {type: 'danger', show: false, message: 'Oops! Some error occurred.'};
                $scope.uploadImage = function (file) {
                    Upload.upload({
                        url: baseUrl + '/upload',
                        data: {file: file}
                    }).then(function (resp) {
                        console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data, resp);
                        $scope.banner.img = resp.data.filename;
                        var s = resp.data.filename;
                        console.log(type, s, $scope.banner.img, resp.data.filename);
                    }, function (resp) {
                        console.log('Error status: ' + resp.status);
                    }, function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        $scope.progress2 = 'progress: ' + progressPercentage + '% '; // capture upload progress
                        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                    });
                }

                $scope.saveAdvertisement = function () {

                }

            }])
        .controller('schoolAdvertisementController', ['$scope', '$http', '$state', 'Upload', function ($scope, $http, $state, Upload) {
                $scope.alert = {type: 'danger', show: false, message: 'Oops! Some error occurred.'};
                $http({
                    method: 'GET',
                    url: baseUrl + '/adminapi/v1/school/advertisements',
                    headers: {'Content-Type': 'application/json'}
                }).success(function (data, status, headers, conf) {
                    if (data.success) {
                        $scope.subscriptions = data.subscriptions;
                    } else {
                        $scope.alert.message = data.message;
                        $scope.alert.show = true;
                        $scope.alert.type = 'danger';
                    }
                }).error(function (data, status, headers, conf) {
                    $scope.alert.show = true;
                    $scope.alert.type = 'danger';
                })


            }])
        .controller('addSchoolAdvertisementController', ['$scope', '$http', '$state', '$stateParams', 'Upload', 'schools', 'advertisements', '$filter', function ($scope, $http, $state, $stateParams, Upload, schools, advertisements, $filter) {
                $scope.alert = {type: 'danger', show: false, message: 'Oops! Some error occurred.'};
                $scope.advertisementTypes = advertisements.data.advertisements;
                $scope.schoolSubscriptionId = $stateParams.schoolSubscriptionId;
                $scope.plan = {};
                $scope.subscriptions = [];
                $scope.getSubscriptions = function () {

                    return $http.get(baseUrl + '/adminapi/v1/school/advertisements', {'Content-Type': 'application/json'});
                }

                if ($scope.schoolSubscriptionId) {
                    $http({
                        method: 'GET',
                        url: baseUrl + '/adminapi/v1/school/advertisements/' + $scope.schoolSubscriptionId,
                        headers: {'Content-Type': 'application/json'}
                    }).success(function (data, status, headers, conf) {
                        if (data.success) {
                            $scope.getSubscriptions().then(function (_data) {
                                if (_data.data.success) {
                                    console.log(data);
                                    
                                    $scope.subscriptions = _data.data.subscriptions;
                                    $scope.schools = schools.data.schools;
                                    $scope.plan = data.subscription;
                                    $scope.plan.school = {school_name: data.subscription.school_name, school_id: data.subscription.school_id};
                                    $scope.plan.plan_type = {plan_id: data.subscription.plan_id, school_id: data.subscription.plan_name, plan_duration: data.subscription.plan_duration};
                                    if (data.subscription.subscription_start_date && Object.prototype.toString.call(new Date(data.subscription.subscription_start_date)) == '[object Date]' && !isNaN((new Date(data.subscription.subscription_start_date)).getTime())) {
                                        $scope.plan.subscription_start_date = new Date(data.subscription.subscription_start_date);
                                        $scope.plan.subscription_end_date = new Date(data.subscription.subscription_end_date);
                                    } else {
                                        $scope.plan.subscription_end_date = $scope.plan.subscription_start_date = null;
                                        console.log('subscription start date - ', $scope.plan.subscription_start_date);
                                        console.warn("either date not valid or empty");
                                    }
                                } else {
                                    $scope.alert.message = data.message;
                                    $scope.alert.show = true;
                                    $scope.alert.type = 'danger';
                                }
                            }, function (data) {
                                $scope.alert.message = data.message;
                                $scope.alert.show = true;
                                $scope.alert.type = 'danger';
                            });
                            console.log($scope.plan.subscription_end_date);
                        } else {
                            $scope.alert.message = data.message;
                            $scope.alert.show = true;
                            $scope.alert.type = 'danger';
                        }
                    }).error(function (data, status, headers, conf) {
                        $scope.alert.show = true;
                        $scope.alert.type = 'danger';
                    })


                } else {
                    $scope.getSubscriptions().then(function (data) {
                        $scope.schools = schools.data.schools;
                    });
                }

                $scope.saveSchoolAdvertisement = function () {

                    $scope.$broadcast('show-errors-check-validity');
                    if ($scope.bannerForm.$invalid) {
                        return;
                    }
                    var data = {
                        subscription_plan_id: $scope.plan.plan_type.plan_id,
                        subscription_school_id: $scope.plan.school.school_id,
                        subscription_status: "1",
                        subscription_start_date: $filter('date')($scope.plan.subscription_start_date, 'yyyy-MM-dd'),
                        subscription_end_date: $filter('date')($scope.plan.subscription_end_date, 'yyyy-MM-dd'),
                        subscription_link: $scope.plan.subscription_link
                    };
                    console.log(data);
                    if ($scope.schoolSubscriptionId) {
                        var url = baseUrl + '/adminapi/v1/school/advertisement/' + $scope.schoolSubscriptionId;
                        var method = 'PUT';
                    } else {
                        var url = baseUrl + '/adminapi/v1/school/advertisement';
                        var method = 'POST';
                    }

                    if ($scope.plan.subscription_img) {
                        data.subscription_img = $scope.plan.subscription_img;
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
                            $scope.$broadcast('show-errors-reset');
                            $state.go('dashboard.schooladvertisements');
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


                $scope.uploadImage = function (file) {
                    Upload.upload({
                        url: baseUrl + '/upload/advertisements',
                        data: {file: file}
                    }).then(function (resp) {
                        console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data, resp);
                        $scope.plan.subscription_img = resp.data.filename;
                        var s = resp.data.filename;
                        console.log(type, s, $scope.banner.img, resp.data.filename);
                    }, function (resp) {
                        console.log('Error status: ' + resp.status);
                    }, function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        $scope.progress2 = 'progress: ' + progressPercentage + '% '; // capture upload progress
                        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                    });
                }


                //date picker code
                $scope.open1 = function () {
                    $scope.popup1.opened = true;
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

                function setSubscriptionEndDate(newValue, oldValue) {
                    if (newValue != oldValue) {
                        if ($scope.plan.plan_type && Object.prototype.toString.call($scope.plan.subscription_start_date) == "[object Date]" && !isNaN((new Date($scope.plan.subscription_start_date)).getTime())) {
                            $scope.plan.subscription_end_date = new Date($scope.plan.subscription_start_date.getTime());
                            $scope.plan.subscription_end_date.setMonth($scope.plan.subscription_end_date.getMonth() + $scope.plan.plan_type.plan_duration);
                        }
                    }
                }

                $scope.$watch('plan.subscription_start_date', setSubscriptionEndDate);
                $scope.$watch('plan.plan_type', setSubscriptionEndDate);
                $scope.filterSubscribedSchools = function (item1) {
                    var retFlag = true;
                    $scope.subscriptions.forEach(function (value, item) {
                        if (value.school_id == item1.school_id && item1.school_id != $scope.plan.school.school_id) {
                            retFlag = false;
                        }
                    });
                    return retFlag;
                }
            }]);