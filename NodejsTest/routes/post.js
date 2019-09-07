'use strict';

var request = require('request');
var url="http://127.0.0.1:8080/v1/log";
// json data to send
var data= {
    "ablum_list": [1, 2, 3, 4, 5, 6, 7, 8, 20, 50]
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
