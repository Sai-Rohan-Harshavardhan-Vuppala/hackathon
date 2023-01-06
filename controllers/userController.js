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

exports.getMe = catchAsync(async (req, res, next) => {
  let user = await User.findOne({ email: req.user.email });

  if (!user) {
    user = await User.create({
      email: req.user.email,
      firstname: req.user.given_name,
      lastname: req.user.family_name,
      img: req.user.picture,
    });
  }

  res.send(user);

  // next();
});

exports.getUser = factory.getOne(User);

exports.updateUser = factory.updateOne(User);