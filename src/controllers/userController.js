const UserModel = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userCreate = async (req, res) => {
  const { name, password, email } = req.body;
  if (!name || !password || !email) {
    return res.status(400).json({
      message: "Preencha todos os dados.",
    });
  }

  const nameExist = await UserModel.findOne({ name: req.body.name });

  if (nameExist) {
    return res.status(400).json({ message: "Usuário já existe." });
  }
  try {
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = {
      email,
      name,
      password: passwordHash,
    };

    const response = await UserModel.create(user);

    await response.save();

    return res.status(201).json({ msg: "Created. " + response });
  } catch (error) {
    return res.status(500).json({ message: "Algo deu errado." });
  }
};

const userLogin = async (req, res) => {
  const { name, password } = req.body;

  const user = await UserModel.findOne({ name: name });

  if (!user) {
    return res.status(400).json({ message: "Usuário não encontrado." });
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(400).json({ message: "Senha incorreta" });
  }

  try {
    const secret = process.env.ULTRA_SECRET_TOKEN;

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        mensalIncomeBills: user.mensalIncomeBills,
        mensalIncomeTickets: user.mensalIncomeTickets,
      },
      secret
    );

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ msg: "Something wrong " + error });
  }
};

const newIncomeBills = async (req, res) => {
  const { name, mensalIncomeBills } = req.body;

  const user = await UserModel.findOne({ name: name });

  if (!user) {
    return res.status(400).json({ msg: "user not found" });
  }

  await user.updateOne({ mensalIncomeBills: mensalIncomeBills });
  return res.status(201).json({ msg: "Mensal Incomes updated" });
};

const newIncomeTickets = async (req, res) => {
  const { name, mensalIncomeTickets } = req.body;

  const user = await UserModel.findOne({ name: name });

  if (!user) {
    return res.status(400).json({ msg: "user not found" });
  }

  await user.updateOne({ mensalIncomeTickets: mensalIncomeTickets });
  return res.status(201).json({ msg: "Mensal Incomes updated" });
};
module.exports = {
  userCreate,
  userLogin,
  newIncomeBills,
  newIncomeTickets,
};
