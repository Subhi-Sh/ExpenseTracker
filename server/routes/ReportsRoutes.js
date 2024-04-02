const express = require("express");
const router = express.Router();
const {getMonthlyReport} = require("../controllers/reportsController");


router.get('/', getMonthlyReport);

module.exports = router;