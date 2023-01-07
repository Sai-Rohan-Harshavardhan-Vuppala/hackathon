const User = require("../models/userModel");
const factory = require("./handleFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.putCreatedBy = (req, res, next) => {
  console.log(req.body, "backend");
  if (!req.body.isPrivate) req.body.createdBy = req.user._id;

  next();
};

exports.putUserInParams = catchAsync(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});

exports.logout = catchAsync(async (req, res, next) => {});

exports.getUser = factory.getOne(User, "invoices");

exports.updateUser = factory.updateOne(User);

exports.getMy = catchAsync(async (req, res, next) => {
  // Todo:test
  const doc = await User.findById(req.user._id).populate("invoices");
  res.status(201).json({
    status: "success",
    data: {
      doc,
    },
  });
});