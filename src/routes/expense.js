const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const expenseController = require("../controllers/expenseController");

router.post("/add-expense", verifyToken, expenseController.addExpense);
router.get("/get-expense", verifyToken, expenseController.getExpense);

module.exports = router;
