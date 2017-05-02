/**
 * Created by Vaishampayan Reddy on 4/29/2017.
 */
var URL = require('url');
exports.getDateForCollection = function(callback) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) {
        dd='0'+dd
    }
    if(mm<10) {
        mm='0'+mm
    }
    today = 'h' + mm + '' + dd + '' + yyyy;
    callback(today);
};

exports.getURLComponents = function(myURL, callback) {
    var hostname = URL.parse(myURL).hostname;
    var pathname = URL.parse(myURL).pathname;
    callback(hostname, pathname);
};