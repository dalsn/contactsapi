/* eslint quote-props: 0 */
/* eslint no-sync: 0 */
/* eslint sort-keys: 0 */
/* eslint no-magic-numbers: 0 */
/* eslint no-process-env: "warn" */
/* eslint max-len: 0 */

"use strict";

const models = require("../models");
const User = models.User;
const Contact = models.Contact;

exports.store = (req, res) => {

    // Save Contact to Database
    Contact.create({
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone
    }).then((contact) => {

        User.findById(req.userId).then((user) => {

            user.addContact(contact).then(() => {

                res.send({
                    "message": "Contact stored successfully!",
                    "status": "success"
                });

            }).
                catch((err) => {

                    res.status(500).send({
                        "message": `Fail! Error -> ${err}`,
                        "status": "error"
                    });

                });

        }).
            catch((err) => {

                res.status(500).send({
                    "message": `Fail! Error -> ${err}`,
                    "status": "error"
                });

            });


    }).
        catch((err) => {

            res.status(500).send({
                "message": `Fail! Error -> ${err}`,
                "status": "error"
            });

        });

};

exports.index = (req, res) => {

    User.findById(req.userId).then((user) => {

        if (!user) {

            return res.status(200).send({
                "message": "No contacts found",
                "status": "success"
            });

        }

        user.getContacts().then((contacts) => {

            res.send({
                "status": "success",
                "contacts": contacts
            });

        }).
            catch((err) => {

                res.status(500).send({
                    "message": `Fail! Error -> ${err}`,
                    "status": "error"
                });

            });

    }).
        catch((err) => {

            res.status(500).send({
                "message": `Fail! Error -> ${err}`,
                "status": "error"
            });

        });

};

exports.view = (req, res) => {

    Contact.findById(req.params.contactId).then((contact) => {

        if (!contact) {

            return res.status(404).send({
                "message": "No contact found",
                "status": "error"
            });

        }

        res.send({
            "status": "success",
            "contact": contact
        });

    }).
        catch((err) => {

            res.status(500).send({
                "message": `Fail! Error -> ${err}`,
                "status": "error"
            });

        });
}