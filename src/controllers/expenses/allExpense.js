const Expense = require("../../models/expense");

async function getAllExpense(req, res) {
  try {
    const userID = req.user.id;
    const expenses = await Expense.find({ user: userID });
    return res.status(200).json(expenses);
  } catch (error) {
    return res.status(404).json({ message: "some error occured" });
  }
}

module.exports = getAllExpense;
