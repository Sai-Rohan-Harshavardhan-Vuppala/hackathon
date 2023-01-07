const Invoice = require("../models/invoiceModel");
const catchAsync = require("./../utils/catchAsync");
const factory = require("./handleFactory");
const APIFeatures = require("../utils/apiFeatures");

exports.getInvoice = factory.getOne(Invoice);
exports.createInvoice = factory.createOne(Invoice);
exports.deleteInvoice = factory.deleteOne(Invoice);

exports.getBetweenDates = catchAsync(async (req, res, next) => {

    let filter = {};

    if (req.query.lte && req.query.gte) filter = {
        date: {
            $gte: new Date(req.query.gte),
            $lt: new Date(req.query.lte)
          }
    };
    console.log(filter, req.query)

    const doc = await Invoice.find(filter);
    console.log(doc);

    res.status(200).json({
        status: "success",
        results: doc.length,
        data: {
            doc,
        },
    });
})

exports.getMonth = catchAsync(async(req, res, next) => {
    if (req.query == undefined || req.query == {} || req.query.month == "" || req.query.year == "")
        next();
    const month = req.query.month*1;
    const year = req.query.year*1;
    const firstDate = new Date(year, month-1).toISOString();
    const lastDate = new Date(year, month).toISOString();
    
    req.query.lte = lastDate.slice(0, 10);
    req.query.gte = firstDate.slice(0, 10);
    let filter = {};

    if (req.query.lte && req.query.gte) filter = {
        $and: [{
                date: {
                    $gte: new Date(req.query.gte)
                }
            },
            {
                date: {
                    $lte: new Date(req.query.lte)
                }
            }
        ]
    };
    console.log(filter, req.query,lastDate,firstDate)

    const doc = await Invoice.find(filter);
    console.log(doc);

    res.status(200).json({
        status: "success",
        results: doc.length,
        data: {
            doc,
        },
    });
})