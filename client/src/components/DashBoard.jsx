import React, { useState } from "react";
import LastTransactions from "./LastTransactions";
import CategoriesPieChart from "./CategoriesPieChart";
import ExpensesPerTimeBar from "./ExpensesPerTimeBar";
import Select from "react-select";
import { useGlobalContext } from "../contexts/GlobalContext";
import DataBox from "./DataBox";
export default function DashBoard() {
  const currentYear = new Date().getFullYear();
  const {expenses, incomes, expensesYear, setExpensesYear,selectedCurrency} =
    useGlobalContext();
  const [selectedYear, setSelectedYear] = useState(expensesYear);

  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption.value);
    setExpensesYear(selectedOption.value);
  };

  const yearOptions = Array.from(
    { length: currentYear - 2019 },
    (_, i) => 2020 + i
  ).map((year) => ({ value: year, label: year }));

  return (
    <div className="w-5/6 font-raleway p-2 items-center flex h-full flex-col">
      <h1 className="text-6xl text-[#EEEEEE] mb-10">Dashboard</h1>

      <div className="flex  p-2 items-center flex-wrap w-full justify-between ">
        <DataBox label={"Expenses"} selectedCurrency={selectedCurrency} />
        <DataBox label={"Balance"}  selectedCurrency={selectedCurrency}/>
        <DataBox label={"Incomes"} selectedCurrency={selectedCurrency}/>
      </div>

      <div className="flex  p-2 h-full  flex-col items-center justify-between  rounded-md w-full">
        {/* expense bar section */}
        <section className="w-full h-full rounded-3xl  bg-[#EEEEEE] p-2">
          <div className="flex justify-start items-center pl-2  w-full ">
            <p className="text-[#31363F] mr-2 text-xl">Choose a year : </p>
            <Select
              value={{ value: selectedYear, label: selectedYear }}
              onChange={handleYearChange}
              options={yearOptions}
              className="w-2/12 rounded-3xl p-2"
            />
          </div>
          <ExpensesPerTimeBar />
        </section>

        <div className="flex mt-4   justify-between h-1/2   w-full">
          <article className="flex-1 flex items-center h-full w-full  justify-center  p-2">
            {expenses.length === 0 && incomes.length === 0 ? (
              <div className="flex items-center justify-center border-2 w-full h-full bg-[#EEEEEE] rounded-3xl">
                <h2 className="text-2xl">No expenses/incomes per categories avaliable</h2>
              </div>
            ) : (
              <CategoriesPieChart />
            )}
          </article>

          <article className="flex-1 w-full h-full  flex items-center justify-center  p-2">
            <LastTransactions numberOfTransactions={3} selectedCurrency={selectedCurrency} />
          </article>
        </div>
      </div>
    </div>
  );
}
