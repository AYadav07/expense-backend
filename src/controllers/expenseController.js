const Expense = require("../models/expense");
const dates = require("../utils/dateTimes");

module.exports.addExpense = async (req, res) => {
  try {
    const expense = req.body;
    expense.user = req.user.id;
    if (!expense.expenseDate) {
      expense.expenseDate = new Date();
    }
    const expenseData = await Expense.create(expense);
    res.status(200).json(expenseData);
  } catch (error) {
    console.log(error);
  }
};

module.exports.getExpense = async (req, res) => {
  try {
    const lastOneYearStartDate = dates.getLastYearDate();
    const expenseData = await Expense.find({
      user: req.user.id,
      expenseDate: { $gte: lastOneYearStartDate },
    }).sort({
      expenseDate: -1,
      createdAt: -1,
    });

    console.log(expenseData);

    let expenses = {};

    expenses.todayExpense = [];
    expenses.todayTotalExpense = 0;
    expenses.yesterdayExpense = [];
    expenses.yesterdaytodayTotalExpense = 0;
    expenses.thisWeekTotalExpense = 0;
    expenses.lastWeekTotalExpense = 0;
    expenses.thisMonthTotalExpense = 0;
    expenses.lastMonthTotalExpense = 0;
    expenses.lastOneYearExpense = 0;
    expenses.monthlyExpense = [];
    expenses.dailyExpenses = [];

    const todayDate = dates.getTodayDate();
    const yesterdayDate = new Date(
      todayDate.getFullYear(),
      todayDate.getMonth(),
      todayDate.getDate() - 1
    );
    const lastSundayDate = dates.getLastSundayDate();
    const prevSundayDate = new Date(
      lastSundayDate.getFullYear(),
      lastSundayDate.getMonth(),
      lastSundayDate.getDate() - 7
    );

    const thisMonthStartDate = dates.getThisMonth();
    const lastMonthStartDate = dates.getLastMonth();
    const last12MontsStartDate = dates.get12MonthsDate();
    const last30daysStartDate = dates.getLastOneMonth();
    expenseData.map((eachExpense) => {
      if (eachExpense.expenseDate >= todayDate) {
        expenses.todayExpense.push(eachExpense);
        expenses.todayTotalExpense += eachExpense.amount;
      } else if (eachExpense.expenseDate >= yesterdayDate) {
        expenses.yesterdayExpense.push(eachExpense);
        expenses.yesterdaytodayTotalExpense += eachExpense.amount;
      }

      if (eachExpense.expenseDate >= lastSundayDate) {
        expenses.thisWeekTotalExpense += eachExpense.amount;
      } else if (eachExpense.expenseDate >= prevSundayDate) {
        expenses.lastWeekTotalExpense += eachExpense.amount;
      }

      if (eachExpense.expenseDate >= thisMonthStartDate) {
        expenses.thisMonthTotalExpense += eachExpense.amount;
      } else if (eachExpense.expenseDate >= lastMonthStartDate) {
        expenses.lastMonthTotalExpense += eachExpense.amount;
      }
      expenses.lastOneYearExpense += eachExpense.amount;
      if (eachExpense.expenseDate >= last30daysStartDate) {
        console.log("Do it later");
      }
      if (eachExpense.expenseDate >= last12MontsStartDate) {
        console.log("Do it later");
      }
    });

    console.log(expenses);
    res.status(200).json(expenses);
  } catch (error) {
    console.log(error);
  }
};

module.exports.removeExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const expenseData = await Expense.findByIdAndDelete(expenseId);
    res.status(200).json(expenseData);
  } catch (error) {
    console.log(error);
  }
};
