'use strict';

const rp = require("request-promise");
const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');
const creds = require('../creds.json');
var number = 0;


// get the ablum_ids
function get_ablums (ablum_list) {
    // ablum_id_list is not Null
    if (ablum_list) {
        for (let ablum_id of ablum_list) {
            get_title_userId(ablum_id);
            if (number === ablum_list.length) {
                console.log(number);
            }
        }
        return true;
    } else {
        return false;
    }
}


// use ablum_id get ablum title and ablum userId
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
    };
    rp(options)
        .then(function (repos) {
            writesheet(title, repos.username);
        })
        .catch(function (err) {
            console.log(err);
        })
}


// write title and username to google sheet
async function writesheet (title, username) {
    const doc = new GoogleSpreadsheet('1cejHzOKXBnXk8_aa_hdE66NCJt78v2b-QPm0OVOYyUU');
    // Authentication
    await promisify(doc.useServiceAccountAuth)(creds);
    const info = await promisify(doc.getInfo)();
    // get worksheet
    const sheet = info.worksheets[0];
    var cells = await promisify(sheet.getCells)({
      'min-row': 1,
      'max-row': 1,
      'min-col': 1,
      'max-col': 2,
      'return-empty': true
    });
    // set sheet head(can't set head named title, it will get a bug)
    if (cells[0].value !== 'ablum_title' || cells[1].value !== 'username') {
      await promisify(sheet.setHeaderRow)(['ablum_title', 'username']);
    }
    var row = { 
      ablum_title: title,
      username: username
    }
    await promisify(sheet.addRow)(row);
    console.log(`write ablum_title = '${row.ablum_title}', username = '${row.username}'`);
    number ++;
  }
  

module.exports = get_ablums;
