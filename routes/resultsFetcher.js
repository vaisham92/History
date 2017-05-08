/**
 * Created by Vaishampayan Reddy on 5/7/2017.
 */
var helperFunctions = require('./helper-functions');
var dbHelper = require('./mongo-db-helper');
var mongo = require("./mongo");
var mongoURL = "mongodb://vaisham92:marias@ds131041.mlab.com:31041/history";

exports.getRules = function(request, response) {
    try {
        mongo.connect(mongoURL, function () {
            var result_collection = mongo.collection('r' + request.query.date);
            console.log('r' + request.query.date);
            var searchData = {};
            searchData["user_id"] = request.session.profile.id;
            console.log(searchData);
            dbHelper.readOne(result_collection, searchData, null, function (data) {
                if(data === null || data === undefined) {
                    response.send({
                        "status": 200,
                        "rules": []
                    });
                }
                else {
                    response.send({
                        "status": 200,
                        "rules": data.rules
                    })
                }
            });
        }); // mongo connection
    }
    catch (err) {
        response.send({
            "status": 500,
            "errmsg": "Unable to fetch data"
        });
    }
};

exports.getRecommendations = function(request, response) {
    try {
        mongo.connect(mongoURL, function () {
            var result_collection = mongo.collection('r' + request.query.date);
            console.log('r' + request.query.date);
            var searchData = {};
            searchData["user_id"] = request.session.profile.id;
            console.log(searchData);
            dbHelper.readOne(result_collection, searchData, null, function (data) {
                if(data === null || data === undefined) {
                    response.send({
                        "status": 200,
                        "recommendations": []
                    });
                }
                else {
                    response.send({
                        "status": 200,
                        "recommendations": data.recommendations
                    })
                }
            });
        }); // mongo connection
    }
    catch (err) {
        response.send({
            "status": 500,
            "errmsg": "Unable to fetch data"
        });
    }
};

exports.getCategorizations = function(request, response) {
    if(request.session.profile) {
        try {
            mongo.connect(mongoURL, function () {
                var result_collection = mongo.collection('r' + request.query.date);
                console.log('r' + request.query.date);
                var searchData = {};
                searchData["user_id"] = request.session.profile.id;
                console.log(searchData);
                dbHelper.readOne(result_collection, searchData, null, function (data) {
                    if(data === null || data === undefined) {
                        response.send({
                            "status": 200,
                            "categories": []
                        });
                    }
                    else {
                        response.send({
                            "status": 200,
                            "categories": data.categories
                        })
                    }
                });
            }); // mongo connection
        }
        catch (err) {
            response.send({
                "status": 500,
                "errmsg": "Unable to fetch data"
            });
        }
    }
    else {
        response.send({
            "status": 401,
            "errmsg": "Unauthorized"
        });
    }
};