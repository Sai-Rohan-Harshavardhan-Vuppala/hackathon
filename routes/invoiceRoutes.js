const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const invoiceController = require("../controllers/invoiceController");
const upload = require("./../controllers/upload");
const Router = express.Router();

Router.route("/month").get(invoiceController.getMonth);
Router.route("/date").get(invoiceController.getBetweenDates);
Router.use(authController.verifyJwtToken, authController.loggedInUser);
Router.route("/invoice-file").post(invoiceController.processFile);
Router.use(userController.putCreatedBy);

Router.route("/:id")
  .get(invoiceController.getInvoice)
  .delete(invoiceController.deleteInvoice);

Router.post("/create", invoiceController.createInvoice);

module.exports = Router;
