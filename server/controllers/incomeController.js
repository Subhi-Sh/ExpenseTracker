const Incomes = require("../model/Incomes");

const getAllIncomes = async (req, res) => {
  try {
    const incomes = await Incomes.find({});
    if (!incomes) {
      res.status(404).json({ message: "No Income Found" });
    }
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addIncome = async (req, res) => {
  try {
    const income = await Incomes.create(req.body);
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const income = await Incomes.findByIdAndDelete(id);
    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }
    return res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const income = await Incomes.findById(id);
    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }
    return res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getIncomeCountPerCategory = async (req, res) => {
  try {
    const result = await Incomes.aggregate([
      {
        $lookup: {
          from: "incomecategories",
          localField: "categoryid",
          foreignField: "_id",
          as: "incomeCategories",
        },
      },
      {
        $unwind: "$incomeCategories",
      },
      {
        $group: {
          _id: "$incomeCategories",
          category_type: { $first: "$incomeCategories.type" },
          color: { $first: "$incomeCategories.color" },
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0,
          category_type: 1,
          count: 1,
          color: 1,
          totalAmount:1,
        },
      },
    ]);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// query to find the sum of incomes for each month of the given year.
const sumIncomesPerMonthForSelectedYear = async (req, res) => {
  const { year } = req.body;
  try {
    const result = await Incomes.aggregate([
      {
        // Find all documents that match the given year.
        $match: {
          date: {
            $gte: new Date(`${year}-01-01`),
            $lt: new Date(`${parseInt(year)+1}-01-01`),
          },
        },
      },
      // extract the month of each document's date and put it in the month key, and include the amount of incomes.
      {
        $project: {
          month: { $month: "$date" },
          amount: 1,
        },
      },
      // group the documents by the month and sum each document's income amount
      {
        $group: {
          _id: "$month",
          incomesForMonth: { $sum: "$amount" },
        },
      },
      // project the documents by renaming the month's key to monthNumber and include the incomesForMonth 
      {
        $project: {
          _id: 0,
          monthNumber: "$_id",
          incomesForMonth: 1,
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
  getAllIncomes,
  addIncome,
  deleteIncome,
  getIncome,
  getIncomeCountPerCategory,
  sumIncomesPerMonthForSelectedYear

};
