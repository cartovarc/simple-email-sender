const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api');
const cors = require('cors');

const port = process.env.PORT || 3000;
const app = express();


if (!process.env.ON_HEROKU) {
    console.log("Loading environment variables from server.js file...");
    const env = require('node-env-file');
    env(__dirname + '/.env');
}

app.use(cors({ origin: process.env.ALLOWED_HOST }));

app.use(bodyParser.json());

app.listen(port, function () {
    console.log("Server is listening at port: " + port);
});

app.use('/api', api);
