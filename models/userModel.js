const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  invoices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Invoice",
  }]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;