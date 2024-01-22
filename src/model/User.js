const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  mensalIncomeBills: {
    type: String,
    default: 0,
  },

  bills: [
    {
      name: String,
      price: Number,
      date: String,
      observation: String,
      paid: {
        type: Boolean,
        default: false,
      },
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
