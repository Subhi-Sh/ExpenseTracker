const express = require("express");
const router = express.Router();
const {addExpense,deleteExpense,getAllExpenses,filterExpenses,getExpense, getLastExpenses,getExpensesCountPerCategory,sumExpensesPerMonthForSelectedYear} = require("../controllers/expenseController.js");

router.get('/counter-per-category',getExpensesCountPerCategory)
router.post('/sum-expenses-per-month', sumExpensesPerMonthForSelectedYear)
router.get('/', getAllExpenses);
router.get("/:id", getExpense);
router.post("/", addExpense);
router.delete('/:id', deleteExpense)
router.get('/last/:amount', getLastExpenses)
router.post('/filters',filterExpenses);
module.exports = router;

