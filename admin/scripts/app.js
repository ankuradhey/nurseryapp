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
        .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, schoolService) {

                $ocLazyLoadProvider.config({
                    debug: false,
                    events: true,
                });

                $urlRouterProvider.otherwise('/dashboard/home');

                var access = routingConfig.accessLevels;

                $stateProvider
                        .state('dashboard', {
                            url: '/dashboard',
                            access: access.school,
                            templateUrl: 'views/dashboard/main.html',
                            resolve: {
                                auth: function ($q, authService) {
                                    var userInfo = authService.getUserInfo();
                                    console.log('access.school - value - ' + access.school, authService.authorize(access.school))
                                    if (userInfo && authService.authorize(access.school)) {
                                        return $q.when(userInfo);
                                    } else {
                                        return $q.reject({authenticated: false});
                                    }
                                },
                                loadMyDirectives: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(
                                            {
                                                name: 'sbAdminApp',
                                                files: [
                                                    'scripts/directives/accessLevel.js',
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
                            access: access.user,
                            controller: 'MainCtrl',
                            templateUrl: 'views/dashboard/home.html',
                            resolve: {
                                auth: function ($q, authService) {
                                    var userInfo = authService.getUserInfo();
                                    console.log('access.school - value - ' + access.school, authService.authorize(access.school))
                                    if (userInfo && authService.authorize(access.school)) {
                                        return $q.when(userInfo);
                                    } else {
                                        return $q.reject({authenticated: false});
                                    }
                                },
                                loadMyFiles: function ($ocLazyLoad) {
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
                        .state('dashboard.chart', {
                            templateUrl: 'views/chart.html',
                            url: '/chart',
                            controller: 'ChartCtrl',
                            resolve: {
                                loadMyFile: function ($ocLazyLoad) {
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
                            access: access.admin,
                            controller: 'SchoolCtrl',
                            templateUrl: 'views/schools/list.html',
                            resolve: {
                                auth: function ($q, authService) {
                                    var userInfo = authService.getUserInfo();
                                    console.log(authService, userInfo);
                                    if (userInfo && authService.authorize(access.admin)) {
                                        return $q.when(userInfo);
                                    } else {
                                        return $q.reject({authenticated: false});
                                    }
                                },
                                schools: function (schoolService) {
                                    console.log('inside schools');
                                    return schoolService.getSchools();
                                },
                                loadMyFiles: function ($ocLazyLoad) {

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
                            access: access.admin,
                            controller: 'SchoolAddCtrl',
                            templateUrl: 'views/schools/addschool.html',
                            resolve: {
                                auth: function ($q, authService) {
                                    var userInfo = authService.getUserInfo();
                                    if (userInfo && authService.authorize(access.admin)) {
                                        return $q.when(userInfo);
                                    } else {
                                        return $q.reject({authenticated: false});
                                    }
                                },
                                loadMyFiles: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'sbAdminApp',
                                        files: [
                                            'scripts/controllers/schoolController.js',
                                            'scripts/directives/datepicker/datepicker.js',
                                            'scripts/directives/formvalidation.js'
//              'scripts/services/schoolService.js',
                                        ]
                                    })
                                },
                                boards: function (schoolService) {
                                    return  schoolService.getBoards()
                                },
                                countries: function (schoolService) {
                                    return schoolService.getCountries();
                                },
                                schoolType: function (schoolService) {
                                    return schoolService.getSchoolTypes();
                                },
                                medium: function(schoolService){
                                    return schoolService.getMediums();
                                }
                            }
                        })
                        .state('dashboard.editschool', {
                            url: '/editschool/:schoolId',
                            access: access.admin,
                            controller: 'SchoolAddCtrl',
                            templateUrl: 'views/schools/addschool.html',
                            resolve: {
                                auth: function ($q, authService) {
                                    var userInfo = authService.getUserInfo();
                                    if (userInfo && authService.authorize(access.admin)) {
                                        return $q.when(userInfo);
                                    } else {
                                        return $q.reject({authenticated: false});
                                    }
                                },
                                loadMyFiles: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'sbAdminApp',
                                        files: [
                                            'scripts/controllers/schoolController.js',
//              'scripts/services/schoolService.js',
                                        ]
                                    })
                                },
                                boards: function (schoolService) {
                                    return  schoolService.getBoards()
                                },
                                countries: function (schoolService) {
                                    return schoolService.getCountries();
                                },
                                schoolType: function (schoolService) {
                                    return schoolService.getSchoolTypes();
                                },
                                medium: function(schoolService){
                                    return schoolService.getMediums();
                                }
                            }
                        })
                        .state('dashboard.boards', {
                            url: '/boards',
                            access: access.admin,
                            controller: 'boardController',
                            templateUrl: 'views/boards/list.html',
                            resolve: {
                                auth: function ($q, authService) {
                                    var userInfo = authService.getUserInfo();
                                    if (userInfo && authService.authorize(access.admin)) {
                                        return $q.when(userInfo);
                                    } else {
                                        return $q.reject({authenticated: false});
                                    }
                                },
                                boards: function (schoolService) {
                                    return schoolService.getBoards();
                                },
                                loadMyFiles: function ($ocLazyLoad) {

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
                    access: access.admin,
                    controller: 'boardAddController',
                    templateUrl: 'views/boards/addboard.html',
                    resolve: {
                        auth: function ($q, authService) {
                            var userInfo = authService.getUserInfo();
                            if (userInfo && authService.authorize(access.admin)) {
                                return $q.when(userInfo);
                            } else {
                                return $q.reject({authenticated: false});
                            }
                        },
                        loadMyFiles: function ($ocLazyLoad) {
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
                    access: access.admin,
                    controller: 'boardAddController',
                    templateUrl: 'views/boards/addboard.html',
                    resolve: {
                        auth: function ($q, authService) {
                            var userInfo = authService.getUserInfo();
                            if (userInfo && authService.authorize(access.admin)) {
                                return $q.when(userInfo);
                            } else {
                                return $q.reject({authenticated: false});
                            }
                        },
                        loadMyFiles: function ($ocLazyLoad) {
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
                    access: access.admin,
                    controller: 'countryController',
                    templateUrl: 'views/location/countrylist.html',
                    resolve: {
                        auth: function ($q, authService) {
                            var userInfo = authService.getUserInfo();
                            if (userInfo && authService.authorize(access.admin)) {
                                return $q.when(userInfo);
                            } else {
                                return $q.reject({authenticated: false});
                            }
                        },
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/controllers/locationController.js',
                                ]
                            })
                        },
                        countries: function (schoolService) {
                            return schoolService.getCountries();
                        }
                    }
                }).state('dashboard.editcountry', {
                    url: '/editcountry/:countryId',
                    access: access.admin,
                    controller: 'countryAddController',
                    templateUrl: 'views/location/addcountry.html',
                    resolve: {
                        auth: function ($q, authService) {
                            var userInfo = authService.getUserInfo();
                            if (userInfo && authService.authorize(access.admin)) {
                                return $q.when(userInfo);
                            } else {
                                return $q.reject({authenticated: false});
                            }
                        },
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/controllers/locationController.js',
                                ]
                            })
                        }
                    }
                }).state('dashboard.editstate', {
                    url: '/editstate/:stateId',
                    access: access.admin,
                    controller: 'stateAddController',
                    templateUrl: 'views/location/addstate.html',
                    resolve: {
                        auth: function ($q, authService) {
                            var userInfo = authService.getUserInfo();
                            if (userInfo && authService.authorize(access.admin)) {
                                return $q.when(userInfo);
                            } else {
                                return $q.reject({authenticated: false});
                            }
                        },
                        countries: function (schoolService) {
                            return schoolService.getCountries();
                        },
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/controllers/locationController.js',
                                ]
                            })
                        }
                    }
                }).state('dashboard.addstate', {
                    url: '/addstate',
                    access: access.admin,
                    controller: 'stateAddController',
                    templateUrl: 'views/location/addstate.html',
                    resolve: {
                        auth: function ($q, authService) {
                            var userInfo = authService.getUserInfo();
                            if (userInfo && authService.authorize(access.admin)) {
                                return $q.when(userInfo);
                            } else {
                                return $q.reject({authenticated: false});
                            }
                        },
                        countries: function (schoolService) {
                            return schoolService.getCountries();
                        },
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/controllers/locationController.js',
                                ]
                            })
                        }
                    }
                }).state('dashboard.addcountry', {
                    url: '/addcountry',
                    access: access.admin,
                    controller: 'countryAddController',
                    templateUrl: 'views/location/addcountry.html',
                    resolve: {
                        auth: function ($q, authService) {
                            var userInfo = authService.getUserInfo();
                            if (userInfo && authService.authorize(access.admin)) {
                                return $q.when(userInfo);
                            } else {
                                return $q.reject({authenticated: false});
                            }
                        },
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/controllers/locationController.js',
                                ]
                            })
                        }
                    }
                })
                        .state('dashboard.states', {
                            url: '/states',
                            access: access.admin,
                            controller: 'stateController',
                            templateUrl: 'views/location/statelist.html',
                            resolve: {
                                auth: function ($q, authService) {
                                    var userInfo = authService.getUserInfo();
                                    if (userInfo && authService.authorize(access.admin)) {
                                        return $q.when(userInfo);
                                    } else {
                                        return $q.reject({authenticated: false});
                                    }
                                },
                                loadMyFiles: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'sbAdminApp',
                                        files: [
                                            'scripts/controllers/locationController.js',
                                        ]
                                    })
                                },
                                countries: function (schoolService) {
                                    return schoolService.getCountries();
                                }
                            }
                        })
                        .state('dashboard.cities', {
                            url: '/cities',
                            access: access.admin,
                            controller: 'cityController',
                            data: {collapseVar: 'location'},
                            templateUrl: 'views/location/citylist.html',
                            resolve: {
                                auth: function ($q, authService) {
                                    var userInfo = authService.getUserInfo();
                                    if (userInfo && authService.authorize(access.admin)) {
                                        return $q.when(userInfo);
                                    } else {
                                        return $q.reject({authenticated: false});
                                    }
                                },
                                loadMyFiles: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'sbAdminApp',
                                        files: [
                                            'scripts/controllers/locationController.js',
                                        ]
                                    })
                                }
                            }
                        }).state('dashboard.addcity', {
                    url: '/addcity',
                    access: access.admin,
                    controller: 'cityAddController',
                    templateUrl: 'views/location/addcity.html',
                    resolve: {
                        auth: function ($q, authService) {
                            var userInfo = authService.getUserInfo();
                            if (userInfo && authService.authorize(access.admin)) {
                                return $q.when(userInfo);
                            } else {
                                return $q.reject({authenticated: false});
                            }
                        },
                        states: function (schoolService) {
                            return schoolService.getStates();
                        },
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/controllers/locationController.js',
                                ]
                            })
                        }
                    }
                        }).state('dashboard.editcity', {
                    url: '/editcity/:cityId',
                    access: access.admin,
                    controller: 'cityAddController',
                    templateUrl: 'views/location/addcity.html',
                    resolve: {
                        auth: function ($q, authService) {
                            var userInfo = authService.getUserInfo();
                            if (userInfo && authService.authorize(access.admin)) {
                                return $q.when(userInfo);
                            } else {
                                return $q.reject({authenticated: false});
                            }
                        },
                        states: function (schoolService) {
                            return schoolService.getStates();
                        },
                        loadMyFiles: function ($ocLazyLoad) {
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
                            access: access.admin,
                            controller: 'areaController',
                            data: {collapseVar: 'location'},
                            templateUrl: 'views/location/arealist.html',
                            resolve: {
                                auth: function ($q, authService) {
                                    var userInfo = authService.getUserInfo();
                                    if (userInfo && authService.authorize(access.admin)) {
                                        return $q.when(userInfo);
                                    } else {
                                        return $q.reject({authenticated: false});
                                    }
                                },
                                loadMyFiles: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'sbAdminApp',
                                        files: [
                                            'scripts/controllers/locationController.js',
                                        ]
                                    })
                                }
                            }
                        })
                        .state('dashboard.addarea', {
                            url: '/addarea',
                            access: access.admin,
                            controller: 'areaAddController',
                            data: {collapseVar: 'location'},
                            templateUrl: 'views/location/addarea.html',
                            resolve: {
                                auth: function ($q, authService) {
                                    var userInfo = authService.getUserInfo();
                                    if (userInfo && authService.authorize(access.admin)) {
                                        return $q.when(userInfo);
                                    } else {
                                        return $q.reject({authenticated: false});
                                    }
                                },
                                cities:function(schoolService){
                                    return schoolService.getCities();
                                },
                                loadMyFiles: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'sbAdminApp',
                                        files: [
                                            'scripts/controllers/locationController.js',
                                        ]
                                    })
                                }
                            }
                        })
                        .state('dashboard.editarea', {
                            url: '/editarea/:areaId',
                            access: access.admin,
                            controller: 'areaAddController',
                            data: {collapseVar: 'location'},
                            templateUrl: 'views/location/addarea.html',
                            resolve: {
                                auth: function ($q, authService) {
                                    var userInfo = authService.getUserInfo();
                                    if (userInfo && authService.authorize(access.admin)) {
                                        return $q.when(userInfo);
                                    } else {
                                        return $q.reject({authenticated: false});
                                    }
                                },
                                cities:function(schoolService){
                                    return schoolService.getCities();
                                },
                                loadMyFiles: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'sbAdminApp',
                                        files: [
                                            'scripts/controllers/locationController.js',
                                        ]
                                    })
                                }
                            }
                        })
                        .state('dashboard.addzone', {
                            url: '/addzone',
                            access: access.admin,
                            controller: 'zoneAddController',
                            data: {collapseVar: 'location'},
                            templateUrl: 'views/location/addzone.html',
                            resolve: {
                                auth: function ($q, authService) {
                                    var userInfo = authService.getUserInfo();
                                    if (userInfo && authService.authorize(access.admin)) {
                                        return $q.when(userInfo);
                                    } else {
                                        return $q.reject({authenticated: false});
                                    }
                                },
                                areas:function(schoolService){
                                    return schoolService.getAreas();
                                },
                                loadMyFiles: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'sbAdminApp',
                                        files: [
                                            'scripts/controllers/locationController.js',
                                        ]
                                    })
                                }
                            }
                        })
                        .state('dashboard.editzone', {
                            url: '/editzone/:zoneId',
                            access: access.admin,
                            controller: 'zoneAddController',
                            data: {collapseVar: 'location'},
                            templateUrl: 'views/location/addzone.html',
                            resolve: {
                                auth: function ($q, authService) {
                                    var userInfo = authService.getUserInfo();
                                    if (userInfo && authService.authorize(access.admin)) {
                                        return $q.when(userInfo);
                                    } else {
                                        return $q.reject({authenticated: false});
                                    }
                                },
                                areas:function(schoolService){
                                    return schoolService.getAreas();
                                },
                                loadMyFiles: function ($ocLazyLoad) {
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
                            access: access.admin,
                            data: {collapseVar: 'location'},
                            controller: 'zoneController',
                            templateUrl: 'views/location/zonelist.html',
                            resolve: {
                                auth: function ($q, authService) {
                                    var userInfo = authService.getUserInfo();
                                    if (userInfo && authService.authorize(access.admin)) {
                                        return $q.when(userInfo);
                                    } else {
                                        return $q.reject({authenticated: false});
                                    }
                                },
                                loadMyFiles: function ($ocLazyLoad) {
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
                            access: access.admin,
                            data: {collapseVar: 'parent'},
                            controller: 'parentController',
                            templateUrl: 'views/parents/list.html',
                            resolve: {
                                auth: function ($q, authService) {
                                    var userInfo = authService.getUserInfo();
                                    if (userInfo && authService.authorize(access.admin)) {
                                        return $q.when(userInfo);
                                    } else {
                                        return $q.reject({authenticated: false});
                                    }
                                },
                                loadMyFiles: function ($ocLazyLoad) {
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
                            access: access.admin,
                            data: {collapseVar: 'parent'},
                            controller: 'parentAddController',
                            templateUrl: 'views/parents/addparent.html',
                            resolve: {
                                auth: function ($q, authService) {
                                    var userInfo = authService.getUserInfo();
                                    if (userInfo && authService.authorize(access.admin)) {
                                        return $q.when(userInfo);
                                    } else {
                                        return $q.reject({authenticated: false});
                                    }
                                },
                                loadMyFiles: function ($ocLazyLoad) {
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
                            access: access.admin,
                            data: {collapseVar: 'parent'},
                            controller: 'parentAddController',
                            templateUrl: 'views/parents/addparent.html',
                            resolve: {
                                auth: function ($q, authService) {
                                    var userInfo = authService.getUserInfo();
                                    if (userInfo && authService.authorize(access.admin)) {
                                        return $q.when(userInfo);
                                    } else {
                                        return $q.reject({authenticated: false});
                                    }
                                },
                                loadMyFiles: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'sbAdminApp',
                                        files: [
                                            'scripts/controllers/parentController.js',
                                        ]
                                    })
                                }
                            }
                        })
                        .state('dashboard.profile', {
                            url: '/profile/:parentId',
                            access: access.admin,
                            data: {collapseVar: 'parent'},
                            controller: 'parentAddController',
                            templateUrl: 'views/pages/profile.html',
                            resolve: {
                                auth: function ($q, authService) {
                                    var userInfo = authService.getUserInfo();
                                    if (userInfo && authService.authorize(access.admin)) {
                                        return $q.when(userInfo);
                                    } else {
                                        return $q.reject({authenticated: false});
                                    }
                                },
                                loadMyFiles: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'sbAdminApp',
                                        files: [
                                            'scripts/controllers/parentController.js',
                                        ]
                                    })
                                }
                            }
                        })
                        .state('login', {
                            url: '/login',
                            controller: 'loginController',
                            access: access.anon,
                            templateUrl: 'views/pages/login.html',
                            resolve: {
                                auth: function ($q, authService) {
                                    var userInfo = authService.getUserInfo();
                                    if (userInfo) {
                                        return $q.reject({authenticated: true});
                                    } else {
                                        return $q.when();
                                    }
                                },
                                loadMyFiles: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'sbAdminApp',
                                        files: [
                                            'scripts/controllers/loginController.js',
                                        ]
                                    })
                                }
                            }
                        })
                        .state('register', {
                            url: '/register',
                            controller: 'SchoolAddCtrl',
                            access: access.anon,
                            templateUrl: 'views/pages/register.html',
                            resolve: {
                                auth: function ($q, authService) {
                                    var userInfo = authService.getUserInfo();
                                    if (userInfo) {
                                        return $q.reject({authenticated: true});
                                    } else {
                                        return $q.when();
                                    }
                                },
                                loadMyFiles: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'sbAdminApp',
                                        files: [
                                            'scripts/controllers/schoolController.js',
//              'scripts/services/schoolService.js',
                                        ]
                                    })
                                },
                                boards: function (schoolService) {
                                    return  schoolService.getBoards()
                                },
                                countries: function (schoolService) {
                                    return schoolService.getCountries();
                                },
                                schoolType: function (schoolService) {
                                    return schoolService.getSchoolTypes();
                                }
                            }
                        })
                        .state('dashboard.subscription', {
                            url: '/subscription',
                            access: access.admin,
                            data: {collapseVar: 'school'},
                            controller: 'subscriptionController',
                            templateUrl: 'views/subscription/list.html',
                            resolve: {
                                auth: function ($q, authService) {
                                    var userInfo = authService.getUserInfo();
                                    if (userInfo && authService.authorize(access.school)) {
                                        return $q.when(userInfo);
                                    } else {
                                        return $q.reject({authenticated: false});
                                    }
                                },
                                loadMyFiles: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'sbAdminApp',
                                        files: [
                                            'scripts/controllers/subscriptionController.js',
                                        ]
                                    })
                                },
                                subscription:function(schoolService){
                                    return schoolService.getSubscriptions();
                                }
                            }
                        })
                        .state('dashboard.addsubscription', {
                            url: '/addsubscription/:subscriptionId',
                            data: {collapseVar: 'school'},
                            controller: 'subscriptionController',
                            templateUrl: 'views/subscription/addsubscription.html',
                            resolve: {
                                auth: function ($q, authService) {
                                    var userInfo = authService.getUserInfo();
                                    if (userInfo && authService.authorize(access.school)) {
                                        return $q.when(userInfo);
                                    } else {
                                        return $q.reject({authenticated: false});
                                    }
                                },
                                loadMyFiles: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'sbAdminApp',
                                        files: [
                                            'scripts/controllers/subscriptionController.js',
                                        ]
                                    })
                                },
                                subscription:function(schoolService){
                                    return schoolService.getSubscriptions();
                                }
                            }
                        })
                        .state('dashboard.reviews', {
                            url: '/reviews',
                            access: access.admin,
                            data: {collapseVar: 'school'},
                            controller: 'reviewController',
                            templateUrl: 'views/reviews/list.html',
                            resolve: {
                                auth: function ($q, authService) {
                                    var userInfo = authService.getUserInfo();
                                    if (userInfo && authService.authorize(access.admin)) {
                                        return $q.when(userInfo);
                                    } else {
                                        return $q.reject({authenticated: false});
                                    }
                                },
                                loadMyFiles: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'sbAdminApp',
                                        files: [
                                            'scripts/controllers/reviewController.js',
                                        ]
                                    })
                                }
                            }
                        })
                        .state('dashboard.schooltypes', {
                            url: '/schooltypes',
                            access: access.admin,
                            data: {collapseVar: 'school'},
                            controller: 'SchoolTypeCtrl',
                            templateUrl: 'views/schools/schooltypelist.html',
                            resolve: {
                                auth: function ($q, authService) {
                                    var userInfo = authService.getUserInfo();
                                    if (userInfo && authService.authorize(access.admin)) {
                                        return $q.when(userInfo);
                                    } else {
                                        return $q.reject({authenticated: false});
                                    }
                                },
                                loadMyFiles: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'sbAdminApp',
                                        files: [
                                            'scripts/controllers/schoolController.js',
                                        ]
                                    })
                                },
                                schoolTypes:function(schoolService){
                                    return schoolService.getSchoolTypes();
                                }
                            }
                        })
                        .state('dashboard.mediums', {
                            url: '/mediums',
                            access: access.admin,
                            data: {collapseVar: 'school'},
                            controller: 'mediumController',
                            templateUrl: 'views/schools/mediumlist.html',
                            resolve: {
                                auth: function ($q, authService) {
                                    var userInfo = authService.getUserInfo();
                                    if (userInfo && authService.authorize(access.admin)) {
                                        return $q.when(userInfo);
                                    } else {
                                        return $q.reject({authenticated: false});
                                    }
                                },
                                loadMyFiles: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'sbAdminApp',
                                        files: [
                                            'scripts/controllers/schoolController.js',
                                        ]
                                    })
                                },
                                medium: function(schoolService){
                                    return schoolService.getMediums();
                                }
                            }
                        })
                        .state('dashboard.addmedium', {
                            url: '/addmedium',
                            access: access.admin,
                            data: {collapseVar: 'school'},
                            controller: 'mediumAddController',
                            templateUrl: 'views/schools/addmedium.html',
                            resolve: {
                                auth: function ($q, authService) {
                                    var userInfo = authService.getUserInfo();
                                    if (userInfo && authService.authorize(access.admin)) {
                                        return $q.when(userInfo);
                                    } else {
                                        return $q.reject({authenticated: false});
                                    }
                                },
                                loadMyFiles: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'sbAdminApp',
                                        files: [
                                            'scripts/controllers/schoolController.js',
                                        ]
                                    })
                                }
                            }
                        })
                        .state('dashboard.editmedium', {
                            url: '/editmedium/:mediumId',
                            access: access.admin,
                            data: {collapseVar: 'school'},
                            controller: 'mediumAddController',
                            templateUrl: 'views/schools/addmedium.html',
                            resolve: {
                                auth: function ($q, authService) {
                                    var userInfo = authService.getUserInfo();
                                    if (userInfo && authService.authorize(access.admin)) {
                                        return $q.when(userInfo);
                                    } else {
                                        return $q.reject({authenticated: false});
                                    }
                                },
                                loadMyFiles: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'sbAdminApp',
                                        files: [
                                            'scripts/controllers/schoolController.js',
                                        ]
                                    })
                                }
                            }
                        })
                        .state('dashboard.editschooltype', {
                            url: '/editschooltype/:schoolTypeId',
                            access: access.admin,
                            data: {collapseVar: 'school'},
                            controller: 'SchoolTypeAddCtrl',
                            templateUrl: 'views/schools/schooltype.html',
                            resolve: {
                                auth: function ($q, authService) {
                                    var userInfo = authService.getUserInfo();
                                    if (userInfo && authService.authorize(access.admin)) {
                                        return $q.when(userInfo);
                                    } else {
                                        return $q.reject({authenticated: false});
                                    }
                                },
                                loadMyFiles: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'sbAdminApp',
                                        files: [
                                            'scripts/controllers/schoolController.js',
                                        ]
                                    })
                                },
                                classes:function(schoolService){
                                    return schoolService.getSchoolClasses();
                                }
                            }
                        })
                        .state('dashboard.addschooltype', {
                            url: '/addschooltype',
                            access: access.admin,
                            data: {collapseVar: 'school'},
                            controller: 'SchoolTypeAddCtrl',
                            templateUrl: 'views/schools/schooltype.html',
                            resolve: {
                                auth: function ($q, authService) {
                                    var userInfo = authService.getUserInfo();
                                    if (userInfo && authService.authorize(access.admin)) {
                                        return $q.when(userInfo);
                                    } else {
                                        return $q.reject({authenticated: false});
                                    }
                                },
                                loadMyFiles: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'sbAdminApp',
                                        files: [
                                            'scripts/controllers/schoolController.js',
                                        ]
                                    })
                                },
                                classes:function(schoolService){
                                    return schoolService.getSchoolClasses();
                                }
                            }
                        })
                        ;

                //when api denies requested resources then redirect to login - reason may be unauthorized access or session timeout
//                $provide.factory('sessionInterceptor', function($q, $location){
//                    return {
//                        'response':function(response){
//                            return response;
//                        },
//                        'responseError': function(rejection){
//                            console.log('interceptor result - ',rejection);
//                            if(rejection.status == 401){
//                                $location.path('/login');
//                                return $q.reject(rejection);
//                            }else{
//                                return $q.reject(rejection);
//                            }
//                        }
//                    }
//                });
//                $httpProvider.interceptors.push('sessionInterceptor');
                //$httpProvider.responseInterceptors.push(interceptor);
            }])
        .run(["$rootScope", "$window", "$location", function ($rootScope, $window, $location) {

                $rootScope.$on("$stateChangeSuccess", function (event, current, previous, userInfo) {
                    console.log(userInfo);
                });

                $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {

                    if (error.authenticated === false) {
                        window.location.hash = "/login";
                    }

                    if (error.authenticated === true && toState.name == 'login') {
                        window.location.hash = '/dashboard/home'
//                        $window.location.assign("/dashboard/home");
//                        $window.location.hash = "/dashboard/home";
//                        $window.location.hash = "/dashboard/home";
                    }

                });
            }])
        ;