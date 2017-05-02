/**
 * Created by Vaishampayan Reddy on 5/1/2017.
 */
'use strict';

var readline = require('readline');

var google = require('googleapis');
var OAuth2Client = google.auth.OAuth2;
var plus = google.plus('v1');

// Client ID and client secret are available at
// https://code.google.com/apis/console
var CLIENT_ID = '98297658525-hbuigb5jncsqce793h86t2qo9a4pqcns.apps.googleusercontent.com';
var CLIENT_SECRET = 'pC67o3mEXIaOhut0yHjGojD1';
var REDIRECT_URL = 'https://historyinsights.herokuapp.com/oauth2';

var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var scopes = [
    'https://www.googleapis.com/auth/plus.me'
];

exports.getAuthURL = function(request, response) {
    // generate consent page url
    var url = oauth2Client.generateAuthUrl({
        access_type: 'offline', // will return a refresh token
        scope: scopes // can be a space-delimited string or an array of scopes
    });

    console.log('Visit the url: ', url);
    response.send({
        "status": 200,
        "auth_url": url
    });
};

exports.exchangeCodeForToken = function(code, success, failure) {
    rl.question('Enter the code here:', function (code) {
        // request access token
        oauth2Client.getToken(code, function (err, tokens) {
            if (err) {
                return failure(err);
            }
            // set tokens to the client
            // TODO: tokens should be set by OAuth2 client.
            oauth2Client.setCredentials(tokens);
            success();
        });
    });
};

function getAccessToken (oauth2Client, callback) {
    // generate consent page url
    var url = oauth2Client.generateAuthUrl({
        access_type: 'offline', // will return a refresh token
        scope: scopes // can be a space-delimited string or an array of scopes
    });

    console.log('Visit the url: ', url);
    rl.question('Enter the code here:', function (code) {
        // request access token
        oauth2Client.getToken(code, function (err, tokens) {
            if (err) {
                return callback(err);
            }
            // set tokens to the client
            // TODO: tokens should be set by OAuth2 client.
            oauth2Client.setCredentials(tokens);
            callback();
        });
    });
}

// retrieve an access token
getAccessToken(oauth2Client, function () {
    // retrieve user profile
    plus.people.get({ userId: 'me', auth: oauth2Client }, function (err, profile) {
        if (err) {
            return console.log('An error occured', err);
        }
        console.log(profile.displayName, ':', profile.tagline);
    });
});