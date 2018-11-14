"use strict";

const verifySignUp = require("./verifySignUp");
const verifyJwtToken = require("./verifyJwtToken");
const user = require("../controllers/user.js");
const contact = require("../controllers/contact.js");

module.exports = (app) => {

    app.post("/api/user/signup", [verifySignUp.checkDuplicateEmail], user.signup);
    app.post("/api/user/login", user.signin);
    app.post("/api/user/logout", [verifyJwtToken.verifyToken], user.signout);

    app.post("/api/contact", [verifyJwtToken.verifyToken], contact.store);
    app.get("/api/contact", [verifyJwtToken.verifyToken], contact.index);
    app.get("/api/contact/:contactId", [verifyJwtToken.verifyToken], contact.view);
    app.delete("/api/contact/:contactId", [verifyJwtToken.verifyToken], contact.delete);
    app.patch("/api/contact/:contactId/star", [verifyJwtToken.verifyToken], contact.star);
    app.patch("/api/contact/:contactId", [verifyJwtToken.verifyToken], contact.update);
    app.get("/api/contacts/starred", [verifyJwtToken.verifyToken], contact.starred);

};
