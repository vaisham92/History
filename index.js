var express = require('express');
var app = express();

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var dataCollector = require('./routes/dataCollector');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({resave: true, saveUninitialized: true, secret: 'historychromeapplication', cookie: { maxAge: 6000000 }}));
app.get('/', function(req, res) {
    res.sendfile(__dirname + '/public/index.html');
});
app.get('/home', function(req, res) {
    res.sendfile(__dirname + '/public/home.html');
});

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('pages/index');
});

/**
 * Google Oauth2
 */
var readline = require('readline');

var google = require('googleapis');
var OAuth2Client = google.auth.OAuth2;
var plus = google.plus('v1');

// Client ID and client secret are available at
// https://code.google.com/apis/console
var CLIENT_ID = '98297658525-hbuigb5jncsqce793h86t2qo9a4pqcns.apps.googleusercontent.com';
var CLIENT_SECRET = 'pC67o3mEXIaOhut0yHjGojD1';
var REDIRECT_URL = 'https://historyinsights.herokuapp.com/oauth2';
//var REDIRECT_URL = 'http://localhost:5000/oauth2';

var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var scopes = [
    'https://www.googleapis.com/auth/plus.me'
];

app.get('/isLoggedIn', function(request, response) {
   if(request.session.profile !== undefined) {
        response.send({
            "status": 200,
            "message": "authorized",
            "profile": request.session.profile
        });
   }
   else {
       response.send({
           "status": 401,
           "errmsg": "unauthorized"
       });
   }
});

app.get('/login', function(request, response) {
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
});

var getAccessToken = function(oauth2Client, code, callback) {
    oauth2Client.getToken(code, function (err, tokens) {
        if (err) {
            return callback(err);
        }
        // set tokens to the client
        // TODO: tokens should be set by OAuth2 client.
        oauth2Client.setCredentials(tokens);
        callback();
    });
};

app.get('/oauth2', function(request, response) {
    var code = request.query.code;
    console.log(code);
    getAccessToken(oauth2Client, code, function () {
        // retrieve user profile
        plus.people.get({ userId: 'me', auth: oauth2Client }, function (err, profile) {
            if (err) {
                return console.log('An error occured', err);
            }
            console.log(profile.displayName, ':', profile.tagline);
            request.session.profile = profile;
            //response.sendfile(__dirname + '/public/landing.html');
            response.statusCode = 302;
            response.setHeader("Location", "/home");
            response.end();
        });
    });
});
/**
 * Google oauth2 ends here
 */

app.post('/history', dataCollector.saveDataByProfileId);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

