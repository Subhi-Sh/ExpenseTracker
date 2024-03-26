import React from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { Link } from "react-router-dom";
export default function ExpensesHistory() {
  const { lastExpenses} = useGlobalContext();

  return (
    <div className="w-1/2 flex-col bg-[#EEEEEE] rounded-md p-4 flex items-center justify-center">
        <h1 className="text-4xl mt-4 text-[#31363F] mb-4">Latest Expenses</h1>
        <Link className="font-bold text-lg text-[#8AA6A3] hover:bg-[#31363F] p-2 rounded-md" to="/expenses">View all</Link>
        <div className="w-full flex-col flex items-center justify-center">
        {lastExpenses.map((expense) => {
            return (
            <ul className="border-2 flex items-center m-4 justify-between p-4 w-full bg-[#31363F] rounded-3xl ">
                <li className="text-lg text-center font-bold text-[#EEEEEE]">{expense.type}</li>
                <li className="text-lg text-center font-bold text-[#EEEEEE]">{expense.amount}</li>
            </ul>
            );
        })}
        </div>
    </div>
  );
}
