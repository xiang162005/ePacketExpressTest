'use strict';

const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');
const creds = require('../creds.json');


module.exports = writesheet;