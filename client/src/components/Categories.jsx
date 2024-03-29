import React, { useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import {ChromePicker} from "react-color";

export default function Categories() {
  const [expenseCategoryType, setExpenseCategoryType] = useState("");
  const [expenseCategoryColor, setExpenseCategoryColor] = useState("");
  const [incomeCategoryType, setIncomeCategoryType] = useState("");
  const [incomeCategoryColor, setIncomeCategoryColor] = useState("");
  const {
    incomeCategories,
    categories,
    addExpenseCategory,
    addIncomeCategory,
  } = useGlobalContext();

  function handleAddExpenseCategory() {
    if (!expenseCategoryColor || !expenseCategoryType) {
      alert("Please fill in all fields");
      return;
    }
    const lettersOnlyRegex = /^[A-Za-z]+$/;
    if (!lettersOnlyRegex.test(expenseCategoryType)) {
      alert("Expense category should contain only letters");
      return;
    }
    const expenseCategoryObject = {
      type: expenseCategoryType,
      color: expenseCategoryColor.hex,
    };
    addExpenseCategory(expenseCategoryObject);
  }

  function handleAddIncomeCategory() {
    if (!incomeCategoryColor || !incomeCategoryType) {
      alert("Please fill in all fields");
      return;
    }
    const lettersOnlyRegex = /^[A-Za-z]+$/;
    if (!lettersOnlyRegex.test(incomeCategoryType)) {
      alert("Income category should contain only letters");
      return;
    }
    const incomeCategoryObject = {
      type: incomeCategoryType,
      color: incomeCategoryColor.hex,
    };
    addIncomeCategory(incomeCategoryObject);
  }

  return (
    <>
      <div className="flex flex-col border-2 border-red-500 p-2 items-center justify-between w-full">
        <h1 className="p-2">Expense/Income Categories</h1>
        {/* Expense Categories Section */}
        <section className="flex items-center justify-around border-2 p-2 h-1/2 border-blue-500 w-4/5">
          <article className="bg-[#EEEEEE] rounded-3xl h-full flex items-center justify-start flex-col w-1/2 m-2 border-green-500 border-2">
            <h2>Add Expense Category</h2>
            <div className="flex  items-center flex-col border-2 border-red-500 h-4/5 w-1/2 mt-4">
              <label className="m-2" htmlFor="expense-category-type">
                Category Type :
              </label>
              <input
                className="p-2 w-4/5 m-2 mb-8"
                type="text"
                id="expense-category-type"
                onChange={(e) => {
                  setExpenseCategoryType(e.target.value);
                }}
                value={expenseCategoryType}
              />

              <label className="m-2" htmlFor="expense-category-color">
                Category Color :{" "}
              </label>
              <ChromePicker
                className="m-2 mb-8 w-4/5"
                color={expenseCategoryColor}
                onChange={setExpenseCategoryColor}
              />
              <button
                onClick={handleAddExpenseCategory}
                className="p-2 bg-[#222831]  rounded-3xl w-4/5 mx-auto mt-36 text-lg text-white hover:bg-[#8AA6A3]   hover:shadow-md transition duration-300"
              >
                Add Category
              </button>
            </div>
          </article>

          <article className="h-full bg-[#EEEEEE] rounded-3xl flex items-center justify-start m-2 flex-col w-1/2 border-green-500 border-2">
            <h2>Expense Categories List</h2>
            <ul className="overflow-y-auto max-h-40">
              {categories.map((category, index) => (
                <li key={index}>{category.type}</li>
              ))}
            </ul>
          </article>
        </section>
        {/* Income Categories Section */}
        <section className="flex items-center justify-around border-2 p-2 h-1/2 border-blue-500 w-4/5">
          <article className="bg-[#EEEEEE] rounded-3xl h-full flex items-center justify-start flex-col w-1/2 m-2 border-green-500 border-2">
            <h2>Add Income Category</h2>
            <div className="flex  items-center flex-col border-2 border-red-500 h-4/5 w-1/2 mt-4">
              <label className="m-2" htmlFor="income-category-type">
                Category Type :{" "}
              </label>
              <input
                className="p-2 w-4/5 m-2 mb-8"
                type="text"
                id="income-category-type"
                onChange={(e) => {
                  setIncomeCategoryType(e.target.value);
                }}
                value={incomeCategoryType}
              />

              <label className="m-2" htmlFor="income-category-color">
                Category Color :{" "}
              </label>
              <ChromePicker
                className="m-2 mb-8 w-4/5"
                color={incomeCategoryColor}
                onChange={setIncomeCategoryColor}
              />
              <button
                onClick={handleAddIncomeCategory}
                className="p-2 bg-[#222831]  rounded-3xl w-4/5 mx-auto mt-36 text-lg text-white hover:bg-[#8AA6A3]   hover:shadow-md transition duration-300"
              >
                Add Category
              </button>
            </div>
          </article>

          <article className="h-full bg-[#EEEEEE] rounded-3xl flex items-center justify-start m-2 flex-col w-1/2 border-green-500 border-2">
            <h2>Income Categories List</h2>
            <ul className="overflow-y-auto max-h-40">
              {incomeCategories.map((category, index) => (
                <li key={index}>{category.type}</li>
              ))}
            </ul>
          </article>
        </section>
      </div>
    </>
  );
}
