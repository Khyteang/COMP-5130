const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const port = 3002;

const { dataParser } = require('./server/dataParser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
})

app.get('/AngelViewApi/v1/naturalDisaster', (req, res) => {
    console.log("GET endpoint");
    dataParser()
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.status(500);
        res.json(err);
    });
})

app.listen(port, (err) => {
    if (err) {
        return console.log('error setting up server', err)
    }
    console.log(`successfuly set up server at port ${port}`);
})