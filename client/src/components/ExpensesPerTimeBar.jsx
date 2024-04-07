import React, { useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import months from "../static/months";

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "#31363F";

export default function ExpensesPerTimeBar() {
  const { expensesTotalForMonthes, incomeTotalForMonthes } = useGlobalContext();

  const staticCounterArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  expensesTotalForMonthes.forEach((month) => {
    staticCounterArray[month.monthNumber - 1] = month.expensesForMonth;
  });

  const staticCounterIncomesArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  incomeTotalForMonthes.forEach((month) => {
    staticCounterIncomesArray[month.monthNumber - 1] = month.incomesForMonth;
  });

  return (
    <>
      <article className="w-full font-raleway h-full">
        <div className="w-full pt-4 pl-4 rounded-md h-5/6  dataCard revenueCard">
          <Line
            data={{
              labels: months.map((month) => month.name),
              datasets: [
                {
                  label: "Expense Total",
                  data: staticCounterArray,
                  fill: false,
                  borderColor: "#F84F31",
                  backgroundColor: "#F84F31",
                  pointBackgroundColor: "#F84F31",
                  pointBorderColor: "#F84F31",
                },
                {
                  label: "Income Total",
                  data: staticCounterIncomesArray,
                  fill: false,
                  borderColor: "#23C552",
                  backgroundColor: "#23C552",
                  pointBackgroundColor: "#23C552",
                  pointBorderColor: "#23C552",
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
                  display: true,
                  text: "Income And Expense",
                  align: "start",
                  font: {
                    size: 25,
                    color: "#31363F",
                    family: "Raleway",
                  },
                },
              },
            }}
          />
        </div>
      </article>
    </>
  );
}
