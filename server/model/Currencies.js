const mongoose = require("mongoose");

const currenciesModel = mongoose.Schema(
  {
    symbol: { type : String},
    name: { type : String},
    symbol_native:{type : String},
    decimal_digits: { type : Number},
    rounding: { type : Number},
    code:{type : String},
    name_plural:{type : String}

  }
);


const Currencies = mongoose.model("currencies", currenciesModel);

module.exports = Currencies;

