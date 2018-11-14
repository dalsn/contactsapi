/* eslint quote-props: 0 */
/* eslint no-sync: 0 */
/* eslint sort-keys: 0 */
/* eslint no-magic-numbers: 0 */
/* eslint no-process-env: "warn" */
/* eslint max-len: 0 */

"use strict";

const models = require("../models");
const User = models.User;
const bcrypt = require("bcrypt-nodejs");
const env = process.env.NODE_ENV || "development";
const jwt = require("jsonwebtoken");
const config = require(`${__dirname}/../config/config.json`)[env];

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

exports.signout = (req, res) => {

    User.findById(req.userId).then((user) => {

        if (!user) {

            return res.status(404).send({
                "message": "User not logged in!",
                "status": "error"
            });

        }

        user.update({
            loggedin: false
        }).then(() => res.status(200).send({
            accessToken: null,
            auth: false,
            status: "success"
        }));

    }).
        catch((err) => {

            res.status(500).send({
                "message": `Fail! Error -> ${err}`,
                "status": "error"
            });

        });

};

exports.signin = (req, res) => {

    User.findOne({
        where: {
            email: req.body.email
        }
    }).then((user) => {

        if (!user) {

            return res.status(404).send({
                "message": "User not found!",
                "status": "error"
            });

        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {

            return res.status(401).send({
                status: "error",
                auth: false,
                reason: "Invalid Password!"
            });

        }

        const token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 7200
        });

        user.update({
            loggedin: true
        }).then(() => res.status(200).send({
            accessToken: token,
            auth: true,
            status: "success"
        }));

    }).
        catch((err) => res.status(500).send({
            "message": `Fail! Error -> ${err}`,
            "status": "error"
        }));

};
