const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const Router = express.Router();

Router.use(authController.verifyJwtToken);
Router.use(authController.loggedInUser);

Router.post("/new-target", userController.addTarget);
Router.get("/targets", userController.getTargets);
Router.get("/:id", userController.getUser);

Router.get("/me", userController.getMy);

Router.patch(
  "/update/:id",
  // authController.restrictTo("admin"),
  userController.updateUser
);

module.exports = Router;
