import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import { useGlobalContext } from "../contexts/GlobalContext";

export default function CategoriesPieChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const { expensesPerCategory, expenses } = useGlobalContext();

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const myChartRef = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(myChartRef, {
      type: "doughnut",
      data: {
        labels: expensesPerCategory.map((data) => {
          return data.category_type;
        }),
        datasets: [
          {
            data: expensesPerCategory.map((data) => {
              return data.count;
            }),
            backgroundColor: expensesPerCategory.map((data) => {
              return data.color;
            }),
          },
        ],
      },
    });
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [expensesPerCategory]);

  return (

      <div className="border-2 w-full h-full bg-[#EEEEEE] rounded-3xl">
        <canvas
          ref={chartRef}
          style={{ width: "400px", height: "300px", padding: "2rem" }}
        />
      </div>

  );
}
