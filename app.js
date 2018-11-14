"use strict";

const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const routes = require("./server/routes");

const SUCCESS = 200;

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger("dev"));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": false}));

routes(app);

app.get("*", (req, res) => res.status(SUCCESS).send({
    "message": "Welcome to the beginning of nothingness.",
}));

module.exports = app;
