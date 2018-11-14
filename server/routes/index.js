"use strict";

const verifySignUp = require("./verifySignUp");
const verifyJwtToken = require("./verifyJwtToken");
const user = require("../controllers/user.js");
const contact = require("../controllers/contact.js");

module.exports = (app) => {

    app.post("/api/user/signup", [verifySignUp.checkDuplicateEmail], user.signup);
    app.post("/api/user/login", user.signin);
    app.post("/api/user/logout", [verifyJwtToken.verifyToken], user.signout);

    app.post("/api/contacts", [verifyJwtToken.verifyToken], contact.store);
    app.get("/api/contacts", [verifyJwtToken.verifyToken], contact.index);
    app.get("/api/contacts/:contactId", contact.view);
    app.delete("/api/contacts/:contactId", contact.delete);

};
