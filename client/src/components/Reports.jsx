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
      <h1 className="p-2 mb-4">Monthly Reports</h1>
      <article className="w-full p-2 justify-center h-2/3 flex">
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
              <div className="w-full h-full flex flex-col items-center  justify-center border-2 border-red-500">
                <ul className="flex border-blue-500 mt-2 border-2 w-1/2 p-2 flex-col items-center justify-center">
                  <h3 className="p-2">Total Expense / Income </h3>
                  <li className="text-2xl flex mb-2 p-1 items-center w-full justify-between border-2 border-red-500 font-bold">
                    <p className="p-1">Total Expense</p>
                    <p className="p-1">{report?.data?.total?.totalExpense[0]?.total}</p>
                  </li>
                  <li className="text-2xl flex mb-2 p-1 items-center w-full justify-between border-2 border-red-500 font-bold">
                    <p className="p-1">Total Income</p>
                    <p className="p-1">{report?.data?.total?.totalIncome[0]?.total}</p>
                  </li>
                  <li className="text-2xl flex mb-2 p-1 items-center w-full justify-between border-2 border-red-500 font-bold">
                    <p className="p-1">Balance</p>
                    <p
                      className={
                        Number(report?.data?.total?.totalIncome[0]?.total) -
                          Number(report?.data?.total?.totalExpense[0]?.total) <
                        0
                          ? "text-red-500 p-1"
                          : "text-green-500 p-1"
                      }
                    >
                      {report?.data?.total?.totalIncome[0]?.total &&
                      report?.data?.total?.totalExpense[0]?.total
                        ? Number(report?.data?.total?.totalIncome[0]?.total) -
                          Number(report?.data?.total?.totalExpense[0]?.total)
                        : ""}
                    </p>
                  </li>
                </ul>

                <ul className="flex border-blue-500 border-2 w-1/2 p-2 flex-col items-center justify-center">
                  <h3 className="p-2">Most income/expensive category</h3>
                  <li className="text-2xl flex mb-2 p-1 items-center w-full justify-between border-2 border-red-500 font-bold">
                    <p className="ml-2">Expense</p>
                    <p className="mb-2">
                      {
                        report?.data?.categories?.expenseCategory[0]
                          ?.categoryName
                      }
                    </p>
                    <p className="mb-2 mr-2">
                      {
                        report?.data?.categories?.expenseCategory[0]
                          ?.totalAmount
                      }
                    </p>
                  </li>
                  <li className="text-2xl flex p-1 mb-2 items-center w-full justify-between border-2 border-red-500 font-bold">
                    <p className="ml-2">Income</p>
                    <p className="mb-2">
                      {
                        report?.data?.categories?.incomeCategory[0]
                          ?.categoryName
                      }
                    </p>
                    <p className="mb-2 mr-2">
                      {report?.data?.categories?.incomeCategory[0]?.totalAmount}
                    </p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
