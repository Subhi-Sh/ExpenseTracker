import React, { useState } from "react";
import Select from "react-select";
import { DatePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { useGlobalContext } from "../contexts/GlobalContext";
import validateExpenseFormat from "../Helper/ValidateExpenseFormat";
import moment from "moment";
import {
  FaCalendarAlt,
  FaRegComment,
  FaTrash,
} from "react-icons/fa";

export default function Expenses() {
  const { expenses, categories, addExpense, deleteExpense,selectedCurrency} =
    useGlobalContext();
  // use states.
  const [selectedExpenseType, setSelectedExpenseType] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(1);
  const [expenseDate, setExpenseDate] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState("");

  // function to handle adding an expense
  function handleAddExpense() {
    // resetting the error message.
    setErrorMessage("");
    if (
      !selectedCategoryId ||
      !selectedExpenseType ||
      !expenseAmount ||
      !expenseName
    ) {
      console.log(
        expenseAmount,
        expenseName,
        selectedCategoryId,
        selectedExpenseType
      );
      alert("Please fill in all of the fields");
      return;
    }
    // making sure that the name is only letters and digits and the amount isnt 0 or less.
    const result = validateExpenseFormat(expenseName, expenseAmount);
    if (result !== null) {
      setErrorMessage(result);
    }
    // everything is fine, we add the expense.
    const expenseObject = {
      name: expenseName,
      type: selectedExpenseType,
      categoryid: selectedCategoryId,
      amount: Number(expenseAmount),
      date: expenseDate ? expenseDate : null,
    };
    addExpense(expenseObject);
  }
  return (
    <article className="flex  w-full justify-between  rounded-3xl">
      {/*   add expense section */}
      <div className="flex flex-col  w-1/3  p-2">
        <article className="flex flex-col gap-2  h-auto rounded-3xl bg-[#EEEEEE] p-4">
          <h2 className="text-5xl p-2 w-full mt-5 text-[#8AA6A3] font-bold">
            Add Expense
          </h2>
          <label
            className="text-lg mb-2 text-[#222831] font-bold"
            htmlFor="expense-name"
          >
            Expense Name :
          </label>
          <input
            className="text-[#222831] text-start mb-2 rounded-md p-2  w-full"
            id="expense-name"
            type="text"
            placeholder="Enter expense name"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
          />

          <label className="text-lg mb-2 text-[#222831] font-bold">
            Expense Type :
          </label>
          <Select
            value={{ value: selectedCategoryId, label: selectedExpenseType }}
            onChange={(selectedOption) => {
              setSelectedExpenseType(selectedOption.label);
              setSelectedCategoryId(selectedOption.value);
            }}
            options={categories.map((category) => ({
              value: category._id,
              label: category.type,
            }))}
            placeholder="Select expense type"
          />

          <label
            className="text-lg mt-2 mb-2 text-[#222831] font-bold"
            htmlFor="expense-amount"
          >
            Expense Amount :
          </label>
          <input
            className="text-[#222831] mb-2 rounded-md p-2  w-full"
            type="number"
            min={1}
            value={expenseAmount}
            placeholder="Enter expense amount"
            onChange={(e) => setExpenseAmount(e.target.value)}
          />

          <label
            className="text-lg text-[#222831] mb-2 font-bold"
            htmlFor="expense-date"
          >
            Expense Date :
          </label>
          <DatePicker
            value={expenseDate}
            onChange={(date) => setExpenseDate(date)}
          />
          <button
            onClick={handleAddExpense}
            className="p-2 bg-[#222831] rounded-3xl w-4/5 mx-auto mt-10 text-lg text-white hover:bg-[#8AA6A3]   hover:shadow-md transition duration-300"
          >
            Add expense
          </button>
          <p className="text-center p-2 text-lg text-red-500 font-bold ">
            {errorMessage}
          </p>
        </article>
      </div>
      {/* end of add expense section */}

      {/* expenses list section */}
      <div className="flex w-2/3  flex-col items-center ">
        <div className=" w-5/6 m-4 ml-4 h-[1200px] flex flex-col items-center bg-[#EEEEEE] rounded-3xl overflow-auto">
          <h2 className="text-5xl p-2 w-5/6 mt-5 text-[#8AA6A3] font-bold">
            Expenses
          </h2>
          {expenses.length === 0 ? (
            <h1 className="text-4xl text-center w-full p-20">No Expenses Yet...</h1>
          ) : (
            expenses.map((expense) => (
              <ul className="rounded-3xl flex items-center h-auto m-4 justify-between p-2 w-5/6 bg-[#31363F] ">
                <li className="text-lg flex flex-col items-start w-4/5 p-1 text-center text-[#EEEEEE]">
                  <li className="text-2xl m-2">{expense.type}</li>
                  <ul className="flex w-full p-2 items-center justify-between">
                    <li className="flex items-center justify-center text-[#EEEEEE] text-lg">
                      <i className="m-2">
                        {selectedCurrency}
                      </i>
                      {expense.amount.toLocaleString()}
                    </li>
                    <li className="flex items-center justify-center w-full text-[#EEEEEE] text-lg">
                      <i className="m-2">
                        <FaCalendarAlt />
                      </i>
                      {moment(expense.date).format("MMMM Do YYYY")}
                    </li>
                    <li className="flex items-center w-full text-[#EEEEEE] text-lg">
                      <i className="m-2">
                        <FaRegComment />
                      </i>
                      {expense.name}
                    </li>
                  </ul>
                </li>
                <button
                  onClick={() => deleteExpense(expense._id)}
                  className="p-4 m-2 hover:p-5 text-lg rounded-full bg-[#EEEEEE] text-[#8AA6A3]"
                >
                  <FaTrash />
                </button>
              </ul>
            ))
          )}
        </div>
      </div>
      {/* end of expenses list section */}
    </article>
  );
}
