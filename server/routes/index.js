"use strict";

const verifySignUp = require("./verifySignUp");
const user = require("../controllers/user.js");

module.exports = (app) => {

    app.post("/api/user/signup", [verifySignUp.checkDuplicateEmail], user.signup);
    app.post("/api/user/signin", user.signin);

};
