import React, { useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { ChromePicker } from "react-color";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
export default function Categories() {
  // use states for the expense categories.
  const [expenseCategoryType, setExpenseCategoryType] = useState("");
  const [expenseCategoryColor, setExpenseCategoryColor] = useState("");
  // use states when the user selected a new category or color to update.
  const [updatedExpenseCategoryType, setUpdatedExpenseCategoryType] =
    useState("");
  const [updatedExpenseCategoryColor, setUpdatedExpenseCategoryColor] =
    useState("");
  // use states for the income categories.
  const [incomeCategoryType, setIncomeCategoryType] = useState("");
  const [incomeCategoryColor, setIncomeCategoryColor] = useState("");
  const [updatedIncomeCategoryType, setUpdatedIncomeCategoryType] =
    useState("");
  const [updatedIncomeCategoryColor, setUpdatedIncomeCategoryColor] =
    useState("");
  // boolean states to open edit mode and close edit mode.
  const [expenseCategoryEditMode, setExpenseCategoryEditMode] = useState({
    state: false,
    index: null,
  });
  const [incomeCategoryEditMode, setIncomeCategoryEditMode] = useState({state: false,index: null});
  // context variables and functions.
  const {
    incomeCategories,
    categories,
    addExpenseCategory,
    addIncomeCategory,
    deleteExpenseCategory,
    updateExpenseCategory,
    deleteIncomeCategory,
    updateIncomeCategory,
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

  function handleUpdateExpenseCategory(id) {
    if (!updatedExpenseCategoryColor && !updatedExpenseCategoryType) {
      alert("No changes made");
      setExpenseCategoryEditMode({ state: false, index: null });
      return;
    }
    const currentCategory = categories.find((category) => category._id === id);
    if (!currentCategory) {
      alert("The category you are trying to change doesn't exist");
      setExpenseCategoryEditMode({ state: false, index: null });
      return;
    }

    const color = !updatedExpenseCategoryColor
      ? currentCategory.color
      : updatedExpenseCategoryColor.hex;
    const type = !updatedExpenseCategoryType
      ? currentCategory.type
      : updatedExpenseCategoryType;

    updateExpenseCategory(id, type, color);
    alert("Category updated successfully");
    setExpenseCategoryEditMode({ state: false, index: null });
  }

  function handleUpdateIncomeCategory(id) { 
    if (!updatedIncomeCategoryColor && !updatedIncomeCategoryType) {
      alert("No changes made");
      setIncomeCategoryEditMode({ state: false, index: null });
      return;
    }
  
    const currentCategory = incomeCategories.find(category => category._id === id);
    if (!currentCategory) {
      alert("The category you are trying to change doesn't exist");
      setIncomeCategoryEditMode({ state: false, index: null });
      return;
    }
  
    const color = updatedIncomeCategoryColor ? updatedIncomeCategoryColor.hex : currentCategory.color;
    const type = updatedIncomeCategoryType || currentCategory.type;
  
    updateIncomeCategory(id, type, color);
    alert("Category updated successfully");
    setIncomeCategoryEditMode({ state: false, index: null });
  }
  

  return (
    <>
      <div className="flex flex-col  p-2 items-center justify-between w-full">
        <h1 className="p-2 mb-4 ">Expense/Income Categories</h1>
        {/* Expense Categories Section */}
        <section className="flex items-center justify-around p-2 h-1/2 w-4/5">
          <article className="bg-[#EEEEEE] rounded-3xl h-full flex items-center justify-start flex-col w-1/2 m-2">
            <h2 className="mt-4">Add Expense Category</h2>
            <div className="flex  items-center flex-col  h-4/5 w-1/2 mt-4">
              <label className="text-xl text-[#222831] m-2" htmlFor="expense-category-type">
                Category Type
              </label>
              <input
                className="p-2 w-4/5 m-2 mb-8 text-center"
                type="text"
                id="expense-category-type"
                placeholder="Enter a category type"
                onChange={(e) => {
                  setExpenseCategoryType(e.target.value);
                }}
                value={expenseCategoryType}
              />

              <label className="m-2 text-xl text-[#222831]" htmlFor="expense-category-color">
                Category Color
              </label>
              <ChromePicker
                className="m-2 mb-8 w-4/5"
                color={expenseCategoryColor}
                onChange={setExpenseCategoryColor}
              />
              <button
                onClick={handleAddExpenseCategory}
                className="p-2 bg-[#222831]  rounded-3xl w-4/5 mx-auto mt-10 text-lg text-white hover:bg-[#8AA6A3]   hover:shadow-md transition duration-300"
              >
                Add Category
              </button>
            </div>
          </article>

          <article className="h-full bg-[#EEEEEE] rounded-3xl flex items-center justify-start m-2 flex-col w-1/2 ">
            <h2 className="mb-4 mt-4">Expense Categories List</h2>
            <ul className="overflow-y-auto p-4  w-4/5 max-h-full">
              {categories.map((category, index) => (
                <li
                  className="bg-[#222831] flex items-center justify-between  text-white text-xl rounded-3xl mb-6 p-4"
                  key={index}
                >
                  {index == expenseCategoryEditMode.index &&
                  expenseCategoryEditMode ? (
                    <>
                      <li className="flex items-center justify-center ">
                        <ChromePicker
                          className="m-2 mb-8 w-4/5"
                          color={updatedExpenseCategoryColor}
                          onChange={setUpdatedExpenseCategoryColor}
                        />
                        <input
                          type="text"
                          className="rounded-3xl p-2 text-black"
                          value={updatedExpenseCategoryType}
                          placeholder="Enter a new category type"
                          onChange={(e) =>
                            setUpdatedExpenseCategoryType(e.target.value)
                          }
                        />
                      </li>
                      <li className=" flex items-center gap-2 p-2 justify-center">
                        <FaCheck
                          onClick={() =>
                            handleUpdateExpenseCategory(category._id)
                          }
                          className="cursor-pointer text-green-500"
                        />{" "}
                        <FaTimes
                          onClick={() => setExpenseCategoryEditMode({state:false, index:null})}
                          className="cursor-pointer text-red-500"
                        />
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-center justify-center ">
                        <span
                          className="h-6 w-6 border-2  rounded-full m-1"
                          style={{ backgroundColor: category.color }}
                        ></span>
                        <p className="m-1">{category.type}</p>
                      </li>
                      <li className=" flex items-center gap-2 p-2 justify-center">
                        <FaTrash
                          onClick={() => deleteExpenseCategory(category._id)}
                          className="cursor-pointer text-red-500"
                        />{" "}
                        <FaEdit
                          onClick={() =>
                            setExpenseCategoryEditMode({
                              status: true,
                              index: `${index}`,
                            })
                          }
                          className="cursor-pointer"
                        />
                      </li>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </article>
        </section>
        {/* Income Categories Section */}
        <section className="flex items-center justify-around  p-2 h-1/2 w-4/5">
          <article className="bg-[#EEEEEE] rounded-3xl h-full flex items-center justify-start flex-col w-1/2 m-2 ">
            <h2 className="mt-4">Add Income Category</h2>
            <div className="flex  items-center flex-col  h-4/5 w-1/2 mt-4">
              <label className="text-xl text-[#222831] m-2" htmlFor="income-category-type">
                Category Type
              </label>
              <input
                className="p-2 w-4/5 m-2 mb-8"
                type="text"
                id="income-category-type"
                placeholder="Enter a category type"
                onChange={(e) => {
                  setIncomeCategoryType(e.target.value);
                }}
                value={incomeCategoryType}
              />

              <label className="m-2 text-xl text-[#222831]" htmlFor="income-category-color">
                Category Color :
              </label>
              <ChromePicker
                className="m-2 mb-8 w-4/5"
                color={incomeCategoryColor}
                onChange={setIncomeCategoryColor}
              />
              <button
                onClick={handleAddIncomeCategory}
                className="p-2 bg-[#222831]  rounded-3xl w-4/5 mx-auto mt-10 text-lg text-white hover:bg-[#8AA6A3]   hover:shadow-md transition duration-300"
              >
                Add Category
              </button>
            </div>
          </article>

          <article className="h-full bg-[#EEEEEE] rounded-3xl flex items-center justify-start m-2 flex-col w-1/2 ">
            <h2 className="mb-4 mt-4">Income Categories List</h2>
            <ul className="overflow-y-auto p-4  w-4/5 max-h-full">
              {incomeCategories.map((category, index) => (
                <li
                  className="bg-[#222831] flex items-center justify-between  text-white text-xl rounded-3xl mb-6 p-4"
                  key={index}
                >
                  {index == incomeCategoryEditMode.index &&
                  incomeCategoryEditMode ? (
                    <>
                      <li className="flex items-center justify-center ">
                        <ChromePicker
                          className="m-2 mb-8 w-4/5"
                          color={updatedIncomeCategoryColor}
                          onChange={setUpdatedIncomeCategoryColor}
                        />
                        <input
                          type="text"
                          className="rounded-3xl p-2 text-black"
                          value={updatedIncomeCategoryType}
                          placeholder="Enter a new category type"
                          onChange={(e) =>
                            setUpdatedIncomeCategoryType(e.target.value)
                          }
                        />
                      </li>
                      <li className=" flex items-center gap-2 p-2 justify-center">
                        <FaCheck
                          onClick={() =>
                            handleUpdateIncomeCategory(category._id)
                          }
                          className="cursor-pointer text-green-500"
                        />{" "}
                        <FaTimes
                          onClick={() => setIncomeCategoryEditMode({state:false, index:null})}
                          className="cursor-pointer text-red-500"
                        />
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-center justify-center ">
                        <span
                          className="h-6 w-6 border-2  rounded-full m-1"
                          style={{ backgroundColor: category.color }}
                        ></span>
                        <p className="m-1">{category.type}</p>
                      </li>
                      <li className=" flex items-center gap-2 p-2 justify-center">
                        <FaTrash
                          onClick={() => deleteIncomeCategory(category._id)}
                          className="cursor-pointer text-red-500"
                        />{" "}
                        <FaEdit
                          onClick={() =>
                            setIncomeCategoryEditMode({
                              status: true,
                              index: `${index}`,
                            })
                          }
                          className="cursor-pointer"
                        />
                      </li>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </article>
        </section>
      </div>
    </>
  );
}
