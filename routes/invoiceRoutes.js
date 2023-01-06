const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const invoiceController = require("../controllers/invoiceController");

const Router = express.Router();

Router.use(
  authController.verifyJwtToken,
  authController.protect,
  userController.putCreatedBy
);

Router.route("/:id")
  .get(invoiceController.getInvoice)
  .delete(invoiceController.deleteInvoice);

Router.post("/", invoiceController.createInvoice);

module.exports = Router;