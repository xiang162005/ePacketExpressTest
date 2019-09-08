'use strict';

const rp = require("request-promise");
const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');
const creds = require('../creds.json');


// get the ablum_ids 
function get_ablums (ablum_list) {
    // ablum_id_list is not Null
    if (ablum_list) {
        for (let ablum_id of ablum_list) {
            get_title_userId(ablum_id);  // async
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
    };
    rp(options)
        .then(function (response) {
            get_username(response.userId, response.title); // if success
        })
        .catch(function (error) {
            console.log(error); // if failed
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
        .then(function (response) {
            writesheet(title, response.username);  //if success
        })
        .catch(function (error) {
            console.log(error);  // if failed
        })
}


// write title and username to google sheet
async function writesheet (title, username) {
    const doc = new GoogleSpreadsheet('1cejHzOKXBnXk8_aa_hdE66NCJt78v2b-QPm0OVOYyUU');
    try {
        // Authentication
        await promisify(doc.useServiceAccountAuth)(creds);
        const info = await promisify(doc.getInfo)();
        // get worksheet
        const sheet = info.worksheets[0];
        // get sheet head
        var cells = await promisify(sheet.getCells)({
            'min-row': 1,
            'max-row': 1,
            'min-col': 1,
            'max-col': 2,
            'return-empty': true
          });
          // set sheet head(don't set head named title, it will get a bug)
        if (cells[0].value !== 'ablum_title' || cells[1].value !== 'username') {
            await promisify(sheet.setHeaderRow)(['ablum_title', 'username']);
        }
        // the row you want to write to the sheet
        var row = { 
            ablum_title: title,
            username: username
        };
        // write data to sheet
        await promisify(sheet.addRow)(row);
        // if success print the data you write
        console.log(`write ablum_title = '${row.ablum_title}', username = '${row.username}'`);
    } catch (error) {
        console.log(error); // if failed, print the error
    }
  }
  

module.exports = get_ablums;
