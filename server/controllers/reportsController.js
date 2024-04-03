const Expense = require("../model/Expneses");
const Incomes = require("../model/Incomes");

const totalExpenseAndIncomeForMonth = async (year,month) => {

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
        _id: {$month:"$date"},
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
        _id: {$month:"$date"},
        total: { $sum: "$amount" },
      },
    },
  ]);
  return { totalExpense: expensesForMonth, totalIncome: incomeForMonth };
};

const biggestIncomeAndExpenseCategories = async (year,month) => {


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
const getMonthlyReport = async (req,res) => {
  const {year,month} = req.body;
  console.log(req.body);
  try{
    // getting total expense and income for the current month.
    const totalIncomeAndExpenses = await totalExpenseAndIncomeForMonth(year,month);
    const categoryData = await biggestIncomeAndExpenseCategories(year,month);
    console.log(totalIncomeAndExpenses, categoryData);
    res.status(200).json({total:totalIncomeAndExpenses,categories:categoryData});
  }
  catch(error){
    res.status(500).json({message:error});
  }

};

module.exports = {
  getMonthlyReport,
};
