const Invoice = require("../models/invoiceModel");
const factory = require("./handleFactory");

exports.getInvoice = factory.getOne(Invoice);
exports.createInvoice = factory.createOne(Invoice);
exports.deleteInvoice = factory.deleteOne(Invoice);
