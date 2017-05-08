/**
 * Created by Vaishampayan Reddy on 5/2/2017.
 */

var historyapp = angular.module('historyapp', ['ngRoute']);
//console.log(history.config);
historyapp.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider, $routeParams) {
        $routeProvider
            .when('/', {
                templateUrl: 'dashboard.html',
                controller: 'dashboardController'
            }).when('/rules', {
                templateUrl: 'rules.html',
                controller: 'rulesController'
            }).when('/categorization', {
                templateUrl: 'categorization.html',
                controller: 'categorizationController'
            }).when('/recommendation', {
                templateUrl: 'recommendation.html',
                controller: 'recommendationController'
            }).otherwise({
                templateUrl: '404.html',
                controller: '404Controller'
            });
        $locationProvider.html5Mode(true);
    }
]);