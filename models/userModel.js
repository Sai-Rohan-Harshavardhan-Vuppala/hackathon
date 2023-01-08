const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
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
    invoices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Invoice",
      },
    ],
    targets: [
      {
        _id: false,
        categories: [
          {
            type: String,
          },
        ],
        startDate: {
          type: String,
        },
        endDate: {
          type: String,
        },
        amount: {
          type: Number,
        },
        name: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
