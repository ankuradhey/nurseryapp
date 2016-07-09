'use strict';

/**
 * @ngdoc function
 * @name sbAdminApp.controller:SchoolCtrl
 * @author AnkitS
 * @description
 * # SchoolCtrl
 * Controller of the sbAdminApp
 */

angular.module('sbAdminApp')
        .controller('advertisementController', ['$scope', '$http', '$state', 'Upload', function($scope, $http, $state, Upload) {
        $scope.alert = {type: 'danger', show: false, message: 'Oops! Some error occurred.'};



        $scope.uploadImage = function(file) {
            Upload.upload({
                url: baseUrl + '/upload',
                data: {file: file}
            }).then(function(resp) {
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data, resp);
                $scope.banner.img = resp.data.filename;
                var s = resp.data.filename;
                console.log(type, s, $scope.banner.img, resp.data.filename);
            }, function(resp) {
                console.log('Error status: ' + resp.status);
            }, function(evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                $scope.progress2 = 'progress: ' + progressPercentage + '% '; // capture upload progress
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        }

        $scope.saveAdvertisement = function() {

        }

    }])
        .controller('schoolAdvertisementController', ['$scope', '$http', '$state', 'Upload', function($scope, $http, $state, Upload) {
        $scope.alert = {type: 'danger', show: false, message: 'Oops! Some error occurred.'};

        $http({
            method: 'GET',
            url: baseUrl + '/adminapi/v1/school/advertisements',
            headers: {'Content-Type': 'application/json'}
        }).success(function(data, status, headers, conf) {
            if (data.success) {
                $scope.alert.message = data.message;
                $scope.alert.show = true;
                $scope.alert.type = 'success';
                $scope.subscriptions = data.subscriptions;
            } else {
                $scope.alert.message = data.message;
                $scope.alert.show = true;
                $scope.alert.type = 'danger';
            }
        }).error(function(data, status, headers, conf) {
            $scope.alert.show = true;
            $scope.alert.type = 'danger';
        })


    }])
        .controller('addSchoolAdvertisementController', ['$scope', '$http', '$state', '$stateParams', 'Upload', 'schools', 'advertisements', function($scope, $http, $state, $stateParams, Upload, schools, advertisements) {
        $scope.alert = {type: 'danger', show: false, message: 'Oops! Some error occurred.'};
        $scope.schools = schools.data.schools;
        $scope.advertisementTypes = advertisements.data.advertisements;
        $scope.schoolSubscriptionId = $stateParams.schoolSubscriptionId;


        if ($scope.schoolSubscriptionId) {
            $http({
                method: 'GET',
                url: baseUrl + '/adminapi/v1/school/advertisements/' + $scope.schoolSubscriptionId,
                headers: {'Content-Type': 'application/json'}
            }).success(function(data, status, headers, conf) {
                if (data.success) {
                    $scope.alert.message = data.message;
                    $scope.alert.show = true;
                    $scope.alert.type = 'success';
                    $scope.plan = data.subscription;
                    $scope.plan.school = {school_name:data.subscription.school_name,school_id:data.subscription.school_id};
                    $scope.plan.plan_type = {plan_id:data.subscription.plan_id,school_id:data.subscription.plan_name};
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

        $scope.saveSchoolAdvertisement = function() {

            $scope.$broadcast('show-errors-check-validity');
            if ($scope.bannerForm.$invalid) {
                return;
            }
            var data = {
                subscription_plan_id:$scope.plan.plan_type.plan_id,
                subscription_school_id:$scope.plan.school.school_id,
                subscription_status:"1",
            };

            if ($scope.schoolSubscriptionId) {
                var url = baseUrl + '/adminapi/v1/school/advertisement/' + $scope.schoolSubscriptionId;
                var method = 'PUT';
            } else {
                var url = baseUrl + '/adminapi/v1/school/advertisement';
                var method = 'POST';
            }
            
            if($scope.plan.subscription_img){
                data.subscription_img = $scope.plan.subscription_img;
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
                    $state.go('dashboard.schooladvertisements');
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


        $scope.uploadImage = function(file) {
            Upload.upload({
                url: baseUrl + '/upload/advertisements',
                data: {file: file}
            }).then(function(resp) {
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data, resp);
                $scope.plan.subscription_img = resp.data.filename;
                var s = resp.data.filename;
                console.log(type, s, $scope.banner.img, resp.data.filename);
            }, function(resp) {
                console.log('Error status: ' + resp.status);
            }, function(evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                $scope.progress2 = 'progress: ' + progressPercentage + '% '; // capture upload progress
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        }

    }]);