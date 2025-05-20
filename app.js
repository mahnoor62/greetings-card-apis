const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();
require('./database/connection').connect();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
const apiRoutes = require('./routes/index');

const CORS_OPTIONS = process.env.CORS_OPTIONS;

let corsOrigins = [];

if (CORS_OPTIONS) {
    corsOrigins = CORS_OPTIONS.split(',')
}

const corsOptions = {
    origin: corsOrigins,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));


// Serve uploaded images statically
app.use(express.static(__dirname + '/public'));

//base url of every route
app.use("/api", apiRoutes);

app.get('/', (req, res) => {
    res.status(200).send('Server is running.')
});


module.exports = app;