'use strict';

const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');
const creds = require('../creds.json');

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
}

module.exports = writesheet;