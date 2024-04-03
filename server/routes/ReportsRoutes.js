const express = require("express");
const router = express.Router();
const {getMonthlyReport} = require("../controllers/reportsController");


router.post('/', getMonthlyReport);

module.exports = router;