`use strict`
const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors");
module.exports = () =>{
    let app = express();
    // use for parsing body of request
    app.use(cors());
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    // initializes the routes
    require('./initRoutes')(app);
    // creates a middleware that checks the responses
    require("./generateApiResponse")(app)

    const server = require('http').createServer(app)
    return server;
}