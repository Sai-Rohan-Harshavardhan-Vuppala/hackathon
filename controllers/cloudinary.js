const cloudinary = require("cloudinary").v2;
const config = require("./../utils/config");

cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.CLOUD_API_KEY,
  api_secret: config.CLOUD_API_SECRET,
});

module.exports = cloudinary;
