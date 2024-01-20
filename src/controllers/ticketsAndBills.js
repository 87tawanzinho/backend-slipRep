const UserModel = require("../model/User");
const bcrypt = require("bcrypt");

const newBills = async (req, res) => {
  const { userName, name, price } = req.body;

  const userExist = await UserModel.findOne({ name: userName });
  const newBill = { name, price };
  await userExist.bills.push(newBill);
  await userExist.save();
  return res.status(200).json({ msg: "New bill added successfully" });
};

const showBills = async (req, res) => {
  const { name } = req.params;

  const userExist = await UserModel.findOne({ name: name });

  const allBills = userExist.bills;

  return res.status(200).json({ bills: allBills });
};
module.exports = { newBills, showBills };
