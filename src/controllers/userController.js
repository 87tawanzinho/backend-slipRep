const UserModel = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userCreate = async (req, res) => {
  const { name, password, email } = req.body;
  if (!name || !password) {
    return res.status(400).json({ msg: "Email and senha it's ok?" });
  }

  const nameExist = await UserModel.findOne({ name: req.body.name });

  if (nameExist) {
    return res.status(400).json({ msg: "User already exist." });
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
    console.log(error);
  }
};

const userLogin = async (req, res) => {
  const { name, password } = req.body;

  const user = await UserModel.findOne({ name: name });

  if (!user) {
    return res.status(400).json({ msg: "user not found." });
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(400).json({ msg: "password is incorrect" });
  }

  try {
    const secret = process.env.ULTRA_SECRET_TOKEN;

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      secret
    );

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ msg: "Something wrong " + error });
  }
};

module.exports = {
  userCreate,
  userLogin,
};
