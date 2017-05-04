/**
 * Created by Vaishampayan Reddy on 5/2/2017.
 */

var historyapp = angular.module('historyapp', ['ngRoute']);
//console.log(history.config);
historyapp.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider, $routeParams) {
        $routeProvider
            .when('/home', {
                templateUrl: 'dashboard.html',
                controller: 'dashboardController'
            }).when('/dashboard', {
                templateUrl: 'dashboard.html',
                controller: 'dashboardController'
            }).when('/analytics', {
                templateUrl: 'analytics.html',
                controller: 'dashboardController'
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

historyapp.controller('dashboardController', function ($scope, $http) {
    var chart = AmCharts.makeChart( "chartdiv", {
        "type": "gantt",
        "theme": "light",
        "marginRight": 70,
        "period": "DD",
        "dataDateFormat": "YYYY-MM-DD",
        "columnWidth": 0.5,
        "valueAxis": {
            "type": "date"
        },
        "brightnessStep": 7,
        "graph": {
            "fillAlphas": 1,
            "lineAlpha": 1,
            "lineColor": "#fff",
            "fillAlphas": 0.85,
            "balloonText": "<b>[[task]]</b>:<br />[[open]] -- [[value]]"
        },
        "rotate": true,
        "categoryField": "category",
        "segmentsField": "segments",
        "colorField": "color",
        "startDateField": "start",
        "endDateField": "end",
        "dataProvider": [ {
            "category": "Monday",
            "segments": [ {
                "start": "2016-01-01",
                "end": "2016-01-14",
                "color": "#b9783f",
                "task": "Gathering requirements"
            }, {
                "start": "2016-01-16",
                "end": "2016-01-27",
                "task": "Producing specifications"
            }, {
                "start": "2016-02-05",
                "end": "2016-04-18",
                "task": "Development"
            }, {
                "start": "2016-04-18",
                "end": "2016-04-30",
                "task": "Testing and QA"
            } ]
        }, {
            "category": "Tuesday",
            "segments": [ {
                "start": "2016-01-08",
                "end": "2016-01-10",
                "color": "#cc4748",
                "task": "Gathering requirements"
            }, {
                "start": "2016-01-12",
                "end": "2016-01-15",
                "task": "Producing specifications"
            }, {
                "start": "2016-01-16",
                "end": "2016-02-05",
                "task": "Development"
            }, {
                "start": "2016-02-10",
                "end": "2016-02-18",
                "task": "Testing and QA"
            } ]
        }, {
            "category": "Wednesday",
            "segments": [ {
                "start": "2016-01-02",
                "end": "2016-01-08",
                "color": "#cd82ad",
                "task": "Gathering requirements"
            }, {
                "start": "2016-01-08",
                "end": "2016-01-16",
                "task": "Producing specifications"
            }, {
                "start": "2016-01-19",
                "end": "2016-03-01",
                "task": "Development"
            }, {
                "start": "2016-03-12",
                "end": "2016-04-05",
                "task": "Testing and QA"
            } ]
        }, {
            "category": "Thursday",
            "segments": [ {
                "start": "2016-01-01",
                "end": "2016-01-19",
                "color": "#2f4074",
                "task": "Gathering requirements"
            }, {
                "start": "2016-01-19",
                "end": "2016-02-03",
                "task": "Producing specifications"
            }, {
                "start": "2016-03-20",
                "end": "2016-04-25",
                "task": "Development"
            }, {
                "start": "2016-04-27",
                "end": "2016-05-15",
                "task": "Testing and QA"
            } ]
        }, {
            "category": "Friday",
            "segments": [ {
                "start": "2016-01-01",
                "end": "2016-01-12",
                "color": "#448e4d",
                "task": "Gathering requirements"
            }, {
                "start": "2016-01-12",
                "end": "2016-01-19",
                "task": "Producing specifications"
            }, {
                "start": "2016-01-19",
                "end": "2016-03-01",
                "task": "Development"
            }, {
                "start": "2016-03-08",
                "end": "2016-03-30",
                "task": "Testing and QA"
            } ]
        } ],
        "valueScrollbar": {
            "autoGridCount": true
        },
        "chartCursor": {
            "cursorColor": "#55bb76",
            "valueBalloonsEnabled": false,
            "cursorAlpha": 0,
            "valueLineAlpha": 0.5,
            "valueLineBalloonEnabled": true,
            "valueLineEnabled": true,
            "zoomable": false,
            "valueZoomable": true
        },
        "export": {
            "enabled": true
        }
    } );
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

