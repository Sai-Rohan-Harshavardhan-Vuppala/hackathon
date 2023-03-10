const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const path = require("path");
const middleware = require("./utils/middleware");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const bodyParser = require("body-parser");

const authRouter = require("./routes/authRoutes.js");
// Import necessary routers
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const fileupload = require("express-fileupload");

const app = express();

app.use(fileupload({ useTempFiles: true }));
//Some necessary middlewares
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(cookieParser());
app.use(express.urlencoded({ limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(
//   bodyParser.urlencoded({
//     limit: "50mb",
//     extended: true,
//     parameterLimit: 50000,
//   })
// );

app.use(mongoSanitize());
app.set("view engine", "html");
app.use(middleware.requestLogger);

//  For production Serving static files
// app.use(express.static(path.join(__dirname, "client/build")));

// Here write all api endpoints
// ex  app.use('/api/v1/user', userRouter)
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/invoice", invoiceRoutes);

// For production
// app.get("*", (req, res, next) => {
//     res.sendFile(path.join(__dirname, "/client/build/index.html"));
//   });

// This will occur if there is no endpoint matching
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
