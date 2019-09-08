'use strict';

<<<<<<< HEAD:NodejsTest/routes/post.js
var request = require('request');
var url="http://47.97.230.218:8080/v1/log";
// json data to send
var data= {
    "ablum_list": [10, 20, 30]
=======
const request = require('request');
var url="http://127.0.0.1:8080/v1/log";
// json data to send
var data= {
    "ablum_list": [11, 22, 33, 44, 55]
>>>>>>> dev:NodejsTest/post.js
};

request({
    url: url,
    method: "POST",
    json: true,
    headers: {
        "content-type": "application/json",
    },
    body: data
}, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body) // if success
    } else {
        console.log(error); // if fail
    }
}); 
