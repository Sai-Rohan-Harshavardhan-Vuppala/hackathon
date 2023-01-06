const express = require("express");
const authController = require("../controllers/authController");

const Router = express.Router();

Router.post("/login", authController.googleLogin);
Router.post("/logout", authController.logout);

module.exports = Router;