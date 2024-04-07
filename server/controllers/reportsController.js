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

const expenseAndIncomeByCategories = async (year,month) => {
  console.log(year,month)

  const totalExpensesByCategory = await Expense.aggregate([
    {
      $match: {
        date:{
          $gte:new Date(`${year}-${month}-01`),
          $lt:new Date(`${year}-${month+1}-01`)   
        }
      }
    },
    {
      $lookup: {
        from: "categories",
        localField: "categoryid",
        foreignField: "_id",
        as: "categoryDetails"
      }
    },
    {
      $unwind: "$categoryDetails"
    },
    {
      $group: {
        _id: "$categoryid",
        categoryName:{$first:"$categoryDetails.type"},
        totalAmount:{$sum:"$amount"}
      }
    }
    
  ]);
  const totalIncomeByCategory = await Incomes.aggregate([
    {
      $match: {
        date:{
          $gte:new Date(`${year}-${month}-01`),
          $lt:new Date(`${year}-${month+1}-01`)   
        }
      }
    },
    {
      $lookup: {
        from: "incomecategories",
        localField: "categoryid",
        foreignField: "_id",
        as: "categoryDetails"
      }
    },
    {
      $unwind: "$categoryDetails"
    },
    {
      $group: {
        _id: "$categoryid",
        categoryName:{$first:"$categoryDetails.type"},
        totalAmount:{$sum:"$amount"}
      }
    }
    
  ]);
  
  return {expenseCategories:totalExpensesByCategory, incomeCategories:totalIncomeByCategory}
};

// main function that will send all data to the frontend.
const getMonthlyReport = async (req,res) => {
  const {year,month} = req.body;
  try{
    // getting total expense and income for the current month.
    const totalIncomeAndExpenses = await totalExpenseAndIncomeForMonth(year,month);
    const categoryData = await expenseAndIncomeByCategories(year,month);
    res.status(200).json({total:totalIncomeAndExpenses,categories:categoryData});
  }
  catch(error){
    res.status(500).json({message:error});
  }

};

module.exports = {
  getMonthlyReport,
};
