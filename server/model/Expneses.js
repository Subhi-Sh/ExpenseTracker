const mongoose = require("mongoose");

const expenseModel = mongoose.Schema(
  {
    name: { type : String, default:"Uknown"},
    type: { type : String, default:"Investment"},
    categoryid:{type: mongoose.Schema.ObjectId},
    amount: { type : Number},
    date: { type : Date, default : Date.now}
  }
);


const Expense = mongoose.model("Expenses", expenseModel);

module.exports = Expense;