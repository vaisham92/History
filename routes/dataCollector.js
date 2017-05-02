/**
 * Created by Vaishampayan Reddy on 4/29/2017.
 */
var helperFunctions = require('./helper-functions');
var dbHelper = require('./mongo-db-helper');
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/history";

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
  try {
      mongo.connect(mongoURL, function() {
          helperFunctions.getDateForCollection(function(collectionName) {
              //console.log(collectionName);
              var current_day_collection = mongo.collection(collectionName);
              //console.log(current_day_collection);
              helperFunctions.getURLComponents(request.body.website, function(hostname, pathname) {
                  var profile_id = request.body.profile_id;
                  var data_to_insert = {
                      "T1": request.body.T1,
                      "T2": request.body.T2,
                      "hostname": hostname,
                      "pathname": pathname
                  };
                  //console.log(data_to_insert);
                  var searchData = Object();
                  searchData[profile_id] = {"$exists": true};
                  dbHelper.doesExistInDb(current_day_collection, searchData, function() {
                      console.log("record exists");
                        // already data exists for the user for current day
                        // update the existing data with current data
                      dbHelper.readOne(current_day_collection, searchData, null, function(data) {
                          var postData = {};
                          var profileKey = {};
                          data[profile_id].push(data_to_insert);
                          profileKey[profile_id] = data[profile_id];
                          postData['$set'] = profileKey;
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
                      var profileKey = {};
                      profileKey[profile_id] = history_data;
                      dbHelper.insertIntoCollection(current_day_collection, profileKey , function() {
                          response.send({
                              "status": "200",
                              "message": "user data appended"
                          });
                      });
                  });
              }); // helperFunctions hostname pathname
          }); // helperFunctions collection name
      }); // mongo connection
  }
  catch (err) {
      response.send({
          "status": 500,
          "errmsg": "Unable to update data"
      });
  }
};