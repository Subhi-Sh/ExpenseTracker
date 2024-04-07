import React, { useMemo, useState } from "react";
import Select from "react-select";
import { useGlobalContext } from "../contexts/GlobalContext";

export default function Reports() {
  const {
    report,
    setSelectedYear,
    setSelectedMonth,
    selectedYear,
    selectedMonth,
    selectedCurrency,
  } = useGlobalContext();

  console.log(report);
  const months = [
    { label: "January", value: 1 },
    { label: "February", value: 2 },
    { label: "March", value: 3 },
    { label: "April", value: 4 },
    { label: "May", value: 5 },
    { label: "June", value: 6 },
    { label: "July", value: 7 },
    { label: "August", value: 8 },
    { label: "September", value: 9 },
    { label: "October", value: 10 },
    { label: "November", value: 11 },
    { label: "December", value: 12 },
  ];

  const years = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= 2020; year--) {
    years.push({ label: year.toString(), value: year });
  }

  const handleChange = (selectedOption) => {
    setSelectedMonth(selectedOption.value);
  };
  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption.value);
  };

  return (
    <div className="flex flex-col p-2 justify-start items-center w-full">
      <h1 className="p-2 text-[#EEEEEE] mb-4">Monthly Reports</h1>
      <article className="w-full p-2 justify-center h-3/4 flex">
        <div className="flex  flex-col h-full items-start p-2 bg-[#EEEEEE] rounded-3xl  w-1/2">
          <div className="w-full rounded-3xl flex  items-center">
            <Select
              className="w-1/2  p-2"
              value={years.find((year) => year.value === selectedYear)}
              onChange={handleYearChange}
              options={years}
            />

            <Select
              className="w-1/2 p-2"
              value={months.find((month) => month.value === selectedMonth)}
              onChange={handleChange}
              options={months}
            />
          </div>
          <div className="flex h-full  justify-center w-full mt-2 rounded-3xl">
            {report.data?.total?.totalExpense.length === 0 &&
            report.data?.total?.totalIncome.length === 0 ? (
              <h1>No Report available</h1>
            ) : (
              <div className="w-full h-full flex  flex-col items-center  justify-around ">
                <ul className="flex mt-2  bg-white shadow-xl rounded-3xl  w-1/2 p-2 flex-col items-center justify-center">
                  <h3 className="p-2">Total Expense / Income </h3>
                  <li className="text-2xl flex mb-2 p-1 items-center w-full justify-between font-bold">
                    <p className="p-1">Total Expense</p>
                    <p className="p-1">
                      {selectedCurrency}
                      {report?.data?.total?.totalExpense[0]?.total}
                    </p>
                  </li>
                  <li className="text-2xl flex mb-2 p-1 items-center w-full justify-between font-bold">
                    <p className="p-1">Total Income</p>
                    <p className="p-1">
                      {selectedCurrency}
                      {report?.data?.total?.totalIncome?.length === 0
                        ? 0
                        : report?.data?.total?.totalIncome[0]?.total}
                    </p>
                  </li>
                  <li className="text-2xl flex mb-2 p-1 items-center w-full justify-between  font-bold">
                    <p className="p-1">Balance</p>
                    <p
                      className={
                        Number(report?.data?.total?.totalIncome[0]?.total || 0) -
                          Number(report?.data?.total?.totalExpense[0]?.total || 0) <
                        0
                          ? "text-red-500 p-1"
                          : "text-green-500 p-1"
                      }
                    >
                      {selectedCurrency}
                      {Number(report?.data?.total?.totalIncome[0]?.total ? report?.data?.total?.totalIncome[0]?.total : 0) - 
                      Number(report?.data?.total?.totalExpense[0]?.total ? report?.data?.total?.totalExpense[0]?.total : 0)
                      }
                    </p>
                  </li>
                </ul>
                {/* expense and income categories for the month */}
                <div className="w-full flex flex-col  justify-between h-full">
                  <article className="h-60 overflow-y-scroll overflow-hidden">
                    <h2 className="text-3xl mt-2 mb-2">
                      Expense Categories Table
                    </h2>
                    {report?.data?.categories?.expenseCategories.length ===
                    0 ? (
                      <p className="text-xl text-blue-300">
                        No expense categories avaliable
                      </p>
                    ) : (
                      <table className=" bg-white shadow-xl rounded-3xl w-full mb-2 divide-y divide-gray-200">
                        <tr className="p-2 w-full text-2xl ">
                          <th className="border-gray-300 p-1 border-b border-r">
                            Category Name
                          </th>
                          <th className=" rounded-3xl p-1 ">Total Amount</th>
                        </tr>
                        {report?.data?.categories?.expenseCategories.map(
                          (expenseCategory) => {
                            return (
                              <tr
                                key={expenseCategory.categoryName}
                                className="text-lg font-bold text-center"
                              >
                                <td className="py-2 border border-l-0  border-gray-300">
                                  {expenseCategory.categoryName}
                                </td>
                                <td className="py-2 border border-l-0  border-gray-300">
                                  {selectedCurrency}
                                  {expenseCategory.totalAmount}
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </table>
                    )}
                  </article>

                  <article  className="h-60 overflow-y-scroll overflow-hidden">
                    <h2 className="text-3xl mt-2  mb-2">
                      Income Categories Table
                    </h2>
                    {report?.data?.categories?.incomeCategories.length === 0 ? (
                      <p className="text-xl mt-4 text-blue-300 font-bold">
                        No income categories avaliable
                      </p>
                    ) : (
                      <table className=" bg-white shadow-xl rounded-3xl w-full mb-2 divide-y divide-gray-200">
                        <tr className="p-2  text-2xl ">
                          <th className="border-gray-300 border-b border-r p-1 ">
                            Category Name
                          </th>
                          <th className="border-gray-300 p-1 border-r-0 border-b border-r">
                            Total Amount
                          </th>
                        </tr>
                        {report?.data?.categories?.incomeCategories.map(
                          (incomeCategory) => {
                            return (
                              <tr
                                key={incomeCategory.categoryName}
                                className="text-lg font-bold text-center"
                              >
                                <td className="py-2 border border-l-0 border-gray-300">
                                  {incomeCategory.categoryName}
                                </td>
                                <td className="py-2 border border-r-0  border-gray-300">
                                  {selectedCurrency}
                                  {incomeCategory.totalAmount}
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </table>
                    )}
                  </article>
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
