const mongoose = require("mongoose");

const incomeModel = mongoose.Schema(
  {
    name: { type : String, default:"Uknown"},
    type: { type : String, default:"Salary"},
    categoryid:{type: mongoose.Schema.ObjectId},
    amount: { type : Number},
    date: { type : Date, default : Date.now}
  }
);


const Incomes = mongoose.model("incomes", incomeModel);

module.exports = Incomes;