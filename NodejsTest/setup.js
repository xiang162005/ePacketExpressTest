'user strict';

var express = require('express');
var app = express();
app.use(express.json());
var get_ablums = require('./routes/main');

// Assume that json is received: {"ablum_list": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
app.post('/v1/log', function (req, res) {
    success = get_ablums(req.body.ablum_list);
    if (success) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
})


app.listen(8080, () => console.log('app listening on port 8080!'));