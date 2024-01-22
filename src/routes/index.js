const {
  newBills,
  showBills,
  deleteOneBill,
  showBillById,
  showSlips,
  newSlips,
  paidBillOrNo,
} = require("../controllers/ticketsAndBills");
const {
  userCreate,
  userLogin,
  newIncomeBills,
  newIncomeTickets,
} = require("../controllers/userController");
const UserModel = require("../model/User");
const router = require("express").Router();

router.get("/", async (req, res) => {
  const users = await UserModel.find();
  return res.status(200).json(users);
});

router.post("/", userCreate);
router.post("/login", userLogin);
router.put("/newIncomeBills", newIncomeBills);
router.put("/newIncomeTickets", newIncomeTickets);
router.put("/newBill", newBills);
router.put("/newSlip", newSlips);
router.get("/showBills/:name", showBills);
router.get("/showSlips/:name", showSlips);
router.get("/showBillById/:name/:id", showBillById);
router.put("/deleteOneBill/:userName", deleteOneBill);
<<<<<<< HEAD
router.put("/deleteOneSlip/:userName", deleteOneSlip);
=======
router.put("/paidBillOrNo/:userName", paidBillOrNo);
>>>>>>> 57dfda44e03d45318d8615f77f6ba06b8ee6dcaf
module.exports = router;
