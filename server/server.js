const express = require("express");
const ExpenseRoutes = require("./routes/ExpenseRoutes.js");
const CategoryRoutes = require("./routes/CategoryRoutes.js");
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


const server = () => {
  connection()
  app.listen(port, () => {
      console.log('listening to port:', port)
  })
}

server()


