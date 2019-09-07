'use strict';

const rp = require("request-promise");
const { promisify } = require('util');
const writesheet = require('./google_sheet.js');


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
            writesheet(title, repos.username);
        })
        .catch(function (err) {
            console.log(err);
        })
}


// get the ablum_ids
async function get_ablums (ablum_list) {
    // ablum_id_list is not Null
    if (ablum_list) {
        for (let ablum_id of ablum_list) {
            get_title_userId(ablum_id);
        }
    } 
}

module.exports = get_ablums;
