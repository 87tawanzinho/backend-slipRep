const UserModel = require("../model/User");
const userCreate = async (req, res) => {
  if (!req.body.name || !req.body.password) {
    return res.status(400).json({ msg: "Email and senha it's ok?" });
  }

  const nameExist = await UserModel.findOne({ name: req.body.name });

  if (nameExist) {
    return res.status(400).json({ msg: "User already exist." });
  }
  try {
    const user = {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    };

    const response = await UserModel.create(user);

    return res.status(201).json({ msg: "Created. " + response });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  userCreate,
};
