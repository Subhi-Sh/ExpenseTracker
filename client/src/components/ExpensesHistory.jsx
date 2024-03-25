import React from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
export default function ExpensesHistory() {
  const { lastExpenses, setLastExpensesAmount } = useGlobalContext();

  return (
    <div className="w-1/4 border-2 flex-col pt-4 pb-4 border-red-500 flex items-center justify-center">
        <h1 className="text-4xl">Expenses History</h1>
        {lastExpenses.map((expense) => {
            return (
            <ul className="border-2 flex items-center m-4 justify-between p-2 w-4/5 border-blue-500">
                <li>{expense.type}</li>
                <li>{expense.amount}</li>
            </ul>
            );
        })}
    </div>
  );
}
