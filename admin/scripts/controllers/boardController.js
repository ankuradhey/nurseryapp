'use strict';

/**
 * @ngdoc function
 * @name sbAdminApp.controller:boardController
 * @author AnkitS
 * @description
 * # SchoolCtrl
 * Controller of the sbAdminApp
 */

angular.module('sbAdminApp')

        .controller('boardController', ['$scope', '$http', 'boards', '$state', '$timeout', function($scope, $http, boards, $state, $timeout) {
        $scope.alert = {type: 'danger', show: false, message: 'Oops! Some error occurred.'};
        $scope.boards = boards.data.boards;

        $scope.deleteSchool = function(boardId) {
            
            var s = confirm("Are you sure you want to delete this board?");
            if (!s)
                return;
            
            $http({
                method: 'DELETE',
                url: baseUrl + '/adminapi/v1/board/' + boardId,
                headers: {'Content-Type': 'application/json'}
            }).success(function(data, status, headers, conf) {
                if (data.success) {
                    $scope.alert.message = data.message;
                    $scope.alert.show = true;
                    $scope.alert.type = 'success';
                    $timeout(function() {
                        $state.reload();
                    }, 1000, false);

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

    }]).controller('boardAddController', ['$rootScope', '$scope', '$http', '$stateParams','$state', function($rootScope, $scope, $http, $stateParams, $state) {
        $scope.alert = {type: 'danger', show: false, message: 'Oops! Some error occurred.'};
        $scope.boardId = $stateParams.boardId;
        $scope.board = {name:''};
        if ($scope.boardId) {
            $http({
                method: 'GET',
                url: baseUrl + '/adminapi/v1/board/' + $scope.boardId
            }).success(function(data, status, headers, conf) {
                $scope.board.name = data.board.board_name;
            }).error(function(data, status, headers, conf) {
                $scope.alert.show = true;
                $scope.alert.type = 'danger';
            });
        }


        $scope.saveBoard = function() {
            $scope.$broadcast('show-errors-check-validity');
            if ($scope.boardForm.$invalid) {
                return;
            }
            var data = {
                board_name: $scope.board.name,
            }

            if ($scope.boardId) {
                var url = baseUrl + '/adminapi/v1/board/' + $scope.boardId;
                var method = 'PUT';
            } else {
                var url = baseUrl + '/adminapi/v1/board';
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
                    $state.go('dashboard.boards');
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