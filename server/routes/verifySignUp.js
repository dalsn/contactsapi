/* eslint no-magic-numbers: 1 */

"use strict";

const models = require("../models");
const User = models.User;

const checkDuplicateEmail = (req, res, next) => {

    User.findOne({
        "where": {
            "email": req.body.email
        }
    }).then((user) => {

        if (user) {

            res.status(400).send({
                "message": "Email is already taken!",
                "status": "error"
            });
            return;

        }

        next();

    });

};

const signUpVerify = {};
signUpVerify.checkDuplicateEmail = checkDuplicateEmail;

module.exports = signUpVerify;
