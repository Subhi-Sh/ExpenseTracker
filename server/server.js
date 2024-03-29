const express = require("express");
// routes.
const ExpenseRoutes = require("./routes/ExpenseRoutes.js");
const CategoryRoutes = require("./routes/CategoryRoutes.js");
const IncomeRoutes = require("./routes/IncomeRoutes.js");
const IncomesCategoriesRoutes = require("./routes/IncomeCategoryRoutes.js");
const cors = require('cors');
const app = express();
const {connection} = require('./db/connection.js');
require('dotenv').config()


const port = process.env.PORT;


// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const corsOptions = {
  origin:'http://localhost:5173'
};

app.use(cors(corsOptions));

// routes
app.use("/expenses", ExpenseRoutes);
app.use("/categories", CategoryRoutes);
app.use("/incomescategories", IncomesCategoriesRoutes);
app.use("/incomes", IncomeRoutes);


const server = () => {
  connection()
  app.listen(port, () => {
      console.log('listening to port:', port)
  })
}

server()


