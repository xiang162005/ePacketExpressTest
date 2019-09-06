'use strict';

var rp = require("request-promise");
var fs = require('fs');


// use ablum id get ablum title and ablum userId
function get_title_userId (ablum_id) {
    var options = {
        uri: `https://jsonplaceholder.typicode.com/albums/${ablum_id}`,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    }
    rp(options)
        .then(function (repos) {
            get_username(repos.userId, repos.title);
        })
        .catch(function (err) {
            console.log(err);
        });
}



// use userId get ablum username
function get_username (userId, title) {
    var options = {
        uri: `https://jsonplaceholder.typicode.com/users/${userId}`,
        headers: {
            'User-Agent': 'Request-Promis'
        },
        json: true
    }

    rp(options)
        .then(function (repos) {
            write_json(title, repos.username);
        })
        .catch(function (err) {
            console.log(err);
        })
}


// write ablum title and username into json
function write_json (title, username) {
    try {
        var result;
        // read the json data
        var data = fs.readFileSync('result.json', 'utf-8');
        if (data) {
            result = JSON.parse(data);
        }
        else {
            result = {
                "ablum_list": []
            };
        }
        // add title and username to data
        // if writeable is false, the title and username will not add to json
        var writeable = true;
        for (let ablum of result.ablum_list) {
            if (ablum.title === title) {
                writeable = false;
                break;
            }
        }
        if (writeable) {
            result.ablum_list.push({"title": title, "username": username});
        }
        // write to json
        var write_data = JSON.stringify(result);
        fs.writeFileSync('result.json', write_data);
        console.log('write into result.json');
        
    } catch (err) {
        console.log(err);
    }
}



// get the ablum_ids
function get_ablums (ablum_list) {
    // ablum_id_list is not Null
    if (ablum_list) {
        for (let ablum_id of ablum_list) {
            get_title_userId(ablum_id);
        }
    } 
}

module.exports = get_ablums;
