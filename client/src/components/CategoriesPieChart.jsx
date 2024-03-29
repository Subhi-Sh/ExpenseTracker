import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import { useGlobalContext } from "../contexts/GlobalContext";

export default function CategoriesPieChart() {
  const expensesChartRef = useRef(null);
  const expensesChartInstance = useRef(null);
  const incomesChartRef = useRef(null);
  const incomesChartInstance = useRef(null);
  const { expensesPerCategory, incomesPerCategory } = useGlobalContext();

  useEffect(() => {
    if (expensesChartInstance.current) {
      expensesChartInstance.current.destroy();
    }
    const expensesChartCtx = expensesChartRef.current.getContext("2d");

    expensesChartInstance.current = new Chart(expensesChartCtx, {
      type: "pie",
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
      options: {
        plugins: {
          title: {
            display: true,
            text: "Expenses per Category",
            font: {
              family: "Raleway",
              size:20
            }
          },
          legend: {
            labels: {
              font: {
                family: "Raleway",
                size:20
              },
              color: "#31363F" 
            }
          },
          
        }
      }
    });
    return () => {
      if (expensesChartInstance.current) {
        expensesChartInstance.current.destroy();
      }
    };
  }, [expensesPerCategory]);

  useEffect(() => {
    if (incomesChartInstance.current) {
      incomesChartInstance.current.destroy();
    }
    const incomesChartCtx = incomesChartRef.current.getContext("2d");

    incomesChartInstance.current = new Chart(incomesChartCtx, {
      type: "pie",
      data: {
        labels: incomesPerCategory.map((data) => {
          return data.category_type;
        }),
        datasets: [
          {
            data: incomesPerCategory.map((data) => {
              return data.count;
            }),
            backgroundColor: incomesPerCategory.map((data) => {
              return data.color;
            }),
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Income per Category",
            font: {
              family: "Raleway",
              size:20
            }
          },
          legend: {
            labels: {
              font: {
                family: "Raleway",
                size:20
              },
              color: "#31363F" 
            }
          },
          
        }
      }
      
    });
    return () => {
      if (incomesChartInstance.current) {
        incomesChartInstance.current.destroy();
      }
    };
  }, [incomesPerCategory]);

  return (
    <>
      <div className="w-full h-full bg-[#EEEEEE] rounded-3xl">
        <canvas
          ref={expensesChartRef}
          style={{ width: "400px", height: "300px", padding: "2rem" }}
        />
      </div>
      <div className="border-2 ml-2 w-full h-full bg-[#EEEEEE] rounded-3xl">
        <canvas
          ref={incomesChartRef}
          style={{ width: "400px", height: "300px", padding: "2rem" }}
        />
      </div>
    </>
  );
}
