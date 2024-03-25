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
const getExpensesCountPerCategory = async (req,res) => {
  try {
    const result = await Expense.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryid",
          foreignField: "_id",
          as: "cat"
        }
      },
      {
        $unwind: "$cat"
      },
      {
        $group: {
          _id: "$category_id",
          category_type: { $first: "$cat.type" },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          category_type: 1,
          count: 1
        }
      }
    ]);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({message:err.message});
  }
};


module.exports = {
  getExpense,
  getAllExpenses,
  deleteExpense,
  addExpense,
  getLastExpenses,
  getExpensesCountPerCategory,
};
