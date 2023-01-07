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

exports.getUser = factory.getOne(User);

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

exports.addTarget = catchAsync(async (req, res, next) => {
  const data = req.body;
  console.log(data);
  const doc = await User.findByIdAndUpdate(req.user.id, {
    $push: { targets: data },
  });

  res.status(200).json({
    status: "success",
  });
});

exports.getTargets = catchAsync(async (req, res, next) => {
  const data = await User.findById(req.user.id).populate("invoices");

  let targets = data.targets;
  const invoices = data.invoices;

  if (targets == null) targets = [];

  let targetsNew = [];

  for (let target of targets) {
    target = { ...target.toObject(), spent: 0 };
    console.log(target.categories);
    for (let invoice of invoices) {
      for (let item of invoice.items) {
        console.log(item.category);
        if (target.categories.includes(item.category))
          target.spent += item.value;
      }
    }
    targetsNew.push(target);
  }

  res.status(200).json({
    data: targetsNew,
    status: "success",
  });
});
