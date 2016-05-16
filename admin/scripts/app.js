'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
var app = angular
        .module('sbAdminApp', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'ngFileUpload'
])
        .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, schoolService) {

        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
        });

        $urlRouterProvider.otherwise('/dashboard/home');

        $stateProvider
                .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard/main.html',
            resolve: {
                loadMyDirectives: function($ocLazyLoad) {
                    return $ocLazyLoad.load(
                            {
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/directives/header/header.js',
                                    'scripts/directives/header/header-notification/header-notification.js',
                                    'scripts/directives/sidebar/sidebar.js',
                                    'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                                ]
                            }),
                    $ocLazyLoad.load(
                            {
                                name: 'toggle-switch',
                                files: ["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                                    "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                                ]
                            }),
                    $ocLazyLoad.load(
                            {
                                name: 'ngAnimate',
                                files: ['bower_components/angular-animate/angular-animate.js']
                            })
                    $ocLazyLoad.load(
                            {
                                name: 'ngCookies',
                                files: ['bower_components/angular-cookies/angular-cookies.js']
                            })
                    $ocLazyLoad.load(
                            {
                                name: 'ngResource',
                                files: ['bower_components/angular-resource/angular-resource.js']
                            })
                    $ocLazyLoad.load(
                            {
                                name: 'ngSanitize',
                                files: ['bower_components/angular-sanitize/angular-sanitize.js']
                            })
                    $ocLazyLoad.load(
                            {
                                name: 'ngTouch',
                                files: ['bower_components/angular-touch/angular-touch.js']
                            })
                }
            }
        })
                .state('dashboard.home', {
            url: '/home',
            controller: 'MainCtrl',
            templateUrl: 'views/dashboard/home.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/main.js',
                            'scripts/directives/timeline/timeline.js',
                            'scripts/directives/notifications/notifications.js',
                            'scripts/directives/chat/chat.js',
                            'scripts/directives/dashboard/stats/stats.js'
                        ]
                    })
                }
            }
        })
                .state('dashboard.form', {
            templateUrl: 'views/form.html',
            url: '/form'
        })
                .state('dashboard.blank', {
            templateUrl: 'views/pages/blank.html',
            url: '/blank'
        })
                .state('login', {
            templateUrl: 'views/pages/login.html',
            url: '/login'
        })
                .state('dashboard.chart', {
            templateUrl: 'views/chart.html',
            url: '/chart',
            controller: 'ChartCtrl',
            resolve: {
                loadMyFile: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'chart.js',
                        files: [
                            'bower_components/angular-chart.js/dist/angular-chart.min.js',
                            'bower_components/angular-chart.js/dist/angular-chart.css'
                        ]
                    }),
                    $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: ['scripts/controllers/chartContoller.js']
                    })
                }
            }
        })
                .state('dashboard.table', {
            templateUrl: 'views/table.html',
            url: '/table'
        })
                .state('dashboard.panels-wells', {
            templateUrl: 'views/ui-elements/panels-wells.html',
            url: '/panels-wells'
        })
                .state('dashboard.buttons', {
            templateUrl: 'views/ui-elements/buttons.html',
            url: '/buttons'
        })
                .state('dashboard.notifications', {
            templateUrl: 'views/ui-elements/notifications.html',
            url: '/notifications'
        })
                .state('dashboard.typography', {
            templateUrl: 'views/ui-elements/typography.html',
            url: '/typography'
        })
                .state('dashboard.icons', {
            templateUrl: 'views/ui-elements/icons.html',
            url: '/icons'
        })
                .state('dashboard.grid', {
            templateUrl: 'views/ui-elements/grid.html',
            url: '/grid'
        })
                .state('dashboard.schools', {
            url: '/schools',
            controller: 'SchoolCtrl',
            templateUrl: 'views/schools/list.html',
            resolve: {
                schools: function(schoolService) {
                    console.log('inside schools');
                    return schoolService.getSchools();
                },
                loadMyFiles: function($ocLazyLoad) {

                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/schoolController.js',
                            'scripts/services/schoolService.js',
                        ]
                    })
                }
            }
        })
                .state('dashboard.addschool', {
            url: '/addschool',
            controller: 'SchoolAddCtrl',
            templateUrl: 'views/schools/addschool.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/schoolController.js',
                            'scripts/directives/datepicker/datepicker.js'
//              'scripts/services/schoolService.js',
                        ]
                    })
                },
                boards: function(schoolService) {
                    return  schoolService.getBoards()
                },
                countries: function(schoolService) {
                    return schoolService.getCountries();
                }
            }
        })
                .state('dashboard.editschool', {
            url: '/editschool/:schoolId',
            controller: 'SchoolAddCtrl',
            templateUrl: 'views/schools/addschool.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/schoolController.js',
//              'scripts/services/schoolService.js',
                        ]
                    })
                },
                boards: function(schoolService) {
                    return  schoolService.getBoards()
                },
                countries: function(schoolService) {
                    return schoolService.getCountries();
                }
            }
        })
                .state('dashboard.boards', {
            url: '/boards',
            controller: 'boardController',
            templateUrl: 'views/boards/list.html',
            resolve: {
                boards: function(schoolService) {
                    return schoolService.getBoards();
                },
                loadMyFiles: function($ocLazyLoad) {

                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/boardController.js',
                            'scripts/services/schoolService.js',
                        ]
                    })
                }
            }
        }).state('dashboard.addboard', {
            url: '/addboard',
            controller: 'boardAddController',
            templateUrl: 'views/boards/addboard.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/boardController.js',
                        ]
                    })
                },
            }
        }).state('dashboard.editboard', {
            url: '/editboard/:boardId',
            controller: 'boardAddController',
            templateUrl: 'views/boards/addboard.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/boardController.js',
                        ]
                    })
                },
            }
        }).state('dashboard.countries', {
            url: '/countries',
            controller: 'countryController',
            templateUrl: 'views/location/countrylist.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/locationController.js',
                        ]
                    })
                },
                countries: function(schoolService) {
                    return schoolService.getCountries();
                }
            }
        })
                .state('dashboard.states', {
            url: '/states',
            controller: 'stateController',
            templateUrl: 'views/location/statelist.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/locationController.js',
                        ]
                    })
                },
                countries: function(schoolService) {
                    return schoolService.getCountries();
                }
            }
        })
                .state('dashboard.cities', {
            url: '/cities',
            controller: 'cityController',
            data: {collapseVar: 'location'},
            templateUrl: 'views/location/citylist.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/locationController.js',
                        ]
                    })
                }
            }
        })
                .state('dashboard.areas', {
            url: '/areas',
            controller: 'areaController',
            data: {collapseVar: 'location'},
            templateUrl: 'views/location/arealist.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/locationController.js',
                        ]
                    })
                }
            }
        })
                .state('dashboard.zones', {
            url: '/zones',
            data: {collapseVar: 'location'},
            controller: 'zoneController',
            templateUrl: 'views/location/zonelist.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/locationController.js',
                        ]
                    })
                }
            }
        })
                .state('dashboard.parents', {
            url: '/parents',
            data: {collapseVar: 'parent'},
            controller: 'parentController',
            templateUrl: 'views/parents/list.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/parentController.js',
                        ]
                    })
                }
            }
        })
                .state('dashboard.addparent', {
            url: '/addparent',
            data: {collapseVar: 'parent'},
            controller: 'parentAddController',
            templateUrl: 'views/parents/addparent.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/parentController.js',
                        ]
                    })
                }
            }
        })
                .state('dashboard.editparent', {
            url: '/editparent/:parentId',
            data: {collapseVar: 'parent'},
            controller: 'parentAddController',
            templateUrl: 'views/parents/addparent.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/parentController.js',
                        ]
                    })
                }
            }
        })
    }]);