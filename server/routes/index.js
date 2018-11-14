"use strict";

const verifySignUp = require("./verifySignUp");
const verifyJwtToken = require("./verifyJwtToken");
const user = require("../controllers/user.js");

module.exports = (app) => {

    app.post("/api/user/signup", [verifySignUp.checkDuplicateEmail], user.signup);
    app.post("/api/user/login", user.signin);
    app.post("/api/user/logout", [verifyJwtToken.verifyToken], user.signout);

    app.post("/api/contact", [verifyJwtToken.verifyToken], user.addContact);

};
