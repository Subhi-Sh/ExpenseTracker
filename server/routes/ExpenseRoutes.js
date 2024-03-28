const express = require("express");
const router = express.Router();
const {addExpense,deleteExpense,getAllExpenses,getExpense, getLastExpenses,getExpensesCountPerCategory,sumExpensesPerMonthForSelectedYear} = require("../controllers/expenseController.js");

router.get('/counter-per-category',getExpensesCountPerCategory)
router.post('/sum-expenses-per-month', sumExpensesPerMonthForSelectedYear)
router.get('/', getAllExpenses);
router.get("/:id", getExpense);
router.post("/", addExpense);
router.delete('/:id', deleteExpense)
router.get('/last/:amount', getLastExpenses)
module.exports = router;

