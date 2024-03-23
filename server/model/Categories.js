const mongoose = require("mongoose");

const categoryModel = mongoose.Schema(
  {
    color : {type:String, default: '#FCBE44'},
    type: { type : String, default:"Investment"},
  }
);


const Category = mongoose.model("categories", categoryModel);

module.exports = Category;