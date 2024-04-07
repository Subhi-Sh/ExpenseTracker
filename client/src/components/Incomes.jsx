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
  FaShekelSign,
} from "react-icons/fa";

export default function Incomes() {
  const { incomes, incomeCategories, addIncome, deleteIncome,selectedCurrency} =
    useGlobalContext();
    console.log(incomeCategories);
  // use states.
  const [selectedIncomeType, setSelectedIncomeType] = useState("");
  const [selectedIncomeCategoryId, setSelectedIncomeCategoryId] = useState("");
  const [incomeName, setIncomeName] = useState("");
  const [incomeAmount, setIncomeAmount] = useState(1);
  const [incomeDate, setIncomeDate] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState("");

  // function to handle adding an expense
  function handleAddIncome() {
    // resetting the error message.
    setErrorMessage("");
    if (
      !selectedIncomeCategoryId ||
      !selectedIncomeType ||
      !incomeAmount ||
      !incomeName
    ) {
      alert("Please fill in all of the fields");
      return;
    }
    // making sure that the name is only letters and digits and the amount isnt 0 or less.
    const result = validateExpenseFormat(incomeName, incomeAmount);
    if (result !== null) {
      setErrorMessage(result);
      return;
    }
    if(incomeDate > moment().toDate()){
      setErrorMessage("Please dont pick a date in the future");
      return;
    }
    // everything is fine, we add the expense.
    const incomeObject = {
      name: incomeName,
      type: selectedIncomeType,
      categoryid: selectedIncomeCategoryId,
      amount: incomeAmount,
      date: incomeDate ? incomeDate : null,
    };
    addIncome(incomeObject);
  }
  return (
    <article className="flex  w-full justify-between  rounded-3xl">
      {/*   add income section */}
      <div className="flex flex-col  w-1/3  p-2">
        <article className="flex flex-col gap-2  h-auto rounded-3xl bg-[#EEEEEE] p-4">
          <h2 className="text-5xl p-2 w-full mt-5 text-[#8AA6A3] font-bold">
            Add Income
          </h2>
          <label
            className="text-lg mb-2 text-[#222831] font-bold"
            htmlFor="expense-name"
          >
            Income Name :
          </label>
          <input
            className="text-[#222831] text-start mb-2 rounded-md p-2  w-full"
            id="income-name"
            type="text"
            placeholder="Enter income name"
            value={incomeName}
            onChange={(e) => setIncomeName(e.target.value)}
          />

          <label className="text-lg mb-2 text-[#222831] font-bold">
            Income Type :
          </label>
          <Select
            value={{ value: selectedIncomeCategoryId, label: selectedIncomeType }}
            onChange={(selectedOption) => {
              setSelectedIncomeType(selectedOption.label);
              setSelectedIncomeCategoryId(selectedOption.value);
            }}
            options={incomeCategories.map((category) => ({
              value: category._id,
              label: category.type,
            }))}
            placeholder="Select income type"
          />

          <label
            className="text-lg mt-2 mb-2 text-[#222831] font-bold"
            htmlFor="expense-amount"
          >
            Income Amount :
          </label>
          <input
            className="text-[#222831] mb-2 rounded-md p-2  w-full"
            type="number"
            min={1}
            value={incomeAmount}
            placeholder="Enter income amount"
            onChange={(e) => setIncomeAmount(e.target.value)}
          />

          <label
            className="text-lg text-[#222831] mb-2 font-bold"
            htmlFor="income-date"
          >
            Income Date :
          </label>
          <DatePicker
            value={incomeDate}
            onChange={(date) => setIncomeDate(date)}
          />
          <button
            onClick={handleAddIncome}
            className="p-2 bg-[#222831] rounded-3xl w-4/5 mx-auto mt-10 text-lg text-white hover:bg-[#8AA6A3]   hover:shadow-md transition duration-300"
          >
            Add Income
          </button>
          <p className="text-center p-2 text-lg text-red-500 font-bold ">
            {errorMessage}
          </p>
        </article>
      </div>
      {/* end of add income section */}

      {/* income list section */}
      <div className="flex w-2/3  flex-col items-center ">
        <div className=" w-5/6 m-4 ml-4 h-[1200px] flex flex-col items-center bg-[#EEEEEE] rounded-3xl overflow-auto">
          <h2 className="text-5xl p-2 w-5/6 mt-5 text-[#8AA6A3] font-bold">
            Income
          </h2>
          {incomes.length === 0 ? (
            <h1 className="text-4xl text-center w-full p-20">No Incomes Yet...</h1>
          ) : (
            incomes.map((income) => (
              <ul className="rounded-3xl flex items-center h-auto m-4 justify-between p-2 w-5/6 bg-[#31363F] ">
                <li className="text-lg flex flex-col items-start w-4/5 p-1 text-center text-[#EEEEEE]">
                  <li className="text-2xl m-2">{income.type}</li>
                  <ul className="flex w-full p-2 items-center justify-between">
                    <li className="flex items-center justify-center text-[#EEEEEE] text-lg">
                      <i className="m-2">
                        {selectedCurrency}
                      </i>
                      {income.amount.toLocaleString()}
                    </li>
                    <li className="flex items-center justify-center w-full text-[#EEEEEE] text-lg">
                      <i className="m-2">
                        <FaCalendarAlt />
                      </i>
                      {moment(income.date).format("MMMM Do YYYY")}
                    </li>
                    <li className="flex items-center w-full text-[#EEEEEE] text-lg">
                      <i className="m-2">
                        <FaRegComment />
                      </i>
                      {income.name}
                    </li>
                  </ul>
                </li>
                <button
                  onClick={() => deleteIncome(income._id)}
                  className="p-4 m-2 hover:p-5 text-lg rounded-full bg-[#EEEEEE] text-[#8AA6A3]"
                >
                  <FaTrash />
                </button>
              </ul>
            ))
          )}
        </div>
      </div>
      {/* end of income list section */}
    </article>
  );
}
