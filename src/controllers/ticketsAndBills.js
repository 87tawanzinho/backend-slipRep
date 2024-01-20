const UserModel = require("../model/User");
const bcrypt = require("bcrypt");

const newBills = async (req, res) => {
  const { userName, name, price, date } = req.body;

  try {
    const userExist = await UserModel.findOne({ name: userName });
    const newBill = { name, price, date };
    await userExist.bills.push(newBill);
    await userExist.save();
    return res.status(200).json({ msg: "New bill added successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "Something wrong " + error });
  }
};

const showBills = async (req, res) => {
  const { name } = req.params;

  const userExist = await UserModel.findOne({ name: name });

  const allBills = userExist.bills;

  return res.status(200).json({ bills: allBills });
};

const deleteOneBill = async (req, res) => {
  const { userName } = req.params;
  const { id } = req.body;
  const userExist = await UserModel.findOne({ name: userName });

  userExist.bills.filter((bill) => bill._id !== id);

  await userExist.save();

  return res.status(200).json({ bills: userExist.bills });
};
module.exports = { newBills, showBills, deleteOneBill };
