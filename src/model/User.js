const mongoose = require("mongoose");
const cron = require("node-cron"); // Make sure to import the cron library
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
      interest: {
        type: Number,
        default: 0,
      },
      datePayment: {
        type: String,
        default: "Não Definida",
      },
      totalPriceWithInterest: {
        type: Number,
        default: 0,
      },
      paymentMethod: {
        type: String,
        default: "Não definido.",
      },
      created_at: {
        type: Date,
        default: Date.now(),
      },
    },
  ],

  tickets: [
    {
      name: String,
      code: String,
      date: String,
      price: Number,
      paid: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
