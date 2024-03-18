const Expense = require("../models/expense");
const User = require("../models/users");
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
  } catch (error) {}
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

    let expenses = {};

    expenses.expenses = [];
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
    expenseData.map((eachExpense, idx) => {
      if (idx < 10) {
        expenses.expenses.push(eachExpense);
      }
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
        const date = eachExpense.expenseDate.getDate();
        const expenseObj = expenses.dailyExpenses.find(
          (exp) => exp["date"] === date
        );
        if (expenseObj) {
          expenseObj["amount"] += eachExpense.amount;
        } else {
          const exp = {
            date: date,
            amount: eachExpense.amount,
          };

          expenses.dailyExpenses.push(exp);
        }
      }
      if (eachExpense.expenseDate >= last12MontsStartDate) {
        const mon = eachExpense.expenseDate.getMonth();
        const expenseObj = expenses.monthlyExpense.find(
          (exp) => exp["month"] === mon
        );
        if (expenseObj) {
          expenseObj["amount"] += eachExpense.amount;
        } else {
          const exp = {
            month: mon,
            amount: eachExpense.amount,
          };

          expenses.monthlyExpense.push(exp);
        }
      }
    });

    res.status(200).json(expenses);
  } catch (error) {}
};

module.exports.removeExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const expenseData = await Expense.findByIdAndDelete(expenseId);
    res.status(200).json(expenseData);
  } catch (error) {}
};

module.exports.filterExpense = async (req, res) => {
  try {
    const query = {};
    query.user = req.user.id;

    if (req.query.cats.length > 0) {
      const categories = req.query.cats.split(",");
      query.category = { $in: categories };
    }

    if (req.query.fromDate && req.query.toDate) {
      query.expenseDate = {
        $gte: req.query.fromDate,
        $lte: req.query.toDate,
      };
    } else if (req.query.fromDate) {
      query.expenseDate = { $gte: req.query.fromDate };
    } else if (req.query.toDate) {
      query.expenseDate = { $lte: req.query.toDate };
    }

    let expenseData = await Expense.find(query).sort({
      expenseDate: -1,
      createdAt: -1,
    });
    res.status(200).json(expenseData);
  } catch (err) {}
};

module.exports.addCat = async function (req, res) {
  try {
    const userId = req.user.id;
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { category: req.body.cat } },
      { new: true }
    );
    res.status(200).json(true);
  } catch (err) {}
};

module.exports.removeCat = async function (req, res) {
  try {
    const userId = req.user.id;
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { category: req.body.cat } },
      { new: true }
    );
    res.status(200).json(true);
  } catch (err) {}
};
