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
        .controller('advertisementController', ['$scope', '$http', '$state', 'Upload' ,function($scope, $http, $state, Upload) {
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
        
        $scope.saveAdvertisement = function(){
            
        }
        
    }]);