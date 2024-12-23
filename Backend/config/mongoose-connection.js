const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/PM");
    console.log("MongoDB connected",conn.connect);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
