/* eslint quote-props: 0 */
/* eslint no-sync: 0 */
/* eslint no-magic-numbers: 0 */
/* eslint no-process-env: "warn" */
/* eslint max-len: 0 */

"use strict";

const models = require("../models");
const User = models.User;
const bcrypt = require("bcrypt-nodejs");

exports.signup = (req, res) => {

    // Save User to Database
    User.create({
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8)),
    }).then(() => {

        res.send({
            "message": "User registered successfully!",
            "status": "success"
        });

    }).
        catch((err) => {

            res.status(500).send({
                "message": `Fail! Error -> ${err}`,
                "status": "error"
            });

        });

};
