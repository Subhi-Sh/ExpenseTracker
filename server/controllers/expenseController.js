const Expense = require("../model/Expneses");

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({});
    if (!expenses) {
      res.status(404).json({ message: "No Expenses Found" });
    }
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addExpense = async (req, res) => {
  console.log(req.body);
  try {
    const expense = await Expense.create(req.body);
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findByIdAndDelete(id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    return res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getLastExpenses = async (req, res) => {
  try {
    const { amount } = req.params;
    console.log(amount);
    const expenses = await Expense.find()
      .sort({ date: -1 })
      .limit(parseInt(amount));

    if (expenses.length === 0) {
      return res.status(404).json({ message: "No Expenses found" });
    }

    return res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getExpensesCountPerCategory = async (req, res) => {
  try {
    const result = await Expense.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryid",
          foreignField: "_id",
          as: "cat",
        },
      },
      {
        $unwind: "$cat",
      },
      {
        $group: {
          _id: "$categoryid",
          category_type: { $first: "$cat.type" },
          count: { $sum: 1 },
          color: { $first: "$cat.color" },
        },
      },
      {
        $project: {
          _id: 0,
          category_type: 1,
          count: 1,
          color: 1,
        },
      },
    ]);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// query to find the sum of expenses for each month of the given year.
const sumExpensesPerMonthForSelectedYear = async (req, res) => {
  const { year } = req.body;
  try {
    const result = await Expense.aggregate([
      {
        // Find all documents that match the given year.
        $match: {
          date: {
            $gte: new Date(`${year}-01-01`),
            $lt: new Date(`${parseInt(year)+1}-01-01`),
          },
        },
      },
      // extract the month of each document's date and put it in the month key, and include the amount of spendings.
      {
        $project: {
          month: { $month: "$date" },
          amount: 1,
        },
      },
      // group the documents by the month and sum each document's expense amount
      {
        $group: {
          _id: "$month",
          expensesForMonth: { $sum: "$amount" },
        },
      },
      // project the documents by renaming the month's key to monthNumber and include the expensesForMonth 
      {
        $project: {
          _id: 0,
          monthNumber: "$_id",
          expensesForMonth: 1,
        },
      },
      {
        $sort:{
          monthNumber:1
        }
      }
    ]);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message:error.message});
  }
};

module.exports = {
  getExpense,
  getAllExpenses,
  deleteExpense,
  addExpense,
  getLastExpenses,
  getExpensesCountPerCategory,
  sumExpensesPerMonthForSelectedYear,
};
