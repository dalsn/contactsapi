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

                res.status(200).send({
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

            res.status(200).send({
                "status": "success",
                contacts
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

    User.findById(req.userId).then((user) => {

        if (!user) {

            return res.status(400).send({
                "message": "You're not logged in",
                "status": "error"
            });

        }

        user.getContacts({
            where: {
                id: req.params.contactId
            }
        }).then((contact) => {

            if (!contact) {

                return res.status(404).send({
                    "message": "No contact found",
                    "status": "error"
                });

            }

            res.status(200).send({
                "status": "success",
                contact
            });

        }).
            catch((err) => res.status(500).send({
                "message": `Fail! Error -> ${err}`,
                "status": "error"
            }));

    }).
        catch((err) => res.status(500).send({
            "message": `Fail! Error -> ${err}`,
            "status": "error"
        }));

};

exports.delete = (req, res) => {

    User.findById(req.userId).then((user) => {

        if (!user) {

            return res.status(400).send({
                "message": "You're not logged in",
                "status": "error"
            });

        }

        user.getContacts({
            where: {
                id: req.params.contactId
            }
        }).then((contacts) => {

            if (!contacts) {

                return res.status(404).send({
                    "message": "No contact found",
                    "status": "error"
                });

            }

            const contact = contacts[0];

            contact.destroy().then(() => {

                res.status(200).send({
                    "status": "success",
                    "message": "Contact deleted!"
                });

            }).
                catch((err) => res.status(500).send({
                    "message": `Fail! Error -> ${err}`,
                    "status": "error"
                }));

        }).
            catch((err) => res.status(500).send({
                "message": `Fail! Error -> ${err}`,
                "status": "error"
            }));

    }).
        catch((err) => res.status(500).send({
            "message": `Fail! Error -> ${err}`,
            "status": "error"
        }));

};

exports.star = (req, res) => {

    User.findById(req.userId).then((user) => {

        if (!user) {

            return res.status(400).send({
                "message": "You're not logged in",
                "status": "error"
            });

        }

        user.getContacts({
            where: {
                id: req.params.contactId
            }
        }).then((contacts) => {

            if (!contacts) {

                return res.status(404).send({
                    "message": "No contact found",
                    "status": "error"
                });

            }

            const contact = contacts[0];

            contact.update({starred: true}, {fields: ["starred"]}).then((contactObj) => res.status(200).send({
                status: "success",
                contact: contactObj
            })).
                catch((err) => res.status(500).send({
                    "message": `Fail! Error -> ${err}`,
                    "status": "error"
                }));

        }).
            catch((err) => res.status(500).send({
                "message": `Fail! Error -> ${err}`,
                "status": "error"
            }));

    }).
        catch((err) => res.status(500).send({
            "message": `Fail! Error -> ${err}`,
            "status": "error"
        }));

};

exports.update = (req, res) => {

    User.findById(req.userId).then((user) => {

        if (!user) {

            return res.status(400).send({
                "message": "You're not logged in",
                "status": "error"
            });

        }

        user.getContacts({
            where: {
                id: req.params.contactId
            }
        }).then((contacts) => {

            if (!contacts) {

                return res.status(404).send({
                    "message": "No contact found",
                    "status": "error"
                });

            }

            const contact = contacts[0];

            const att = Object.keys(req.body);
            att.forEach((key) => {

                contact[key] = req.body[att];

            });

            contact.save({
                fields: att
            }).then((contactObj) => res.status(200).send({
                status: "success",
                contact: contactObj
            })).
                catch((err) => res.status(500).send({
                    "message": `Fail! Error -> ${err}`,
                    "status": "error"
                }));

        }).
            catch((err) => res.status(500).send({
                "message": `Fail! Error -> ${err}`,
                "status": "error"
            }));

    }).
        catch((err) => res.status(500).send({
            "message": `Fail! Error -> ${err}`,
            "status": "error"
        }));

};

exports.starred = (req, res) => {

    User.findById(req.userId).then((user) => {

        if (!user) {

            return res.status(200).send({
                "message": "No contacts found",
                "status": "success"
            });

        }

        user.getContacts({
            where: {
                starred: true
            }
        }).then((contacts) => {

            res.status(200).send({
                "status": "success",
                contacts
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
