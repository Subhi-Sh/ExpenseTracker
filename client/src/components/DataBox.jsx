import React, { useMemo } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";

export default function DataBox({ label,selectedCurrency}) {
  const { expenses, incomes } = useGlobalContext();
  console.log(expenses,incomes);
  const dataToShow = useMemo(() => {
    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const totalIncome = incomes.reduce((acc, income) => acc + income.amount, 0);
    const balance = parseFloat(totalIncome - totalExpenses);
    console.log(totalExpenses,totalIncome);
    if (label === "Expense") {
      return { value: totalExpenses, colorClass: "text-red-500", sign: "-" };
    } else if (label === "Income") {
      return { value: totalIncome, colorClass: "text-green-500", sign: "+" };
    } else {
      const balanceValue = balance >= 0 ? balance : -balance;
      return { value: balanceValue, colorClass: balance >= 0 ? "text-green-500" : "text-red-500", sign: balance >= 0 ? "+" : "-" };
    }
  }, [expenses, incomes, label]);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-200 p-2 w-1/4 rounded-3xl">
      <h3>{label}</h3>
      <p className={`flex items-center text-xl font-bold ${dataToShow.colorClass}`}>{dataToShow.sign}{selectedCurrency}{dataToShow.value.toLocaleString()}</p>
    </div>
  );
}
