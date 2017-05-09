/**
 * Created by Vaishampayan Reddy on 5/7/2017.
 */
historyapp.controller('rulesController', function ($scope, $http) {
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
        var temp = tempDate.setDate(tempDate.getDate() - 1);
        tempDate = new Date(temp);
        $scope.date = tempDate.toDateString();
        today = mm + '' + dd + '' + yyyy;
        return today;
    };

    var getRules = function() {
        var collection_name = getCollectionName();
        var rules_response = $http.get('/api/rules' + '?date=' + collection_name);
        rules_response.success(function(data) {
           $scope.rules = data.rules;
            $('.preloader-background').fadeOut('slow');
        });
    };
    getRules();
});