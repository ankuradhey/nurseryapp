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

        .controller('subscriptionController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
                $scope.alert = {type: 'danger', show: false, message: 'Oops! Some error occurred.'};
                $scope.schools = schools.data.schools;
                $state;
                
        }]);