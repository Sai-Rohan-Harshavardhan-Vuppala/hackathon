const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const invoiceController = require("../controllers/invoiceController");

const Router = express.Router();


Router.route("/month").get(invoiceController.getMonth);
Router.route("/date").get(invoiceController.getBetweenDates);
Router.use(
  authController.verifyJwtToken,
  authController.loggedInUser,
  userController.putCreatedBy
);

Router.route("/:id")
  .get(invoiceController.getInvoice)
  .delete(invoiceController.deleteInvoice);


Router.post("/", invoiceController.createInvoice);

module.exports = Router;