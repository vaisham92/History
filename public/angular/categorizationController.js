/**
 * Created by Vaishampayan Reddy on 5/7/2017.
 */
historyapp.controller('categorizationController', function ($scope, $http) {
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

    var getTimeHour = function(category_slot) {
        console.log(category_slot);
        var result = "From ";
        if(category_slot / 10 < 1) {
            if(category_slot < 9)
                result += "0" + category_slot +":00  to 0" + (category_slot + 1) + ":00";
            else
                result += "0" + category_slot +":00  to 10:00";
        }
        else {
            result += category_slot +":00  to " + (category_slot + 1) + ":00";
        }
        return result;
    };
    var get_categories = function() {
        var collection_name = getCollectionName();
        var categories_Response = $http.get('/api/categories' + '?date=' + collection_name);
        categories_Response.success(function(data) {
            if(data.status === 200) {
                $scope.length = data.categories.length;
                $scope.categories = [];
                data.categories.forEach(function(category) {
                   /*
                    {
                    "Office/Business Applications": 28,
                    "Technology/Internet": 73,
                    "Uncategorized": 71,
                    "Search Engines/Portals": 111
                    }
                     */
                   var dataProvider = [];
                   var divTagsList = [];
                   for(var key in category.slot_categories) {
                       /*
                        {
                        "category": "Mixed Content/Potentially Adult",
                        "time": 334
                        }
                        */
                       var obj = {};
                       obj["category"] = key;
                       obj["time"] = category.slot_categories[obj["category"]];
                       dataProvider.push(obj);
                   }
                    $scope.categories.push(dataProvider);
                });
                //console.log($scope.categories[0][0]);
                var count = 1;
                $scope.charts = [];
                var chart;
                $scope.categories.forEach(function(category) {
                    console.log(category);
                    var divTag = "<div class=\"row card-panel\"><h5 class=\"blue-text\">" + getTimeHour(data.categories[count - 1].slot) + "</h5><div class=\"chartdivx\" id=\"mychart" + count + "\"></div></div>";
                    $("#allcharts").append(divTag);
                    //console.log(JSON.stringify(category));
                    //console.log("mychart" + count);
                    AmCharts.makeChart( "mychart" + count, {
                        "type": "pie",
                        "theme": "light",
                        "dataProvider": category,
                        "valueField": "time",
                        "titleField": "category",
                        "balloon":{
                            "fixedPosition":true
                        },
                        "outlineAlpha": 0.4,
                        "depth3D": 15,
                        "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
                        "angle": 30,
                        "export": {
                            "enabled": true
                        }
                    });
                    count = count + 1;
                    //$scope.charts.push(chart);
                });
                $('.preloader-background').fadeOut('slow');
            }
            else {
                alert("No data");
            }
        });
    };
    get_categories();
});