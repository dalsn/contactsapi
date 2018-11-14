/* eslint no-magic-numbers: 1 */
/* eslint no-process-env: "warn" */

"use strict";

const env = process.env.NODE_ENV || "development";
const jwt = require("jsonwebtoken");
const config = require(`${__dirname}/../config/config.json`)[env];

const verifyToken = (req, res, next) => {

    const token = req.headers["x-access-token"];

    if (!token) {

        return res.status(403).send({
            "auth": false,
            "message": "No token provided."
        });

    }

    jwt.verify(token, config.secret, (err, decoded) => {

        if (err) {

            return res.status(500).send({
                "auth": false,
                "message": `Failed to Authenticate. Error -> ${err}`
            });

        }
        req.userId = decoded.id;
        next();

    });

};

const authJwt = {};
authJwt.verifyToken = verifyToken;

module.exports = authJwt;
