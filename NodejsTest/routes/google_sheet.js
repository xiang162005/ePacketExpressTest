var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');

// spreadsheet key is the long id in the sheets URL
var doc = new GoogleSpreadsheet('1cejHzOKXBnXk8_aa_hdE66NCJt78v2b-QPm0OVOYyUU');
var sheet;
 
async.series([
  function setAuth(step) {
    // see notes below for authentication instructions!
    var creds = require('../nodejstest-5ae894e45e93.json');
    console.log(creds);
    // OR, if you cannot save the file locally (like on heroku)
    var creds_json = {
        client_email: "nodejstest@nodejstest-252102.iam.gserviceaccount.com",
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDGPX6S9qE1gUc9\nnGBC6WnJWIEPDReABpg2XymAFGjt0fxkESXZlKCBXhc+ESLAdCj4EpbsiiqjdzQe\njV1W6tbZUs+/Hu1V7Q6KYm8hScVNEjBO9vUSYqDwt2/SEj5P/epmQjklj3wbgqhN\nF/63i0XISENXodwge1GoXW+ihN/mTd6j6obKL9XNwrFFUHVB6a8rlUH4q7sYzkjs\n/+gckt3LjESjRrI+kpHx0JyWOOqDB9v+WbRS4tpGRd0lmJPgYR5jt1MRK47Pvs/E\n5Vgfa5tgsYb+kSPrSxTFP6mPSUVqvnylkf6h6VKSlziZtoSpz6ayc7vuXaOdijZe\nOE6C3iMfAgMBAAECggEASiNGWnT07jsmZvK8B1oer2ezgGr/fmg49aCaNyWq5kIR\nV2UYWCpe6nLDU3l6Gyp2BeyB1/2GG7MhYUmx/ib+abEwM4Q/81IgDX3pnLPnnz6t\npWJzXchX8x5PKeubtTO7PToIADWMjwdKpOZT4tWpp9DqqnPEjLtB2yrybH+v8oNE\nafdZzmuZiR9oOiOBamDGC4qUvnIODhGvzlNL2p01+VJcNUWs+UPDDjQ1x64sCyIE\n9WbjCZhraKKMrkKP0eI8XlM2kUquPyDG4yMEGVANZ24Zdad7mz4SZ2+wvegs0oxg\nhzoRHV/mUW7NRmt9E8npKDpjjUGqbZdSaRD60HUgRQKBgQD42mo/gYXjvNr6wxXf\n51FdnGFyRMZjR68Q/ssgrkKeiMePq/45NZprFyXhBE6ImIdnIFhpjUlxlAsfLmbx\nw0U1nqoiJjsOuqdq3DYb5vFOF29XT2AulGYvdsWW67oql06AGyj5vVW7Iv8/fdpb\nIjuM7H6kD1qedHWBmyqLncHWqwKBgQDL7vgxn5prbbbSYBOjkL/+lOITqDsh6MhM\nDXIldlr6dbBsKytkPA2TggX0Irl8yEyYswlFy4hM1XNARKFLP7/BmGtjyip4IsN4\nENn73waZ5QoWc7PnWe/cgweO1qq6rujRXuVKEKYVEGW1vJl4rFRBsT1JIhTmYxQ3\nFaCWQQV1XQKBgQDpJ+LiS12ByaE1z3CATv+KAInAgTWLMU+SUddJcFvUo3yuXMwd\nF97tNUv1Lo7SJm6+rayIgKruMnHVLimfnIAMw/LNehpdK37OfTJpJBC0RPq5yBHq\nsnmnQNXSGFxdqVQQbOIQU1eutRSHjUf3mPRIjg/9cLFLwvuRiirrksxZbwKBgHib\niO+YK7RTO6dpqNO4XMQMezQS733bdPH9lb9wItgzWDZwxYXPOlw9rpW3H6obr6kz\nYU2E1MRUDIg6zoV5W0f8g66NttY8AQx2MuUR/o5vdarXnNM7Tm9Ekui4Llqf7RM+\nIy7Nb9vPScfUlZNXn7EGSG+DF4c1m5QEV2flZnwFAoGBAMgpvkf04SNG5ayDeWkn\nEjQU5tbQv00ewHKpzSaILa4baenu8a19sCHFQdXIaX1H0ovbS7x3ITquh86tYHL+\nXkQ4XRROzR5YYeodwukXdHE+zHt28nmoSEHQ4Cqza+Au4eVzsd/SCZCV6G5/s0nj\nUKLhPMsX4Q60QDJOxjhdyAa/\n-----END PRIVATE KEY-----\n",
    }
 
    doc.useServiceAccountAuth(creds, step);
  },
  function getInfoAndWorksheets(step) {
    doc.getInfo(function(err, info) {
      console.log('Loaded doc: '+info.title+' by '+info.author.email);
      sheet = info.worksheets[0];
      console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
      step();
    });
  }
], function(err){
    if( err ) {
      console.log('Error: '+err);
    }
});