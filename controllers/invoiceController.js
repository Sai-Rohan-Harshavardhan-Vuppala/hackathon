const Invoice = require("../models/invoiceModel");
const User = require("../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const User = require("../models/userModel");
const factory = require("./handleFactory");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("./cloudinary");
const Client = require("@veryfi/veryfi-sdk");

var multer = require("multer");
const AppError = require("../utils/appError");
exports.getInvoice = factory.getOne(Invoice);
exports.deleteInvoice = factory.deleteOne(Invoice);

exports.createInvoice = catchAsync(async (req, res, next) => {

    // Todo:test
    const { items, url } = req.body;
    const doc = await Invoice.create(req.body);

    // remember to add to user
    await User.findByIdAndUpdate(req.body.createdBy,{ $push: { invoices: doc._id  }})

    res.status(201).json({
      status: "success",
      data: {
        doc,
      },
    });
});

const client_id = "vrfvrpfoGYLkmnbxnzWh34S3hhDT5EY5odFD3ep";
const client_secret = "vrfvrpfoGYLkmnbxnzWh34S3hhDT5EY5odFD3ep";
const username = "raj.karthikeya2002";
const api_key = "d4132de4e2ebfd217e49cea1ff6d1ad3";

let veryfi_client = new Client(client_id, client_secret, username, api_key);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

exports.getBetweenDates = catchAsync(async (req, res, next) => {
  let filter = {};

  if (req.query.lte && req.query.gte)
    filter = {
      date: {
        $gte: new Date(req.query.gte),
        $lt: new Date(req.query.lte),
      },
    };
  console.log(filter, req.query);

  const doc = await Invoice.find(filter);
  console.log(doc);

  res.status(200).json({
    status: "success",
    results: doc.length,
    data: {
      doc,
    },
  });
});

exports.getMonth = catchAsync(async (req, res, next) => {
  if (
    req.query == undefined ||
    req.query == {} ||
    req.query.month == "" ||
    req.query.year == ""
  )
    next();
  const month = req.query.month * 1;
  const year = req.query.year * 1;
  const firstDate = new Date(year, month - 1).toISOString();
  const lastDate = new Date(year, month).toISOString();

  req.query.lte = lastDate.slice(0, 10);
  req.query.gte = firstDate.slice(0, 10);
  let filter = {};

  if (req.query.lte && req.query.gte)
    filter = {
      $and: [
        {
          date: {
            $gte: new Date(req.query.gte),
          },
        },
        {
          date: {
            $lte: new Date(req.query.lte),
          },
        },
      ],
    };
  console.log(filter, req.query, lastDate, firstDate);

  const doc = await Invoice.find(filter);
  console.log(doc);

  res.status(200).json({
    status: "success",
    results: doc.length,
    data: {
      doc,
    },
  });
});

exports.processFile = catchAsync(async (req, res, next) => {
  const file = req.body.file;
  console.log(file != undefined);

  const result = await cloudinary.uploader.upload(file, { folder: "invoices" });

  if (!result) {
    return new AppError("Something wrong", 404);
  }

  const data = await veryfi_client.process_document_url(result.url);
  console.log(data);
  if (!data) {
    return new AppError("Something wrong", 404);
  }

  const items = data.line_items.map((item) => {
    return {
      id: item.id,
      name: item.description,
      value: item.total,
    };
  });

  console.log(items);

  res.status(200).json({
    items: items,
    url: result.url,
  });
});
