const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  mensalIncomeBills: Number,
  mensalIncomeTickets: Number,
  bills: [
    {
      name: String,
      price: Number,
      date: String,
    },
  ],

  tickets: [
    {
      name: String,
      code: String,
      date: String,
      price: Number,
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
