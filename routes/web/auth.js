const express = require("express");
const {loginPage, registerPage, logoutPage, login} = require("../../app/http/controllers/web/dashboard/dashboard/auth/auth");

const router = express.Router();


router.get("/", loginPage);

router.get("/login", loginPage);

router.post("/login", login);

router.get("/register", registerPage)

router.get("/logout",logoutPage);

module.exports = { webAuthRoutes: router };