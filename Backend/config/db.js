const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv").config();

exports.dbConnect = () => {
    mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("✅ MongoDB connected");
    })
    .catch((err) => {
      console.log("❌ MongoDB connection failed", err);
    });
}


