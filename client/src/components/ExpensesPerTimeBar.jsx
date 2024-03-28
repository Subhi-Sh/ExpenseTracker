import React, { useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import months from "../static/months";

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 30;
defaults.plugins.title.color = "#31363F";

export default function ExpensesPerTimeBar() {
  const { expensesTotalForMonthes} = useGlobalContext();

  const staticCounterArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  expensesTotalForMonthes.forEach((month) => {
    staticCounterArray[month.monthNumber - 1] = month.expensesForMonth;
  });

 
  return (
    <>
      <article className="w-full h-full">
        <div className="w-full pt-4 pl-4 rounded-md h-5/6  dataCard revenueCard">
          <Line
            data={{
              labels: months.map((month) => month.name),
              datasets: [
                {
                  label: "Expense Total",
                  data: staticCounterArray,
                  fill: true,
                  backgroundColor: "#8AA6A3",
                  borderColor: "#31363F",
                },
              ],
            }}
            options={{
              elements: {
                line: {
                  tension: 0.5,
                },
              },
              plugins: {
                title: {
                  text: "Expense Total For Each Month",
                },
              },
            }}
          />
        </div>
      </article>
    </>
  );
}
