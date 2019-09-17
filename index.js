const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3000;
const router = express.Router();
const createDB = require('./database/createDatabase.js');
var http = require('http');

app.use(cors());
app.use(bodyParser.json());

createDB.connect();

app.use('/', require('./routes'));

app.listen(process.env.PORT || PORT, function () {
    console.log("Server is running on Port: " + PORT);
});
