const express = require("express");
const router = express.Router();
const {fetchCurrencies} = require("../controllers/currencyController");

router.get('/',fetchCurrencies)

module.exports = router;