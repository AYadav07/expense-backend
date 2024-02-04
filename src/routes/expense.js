const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const expenseController = require("../controllers/expenseController");

router.post("/add-expense", verifyToken, expenseController.addExpense);
router.get("/get-expense", verifyToken, expenseController.getExpense);
router.delete(
  "/remove-expense/:id",
  verifyToken,
  expenseController.removeExpense
);

router.get("/get-expense-data", verifyToken, expenseController.filterExpense);
router.post("/add-category", verifyToken, expenseController.addCat);
router.post("/remove-category", verifyToken, expenseController.removeCat);

module.exports = router;
