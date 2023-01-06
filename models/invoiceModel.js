const mongoose = require("mongoose");
const validator = require("validator");

const invoiceSchema = new mongoose.Schema({
  Items: {
    name: {
      type: String,
    },
    value: {
      type: Number,
    },
    category: {
      type: String,
    }
  },
  date: {
    type: Date,
    required: true,
  },
  url: {
    type: String,
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);
module.exports = Invoice;