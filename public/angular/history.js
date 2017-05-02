/**
 * Created by Vaishampayan Reddy on 5/2/2017.
 */

var historyapp = angular.module('historyapp', ['ngRoute']);
//console.log(history.config);
historyapp.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider, $routeParams) {
        $routeProvider
            .when('/home', {
                templateUrl: 'analytics1.html',
                controller: 'homeCTRL'
            }).otherwise({
                templateUrl: '404.html',
                controller: '404Controller'
            });
        $locationProvider.html5Mode(true);
    }
]);
historyapp.controller('mainCTRL', function ($scope, $http) {
    var getProfile = function() {
        var get_profile_req = $http.get('/profile');
        get_profile_req.success(function(data) {
            $scope.profile = data.profile;
        });
    };
    getProfile();

    /**
     * authenticates the user
     */
    $scope.doGoogleAuth = function() {
        var get_call = $http.get('/login');
        get_call.success(function(data) {
            window.location = data.auth_url;
        });
    };
});

historyapp.controller('homeCTRL', function ($scope, $http) {
    var getProfile = function() {
        var get_profile_req = $http.get('/profile');
        get_profile_req.success(function(data) {
           $scope.profile = data.profile;
        });
    };
    getProfile();
    /**
     * authenticates the user
     */
    $scope.doGoogleAuth = function() {
        var get_call = $http.get('/login');
        get_call.success(function(data) {
            window.location = data.auth_url;
        });
    };
});

