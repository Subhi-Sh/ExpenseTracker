const express = require("express");
const router = express.Router();
const {
  getAllIncomes,
  addIncome,
  deleteIncome,
  getIncome,
  getIncomeCountPerCategory,
  sumIncomesPerMonthForSelectedYear,
} = require("../controllers/incomeController");

router.get("/counter-per-category", getIncomeCountPerCategory);
router.post("/sum-incomes-per-month", sumIncomesPerMonthForSelectedYear);
router.get("/", getAllIncomes);
router.get("/:id", getIncome);
router.post("/", addIncome);
router.delete("/:id", deleteIncome);
module.exports = router;
