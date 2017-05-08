/**
 * Created by Vaishampayan Reddy on 5/7/2017.
 */
historyapp.controller('404Controller', function ($scope, $http) {
    var isLoggedIn = function() {
        var isLoggedInResponse = $http.get('/isLoggedIn');
        isLoggedInResponse.success(function(data) {
            if(data.status === 200) {
                $scope.profile = data.profile;
            }
            else if (data.status === 401) {
                window.location = "/";
            }
            else {
                window.location = "/";
            }
        });
    };
    isLoggedIn();

    $scope.logout = function() {
        var logout_response = $http.get('/logout');
        logout_response.success(function(data) {
            window.location = "/";
        });
    };
});