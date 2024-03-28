const mongoose = require("mongoose");

const incomeCategoryModel = mongoose.Schema(
  {
    color : {type:String, default: '#FFD700'},
    type: { type : String, default:"Salary"},
  }
);


const IncomeCategory = mongoose.model("incomecategories", incomeCategoryModel);

module.exports = IncomeCategory;