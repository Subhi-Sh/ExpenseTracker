import React from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import {
  FaCalendarAlt,
  FaRegComment
} from "react-icons/fa";
import moment from "moment";

export default function LastTransactions({ numberOfTransactions, selectedCurrency}) {
  const { expenses, incomes } = useGlobalContext();

  // Combine expenses and incomes into a single array
  const transactions = [...expenses, ...incomes];

  // Sort transactions by date in descending order
  transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Get the latest X transactions
  const latestTransactions = transactions.slice(0, numberOfTransactions);

  return (
    <div className="font-raleway w-full flex-col h-full bg-[#EEEEEE] rounded-3xl p-4 flex items-center justify-center">
      {latestTransactions.length > 0 ? (
        <>
          <h1 className=" font-raleway text-4xl mt-4 text-[#31363F] mb-4">
            Latest Transactions
          </h1>
          <div className="w-full flex-col flex items-center justify-center">
            {latestTransactions.map((transaction, index) => (
              <ul className="rounded-3xl flex items-center h-auto m-4 justify-between p-2 w-5/6 bg-[#31363F] ">
              <li className="text-lg flex flex-col items-start w-4/5 p-1 text-center text-[#EEEEEE]">
                <li className="text-2xl m-2">{transaction.type}</li>
                <ul className="flex w-full p-2 items-center justify-between">
                  <li className="flex items-center justify-center text-[#EEEEEE] text-lg">
                    <i className="m-2">
                      {selectedCurrency}
                    </i>
                    {transaction.amount.toLocaleString()}
                  </li>
                  <li className="flex items-center justify-center w-full text-[#EEEEEE] text-lg">
                    <i className="m-2">
                      <FaCalendarAlt />
                    </i>
                    {moment(transaction.date).format("MMMM Do YYYY")}
                  </li>
                  <li className="flex items-center w-full text-[#EEEEEE] text-lg">
                    <i className="m-2">
                      <FaRegComment />
                    </i>
                    {transaction.name}
                  </li>
                </ul>
              </li>
            </ul>
            ))}
          </div>
        </>
      ) : (
        <h2 className="text-2xl">No transactions available</h2>
      )}
    </div>
  );
}
