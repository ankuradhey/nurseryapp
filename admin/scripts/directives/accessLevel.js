'use strict';

angular.module('sbAdminApp')  
.directive('accessLevel', ['$rootScope', 'authService', function($rootScope, authService) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var prevDisp = element.css('display');
            $rootScope.$watch('user.role', function(role) {
                if(!authService.authorize($rootScope.accessLevels[attrs.accessLevel]))
                    element.css('display', 'none');
                else
                    element.css('display', prevDisp);
            });
        }
    };
}]);