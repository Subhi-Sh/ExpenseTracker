import React, { useMemo, useState } from "react";
import Select from "react-select";

export default function Reports() {
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useMemo(() => {
    console.log(selectedYear,selectedMonth);
  },[selectedMonth,selectedYear])

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
    console.log(selectedOption.value);
    setSelectedMonth(selectedOption.value);
  };
  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption.value);
  };
  

  return (
    <div className="flex flex-col p-2 justify-start items-center  border-2 border-blue-500 w-full">
      <h1 className="p-2 mb-4">Monthly Reports</h1>
      <article className="w-full border-2 p-2 border-green-500 justify-center h-full flex">
        <div className="flex border-2 border-blue-500 items-start p-2 bg-[#EEEEEE] rounded-3xl justify-end w-1/2">
          <Select
            className="w-1/4 p-2"
            value={years.find((year) => year.value === selectedYear)}
            onChange={handleYearChange}
            options={years}
          />

          <Select
            className="w-1/4 p-2"
            value={months.find((month) => month.value === selectedMonth)}
            onChange={handleChange}
            options={months}
          />
        </div>
      </article>
    </div>
  );
}
