'user strict';

const express = require('express');
const app = express();
app.use(express.json());
const get_ablums = require('./routes/main');


// Assume the json received: {"ablum_list": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
app.post('/v1/log', function (request, response) {
    // if ablum_list is not null, it will response OK!
    if (get_ablums(request.body.ablum_list)){
        response.sendStatus(200);
    } else {
        response.sendStatus(400);
    }
})


app.listen(8080, () => console.log('app listening on port 8080!'));