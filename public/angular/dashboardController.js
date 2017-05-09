/**
 * Created by Vaishampayan Reddy on 5/7/2017.
 */
historyapp.controller('dashboardController', function ($scope, $http) {
    $('.preloader-background').fadeIn('slow');
    var getCollectionName = function() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10) {
            dd='0'+(dd - 1)
        }
        if(mm<10) {
            mm='0'+mm
        }
        $scope.date = today.toDateString();
        today = mm + '' + dd + '' + yyyy;
        return today;
    };

    var get_categories = function() {
        var collection_name = getCollectionName();
        var categories_Response = $http.get('/api/results' + '?date=' + collection_name);
        categories_Response.success(function(data) {
            if(data.status === 200) {
                if(data.results !== []) {
                    $scope.urls = [];
                    $scope.urls_meta = {};
                    data.results.rules.forEach(function(rule) {
                        rule.LHS.forEach(function(url) {
                            //console.log(url);
                            if($scope.urls_meta[url] != true) {
                                $scope.urls.push(url);
                                $scope.urls_meta[url] = true;
                                console.log("here");
                            }
                        });
                        rule.RHS.forEach(function(url) {
                            if($scope.urls_meta[url] != true) {
                                $scope.urls.push(url);
                                $scope.urls_meta[url] = true;
                                console.log("here");
                            }
                        });
                    });
                    console.log($scope.urls);
                    $scope.categories = [];
                    $scope.categories_meta = {};
                    data.results.categories.forEach(function(category) {
                        for (key in category.slot_categories) {
                            if($scope.categories_meta[key] != true) {
                                $scope.categories.push(key);
                                $scope.categories_meta[key] = true;
                                //console.log("here");
                            }
                        }
                    });
                    $('.preloader-background').fadeOut('slow');
                }
                else {
                    // empty data
                }
            }
            else {
                alert("No data");
            }
        });
    };
    get_categories();
});