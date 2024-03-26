import React from "react";
import ExpensesHistory from "./ExpensesHistory";
import CategoriesPieChart from "./CategoriesPieChart";

export default function DashBoard() {

  return (
    <div className="flex flex-col items-center  rounded-md w-full">
      <h1 className="text-6xl text-[#EEEEEE] mb-20 mt-10">Dashboard</h1>

      <div className="flex justify-between items-center  w-full">
        <article className="flex-1 flex items-center justify-center  p-2">
          <CategoriesPieChart/>
        </article>
        <article className="flex-1 flex items-center justify-center  p-2">
          <ExpensesHistory />
        </article>
      </div>
    </div>
  );
}
