const UserModel = require("../model/User");

const newBills = async (req, res) => {
  const { userName, name, price, date, observation } = req.body;

  try {
    const userExist = await UserModel.findOne({ name: userName });
    const newBill = { name, price, date, observation };
    userExist.bills.push(newBill);
    await userExist.save();
    return res.status(200).json({ msg: "New bill added successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "Something wrong " + error });
  }
};

const newSlips = async (req, res) => {
  const { userName, name, price, date, code } = req.body;

  try {
    const userExist = await UserModel.findOne({ name: userName });
    const newSlip = { name, price, date, code };
    await userExist.tickets.push(newSlip);
    await userExist.save();
    return res.status(200).json({ msg: "New ticket added successfully" });
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

const showSlips = async (req, res) => {
  const { name } = req.params;

  const userExist = await UserModel.findOne({ name: name });

  const allTickets = userExist.tickets;

  return res.status(200).json({ tickets: allTickets });
};

const showBillById = async (req, res) => {
  const { name, id } = req.params;

  const userExist = await UserModel.findOne({ name: name });

  const bill = userExist.bills.filter((bill) => bill._id.toString() === id);

  return res.status(200).json({ bill });
};

const deleteOneBill = async (req, res) => {
  const { userName } = req.params;
  const { id } = req.body;

  try {
    const userExist = await UserModel.findOne({ name: userName });

    if (!userExist) {
      return res.status(404).json({ error: "User not found" });
    }

    userExist.bills = userExist.bills.filter(
      (bill) => bill._id.toString() !== id
    );

    await userExist.save();

    return res.status(200).json({ bills: userExist.bills });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteOneSlip = async (req, res) => {
  const { userName } = req.params;
  const { id } = req.body;

  try {
    const userExist = await UserModel.findOne({ name: userName });

    if (!userExist) {
      return res.status(404).json({ error: "User not found" });
    }

    userExist.tickets = userExist.tickets.filter(
      (slip) => slip._id.toString() !== id
    );

    await userExist.save();

    return res.status(200).json({ tickets: userExist.tickets });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const changeNameOfBill = async (req, res) => {
  const { userName, id, name } = req.body;

  try {
    const userExist = await UserModel.findOne({ name: userName });

    if (!userExist) {
      return res.status(400).json("User not exist.");
    }

    const thisBill = userExist.bills.find((bill) => bill._id.toString() === id);

    if (!thisBill) {
      return res.status(400).json("This bill doesn't exist.");
    }

    thisBill.name = name;

    await userExist.save();

    return res.status(201).json("Updated. " + name);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getMonthlyExpenses = async (req, res) => {
  const { name } = req.params;

  const currentDate = new Date();
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  const userExist = await UserModel.findOne({ name: name });
  if (!userExist) {
    return res.status(404).json("User not found");
  }

  try {
    const MonthlyExpenses = userExist.bills.filter(
      (bill) => bill.created_at >= startOfMonth && bill.created_at <= endOfMonth
    );

    return res.status(200).json(MonthlyExpenses);
  } catch (error) {
    return res.status(500).json("Erro" + error);
  }
};
const getMonthlyExpensesByFilter = async (req, res) => {
  const { name, month, year } = req.params;

  const monthNumber = new Date(Date.parse(month + " 1, " + year)).getMonth();

  const startOfMonth = new Date(year, monthNumber, 1);
  const endOfMonth = new Date(year, monthNumber + 1, 0);

  const userExist = await UserModel.findOne({ name: name });
  if (!userExist) {
    return res.status(404).json("Usuário não encontrado");
  }

  try {
    const MonthlyExpenses = userExist.bills.filter(
      (bill) => bill.created_at >= startOfMonth && bill.created_at <= endOfMonth
    );

    return res.status(200).json(MonthlyExpenses);
  } catch (error) {
    return res.status(500).json("Erro: " + error);
  }
};

const paidBillOrNo = async (req, res) => {
  const { name } = req.params;
  const { id, interest, date, paymentMethod } = req.body;

  try {
    const userExist = await UserModel.findOne({ name: name });

    if (!userExist) {
      return res.status(404).json("User not found.");
    }

    const billChange = userExist.bills.find(
      (bill) => bill._id.toString() === id
    );

    if (!billChange) {
      return res.status(404).json({ error: "Bill not found" });
    }

    billChange.paid = !billChange.paid;
    if (billChange.paid === true) {
      billChange.datePayment = date;
      billChange.interest = interest >= 0 ? interest : 0;
      billChange.totalPriceWithInterest =
        billChange.price + billChange.interest;
      billChange.paymentMethod = paymentMethod;
    } else {
      billChange.datePayment = "Não definida";
      billChange.totalPriceWithInterest = 0;
      billChange.interest = 0;
      billChange.paymentMethod = "Não definido";
    }
    await userExist.save();

    return res.status(200).json({ bills: userExist.bills });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
};

const paidSlipOrNo = async (req, res) => {
  const { name } = req.params;
  const { id } = req.body;
  try {
    const userExist = await UserModel.findOne({ name: name });

    if (!userExist) {
      return res.status(404).json("User not found.");
    }

    const ticketStatusChange = userExist.tickets.find(
      (ticket) => ticket._id.toString() === id
    );

    if (!ticketStatusChange) {
      return res.status(404).json({ error: "ticket not found" });
    }

    ticketStatusChange.paid = !ticketStatusChange.paid;

    await userExist.save();

    return res.status(200).json({ tickets: userExist.tickets });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  newBills,
  showBills,
  showBillById,
  deleteOneBill,
  deleteOneSlip,
  showSlips,
  newSlips,
  paidBillOrNo,
  paidSlipOrNo,
  changeNameOfBill,
  getMonthlyExpenses,
  getMonthlyExpensesByFilter,
};
