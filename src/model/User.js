const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,

  bills: [
    {
      name: String,
      price: String,
    },
  ],

  tickets: [
    {
      name: String,
      code: String,
      date: String,
      price: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
