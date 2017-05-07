/**
 * Created by Vaishampayan Reddy on 4/29/2017.
 */
var helperFunctions = require('./helper-functions');
var dbHelper = require('./mongo-db-helper');
var mongo = require("./mongo");
var mongoURL = "mongodb://vaisham92:marias@ds131041.mlab.com:31041/history";
//var mongoURL = "mongodb://localhost:27017/history";

/**
 * saves the record in the format
 *
 * {
	"profile_id": "100427714450058914818",
	"T1": 1493530503537,
	"T2": 1493530544950,
	"website": "https://www.facebook.com/"
 * }
 * @param request
 * @param response
 */
exports.saveDataByProfileId = function(request, response) {
    //isQualifiedURL(hostname, function(){}, function(){});
  try {
      mongo.connect(mongoURL, function() {
          //console.log(collectionName);
          var current_day_collection = mongo.collection(request.body.collection);
          //console.log(current_day_collection);
          helperFunctions.getURLComponents(request.body.website, function(hostname, pathname) {
              isQualifiedURL(hostname, function(){
                  var profile_id = request.body.profile_id;
                  if(profile_id === undefined) {
                      console.log("profile_id: " + profile_id);
                      response.send({
                          "status": 400,
                          "errmsg": "BAD REQUEST: missing profile_id"
                      });
                  }
                  else {
                      var data_to_insert = {
                          "T1": request.body.T1,
                          "T2": request.body.T2,
                          "hostname": hostname,
                          "pathname": pathname
                      };
                      //console.log(data_to_insert);
                      var searchData = Object();
                      searchData["user_id"] = profile_id;
                      dbHelper.doesExistInDb(current_day_collection, searchData, function() {
                          console.log("record exists");
                          // already data exists for the user for current day
                          // update the existing data with current data
                          dbHelper.readOne(current_day_collection, searchData, null, function(data) {
                              console.log(data);
                              var postData = {};
                              var chromeHistory = {};
                              data["chromeHistory"].push(data_to_insert);
                              chromeHistory["chromeHistory"] = data["chromeHistory"];
                              postData['$set'] = chromeHistory;
                              dbHelper.updateCollection(current_day_collection, searchData, postData, function() {
                                  response.send({
                                      "status": "200",
                                      "message": "user data appended"
                                  });
                              });
                          });
                      }, function() {
                          // record doesn't exist for the user for current day
                          // we need to create new record for today
                          console.log("record doesnt exist");
                          var history_data = [];
                          history_data.push(data_to_insert);
                          var postData = {};
                          postData['user_id'] = profile_id;
                          postData['chromeHistory'] = history_data;
                          dbHelper.insertIntoCollection(current_day_collection, postData , function() {
                              response.send({
                                  "status": "200",
                                  "message": "user data appended"
                              });
                          });
                      });
                  }
              }, function(){
                  response.send({
                      "status": 400,
                      "errmsg": "BAD REQUEST"
                  });
              });
          }); // helperFunctions hostname pathname
      }); // mongo connection
  }
  catch (err) {
      response.send({
          "status": 500,
          "errmsg": "Unable to update data"
      });
  }
};

var isQualifiedURL = function(url, success, failure) {
    if(url === "newtab") failure();
    else success();
};