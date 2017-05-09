/**
 * Created by Vaishampayan Reddy on 5/7/2017.
 */
historyapp.controller('recommendationController', function ($scope, $http) {
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
        var tempDate = new Date();
        $scope.date = tempDate.setDate(tempDate.getDate() - 1).toDateString();
        today = mm + '' + dd + '' + yyyy;
        return today;
    };

    var get_categories = function() {
        var collection_name = getCollectionName();
        var categories_Response = $http.get('/api/recommendations' + '?date=' + collection_name);
        categories_Response.success(function(data) {
            if(data.status === 200) {
                $scope.recommendations = data.recommendations;
                $('.preloader-background').fadeOut('slow');
            }
            else {
                alert("No data");
            }
        });
    };
    get_categories();
});