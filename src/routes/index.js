const { userCreate } = require("../controllers/userController");
const UserModel = require("../model/User");
const router = require("express").Router();

router.get("/", async (req, res) => {
  const users = await UserModel.find();
  return res.status(200).json(users);
});

router.post("/", userCreate);

module.exports = router;
