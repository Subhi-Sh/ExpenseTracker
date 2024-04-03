import React, { useMemo, useState } from "react";
import Select from "react-select";
import { useGlobalContext } from "../contexts/GlobalContext";

export default function Reports() {
  const { report, setSelectedYear, setSelectedMonth, selectedYear, selectedMonth } = useGlobalContext();


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
      <article className="w-full p-2 justify-center h-1/2 flex">
        <div className="flex  flex-col  items-start p-2 bg-[#EEEEEE] rounded-3xl  w-1/2">
          <div className="w-full rounded-3xl mb-20 flex  items-center">
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

          <div className="flex justify-center  w-full  mt-2 rounded-3xl">
            {report.data.total.totalExpense.length === 0 && report.data.total.totalIncome.length === 0 ? (
              <h1>No Report avaliable</h1>
            ) : (
              <button className="bg-[#222831] text-[#EEEEEE] rounded-3xl font-bold p-4 ">View Report</button>
            )}
          </div>

        </div>
      </article>
    </div>
  );
}
