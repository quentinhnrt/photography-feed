// create express server on https

const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();
require('dotenv').config();

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

https.createServer(options, app).listen(3000);

app.get('/', (req, res) => {
    res.send('Hello World!');
});


