require("dotenv").config();

let PORT = process.env.PORT;
// let EMAIL_USERNAME = process.env.EMAIL_USERNAME;
// let EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
// let EMAIL_PORT = process.env.EMAIL_PORT;
// let EMAIL_HOST = process.env.EMAIL_HOST;
let NODE_ENV = process.env.NODE_ENV;
let JWT_SECRET = process.env.JWT_SECRET;
let JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
let MONGODB_URI = process.env.MONGODB_URI;
let JWT_COOKIE_EXPIRES_IN = process.env.JWT_COOKIE_EXPIRES_IN;
let CLIENT_ID = process.env.CLIENT_ID;
let CLOUD_NAME = process.env.CLOUD_NAME;
let CLOUD_API_KEY = process.env.CLOUD_API_KEY;
let CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;
module.exports = {
  PORT,
  MONGODB_URI,
  NODE_ENV,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  CLOUD_NAME,
  CLOUD_API_KEY,
  CLOUD_API_SECRET,
  // EMAIL_USERNAME,
  // EMAIL_PASSWORD,
  // EMAIL_HOST,
  // EMAIL_PORT,
  JWT_COOKIE_EXPIRES_IN,
  CLIENT_ID,
};
