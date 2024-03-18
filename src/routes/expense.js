const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const expenseController = require("../controllers/expenseController");
const getAllExpense = require("../controllers/expenses/allExpense");
const verifyHeaderToken = require("../middlewares/verifyHeaderToken");

router.post("/add-expense", verifyHeaderToken, expenseController.addExpense);
router.get("/get-expense", verifyHeaderToken, expenseController.getExpense);
router.delete(
  "/remove-expense/:id",
  verifyHeaderToken,
  expenseController.removeExpense
);

router.get(
  "/get-expense-data",
  verifyHeaderToken,
  expenseController.filterExpense
);
router.post("/add-category", verifyHeaderToken, expenseController.addCat);
router.post("/remove-category", verifyHeaderToken, expenseController.removeCat);

router.get("/get-all-expenses", verifyHeaderToken, getAllExpense);

module.exports = router;
