import React, { useEffect, useState } from "react";
import Select from "react-select";
import { DatePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { useGlobalContext } from "../contexts/GlobalContext";
import validateExpenseFormat from "../Helper/ValidateExpenseFormat";
import moment from "moment";
import { FaCalendarAlt, FaRegComment, FaTrash } from "react-icons/fa";
import { useSearchParams } from 'react-router-dom';

export default function Expenses() {
  const {
    expenses,
    filterExpenses,
    categories,
    addExpense,
    deleteExpense,
    selectedCurrency,
  } = useGlobalContext();
  // use states.
  const [selectedExpenseType, setSelectedExpenseType] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(1);
  const [expenseDate, setExpenseDate] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);


  // for the sorting options.
  const [selectedSortOptionValue, setSelectedSortOptionValue] = useState(
    sessionStorage.getItem("sortOption") || 1
  );
  const [selectedSortOptionLabel, setSelectedSortOptionLabel] =
    useState("Select sort option");

  // sort options objects.
  const sortOptions = [
    { value: {date:-1}, label: "date new" },
    { value: {date:1}, label: "date old" },
    { value: {amount:1}, label: "amount low" },
    { value: {amount:-1}, label: "amount high" },
  ];

  function handleAddExpense() {
    // resetting the error message.
    setErrorMessage("");
    if (
      !selectedCategoryId ||
      !selectedExpenseType ||
      !expenseAmount ||
      !expenseName
    ) {
      alert("Please fill in all of the fields");
      return;
    }
    // making sure that the name is only letters and digits and the amount isnt 0 or less.
    const result = validateExpenseFormat(expenseName, expenseAmount);
    if (result !== null) {
      setErrorMessage(result);
      return;
    }
    if (expenseDate > moment().toDate()) {
      setErrorMessage("Please dont pick a date in the future");
      return;
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

  // functon that will apply search filters,sorts,and normal filers.
  function handleApplyFilters(){
    const filterOptions = [];
    if(fromDate){
      filterOptions.push({fromDate: new Date(fromDate)})
    }
    if(toDate){
      filterOptions.push({toDate:new Date(toDate)})
    }
    if(selectedSortOptionValue){
      filterOptions.push({sortOption:selectedSortOptionValue})
    }
    if(selectedCategoryIds){
      filterOptions.push({selectedFilterIds:selectedCategoryIds})
    }
    filterExpenses(filterOptions);
  }

  useEffect(() => {
    handleApplyFilters();

  },[selectedCategoryIds, fromDate,toDate,selectedSortOptionValue])



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
        <div className=" w-5/6 m-4 ml-4 h-[1200px] flex flex-col  items-center bg-[#EEEEEE] rounded-3xl overflow-auto">
          <h2 className="text-5xl p-2 w-5/6 mt-5 text-[#8AA6A3] font-bold">
            Expense
          </h2>
          <div className="w-full rounded-3xl p-2 mt-2">
            <div className="flex w-full  p-2 gap-2 justify-between items-center">
            
              <div className="w-full flex items-center gap-4 justify-end p-2">
                <label className="text-lg font-bold" htmlFor="sorts">
                  Sort by
                </label>
                <Select
                  className="w-1/4"
                  id="sorts"
                  value={{
                    value: selectedSortOptionValue,
                    label: selectedSortOptionLabel,
                  }}
                  onChange={(selectedOption) => {
                    setSelectedSortOptionLabel(selectedOption.label);
                    setSelectedSortOptionValue(selectedOption.value);
                  }}
                  options={sortOptions}
                />
              </div>
            </div>
          </div>

          <div className="w-full flex h-full justify-around">
            <article className="flex flex-col justify-between w-1/4 h-1/2 mt-2 p-4 bg-white shadow-2xl rounded-3xl">
              {/*  Filters section  */}
              <div>
                <h3 className="text-center">Filters</h3>
                {/* Categories Filters section  */}
                <article className="w-full border-b border-black">
                  <p className="text-lg font-bold mb-1"> Categories</p>
                  {categories.map((category) => {
                    return (
                      <div
                        key={category._id}
                        className="w-full flex items-center gap-4 m-1"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategoryIds.includes(category._id)}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            setSelectedCategoryIds((prevIds) => {
                              if (isChecked) {
                                return [...prevIds, category._id];
                              } else {
                                return prevIds.filter(
                                  (id) => id !== category._id
                                );
                              }
                            });
                          }}
                        />
                        <p className="text-black text-lg">{category.type}</p>
                      </div>
                    );
                  })}
                </article>

                {/* Dates Filters section  */}
                <article className="border-b border-black flex flex-col p-1">
                  <p className="text-lg font-bold mb-1">Date Range</p>

                  <label className="p-1 font-bold" htmlFor="todate">
                    From
                  </label>
                  <DatePicker
                    value={fromDate}
                    onChange={(e) => setFromDate(e)}
                  />
                  <label className="p-1 font-bold" htmlFor="todate">
                    To
                  </label>
                  <DatePicker
                    className="mb-2"
                    value={toDate}
                    onChange={(e) => setToDate(e)}
                  />
                </article>
              </div>

              <article className="flex justify-center mt-2 items-center">
                <button
                  className="bg-[#222831] text-[#EEEEEE] border-r border-[#EEEEEE] w-1/2 p-2 focus:text-[#8AA6A3] active:text-[#8AA6A3] rounded-3xl rounded-r-none"
                >
                  Clear
                </button>
                <button
                  onClick={handleApplyFilters}
                  className="bg-[#222831] text-[#EEEEEE] w-1/2  p-2 focus:text-[#8AA6A3] active:text-[#8AA6A3] rounded-3xl rounded-l-none"
                >
                  Apply
                </button>
              </article>
            </article>
            <div className=" w-2/3 flex flex-col items-center">
                           
                  {expenses.map((expense) => (
                    <ul className="rounded-3xl flex items-center h-auto mt-2 mr-2 justify-between p-2 w-5/6 bg-[#31363F] ">
                      <li className="text-lg flex flex-col items-start w-4/5 p-1 text-center text-[#EEEEEE]">
                        <li className="text-2xl m-2">{expense.type}</li>
                        <ul className="flex w-full p-2 items-center justify-between">
                          <li className="flex items-center justify-center text-[#EEEEEE] text-lg">
                            <i className="m-2">{selectedCurrency}</i>
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
                  ))}

            </div>
          </div>
        </div>
      </div>
      {/* end of expenses list section */}
    </article>
  );
}
