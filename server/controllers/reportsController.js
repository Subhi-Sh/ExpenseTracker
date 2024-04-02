const Expense = require("../model/Expneses");
const Category = require("../model/Categories");
const Incomes = require("../model/Incomes");
const IncomeCategory = require("../model/IncomeCategories");

const totalExpenseAndIncomeForMonth = async () => {
  // get the current month and year.
  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  const expensesForMonth = await Expense.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(`${year}-${month}-01`),
          $lt: new Date(`${year}-${month + 1}-01`),
        },
      },
    },
    {
      $group: {
        _id: "$date",
        total: { $sum: "$amount" },
      },
    },
  ]);
  const incomeForMonth = await Incomes.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(`${year}-${month}-01`),
          $lt: new Date(`${year}-${month + 1}-01`),
        },
      },
    },
    {
      $group: {
        _id: "$date",
        total: { $sum: "$amount" },
      },
    },
  ]);
  return { totalExpense: expensesForMonth, totalIncome: incomeForMonth };
};

const biggestIncomeAndExpenseCategories = async () => {
  // get the current month and year.
  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  const mostExpensiveCategory = await Expense.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(`${year}-${month}-01`),
          $lt: new Date(`${year}-${month + 1}-01`),
        },
      },
    },
    {
      $group: {
        _id: "$categoryid",
        categoryName: { $first: "$categoryid" },
        totalAmount: { $sum: "$amount" },
      },
    },
    {
      $sort: {
        totalAmount: -1,
      },
    },
    {
      $limit: 1,
    },
    {
      $lookup: {
        from: "categories",
        localField: "_id",
        foreignField: "_id",
        as: "categoryDetails",
      },
    },
    {
      $project: {
        _id: 0,
        categoryName: { $arrayElemAt: ["$categoryDetails.type", 0] },
        totalAmount: 1,
      },
    },
  ]);
  const bestIncomeCategory = await Incomes.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(`${year}-${month}-01`),
          $lt: new Date(`${year}-${month + 1}-01`),
        },
      },
    },
    {
      $group: {
        _id: "$categoryid",
        categoryName: { $first: "$categoryid" },
        totalAmount: { $sum: "$amount" },
      },
    },
    {
      $sort: {
        totalAmount: -1,
      },
    },
    {
      $limit: 1,
    },
    {
      $lookup: {
        from: "incomecategories",
        localField: "_id",
        foreignField: "_id",
        as: "categoryDetails",
      },
    },
    {
      $project: {
        _id: 0,
        categoryName: { $arrayElemAt: ["$categoryDetails.type", 0] },
        totalAmount: 1,
      },
    },
  ]);

  return {expenseCategory:mostExpensiveCategory, incomeCategory:bestIncomeCategory}
};

// main function that will send all data to the frontend.
const getMonthlyReport = async () => {
  // getting total expense and income for the current month.
  const totalIncomeAndExpenses = await totalExpenseAndIncomeForMonth();
  const categoryData = await biggestIncomeAndExpenseCategories();

  console.log(categoryData);
};

module.exports = {
  getMonthlyReport,
};
