const mongoose = require("mongoose");
require("dotenv").config();
async function main() {
  try {
    await mongoose.connect(process.env.CONNECT);
    console.log("success");
  } catch (error) {
    console.log("fail " + error);
  }
}

module.exports = main;
