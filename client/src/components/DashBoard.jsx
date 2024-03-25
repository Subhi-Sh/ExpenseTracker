import React from "react";
import ExpensesHistory from "./ExpensesHistory";
import ExpensePerCategoryDonut from "./ExpensePerCategoryDonut"
export default function DashBoard() {
  return (
    <div className="flex flex-col items-center w-4/5 min-h-screen border-2 border-red-500">
      <h1 className="text-6xl mt-10">Dashboard</h1>

      <div className="border-2 border-blue-500 w-full">
        <article className="border-2 p-4 border-black">
          <input type="select" />
          <ExpensesHistory />
          <ExpensePerCategoryDonut/>
        </article>


      </div>
    </div>
  );
}
