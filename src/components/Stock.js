import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import StockNews from "./StockNews";

// Register the category scale
// for using x, y axis graph
Chart.register(CategoryScale);

function Stock() {
  // Return symbol from URL "/stock/:symbol"
  // useParams() returns objective, so {symbol} will shows the right value.
  const { symbol } = useParams();

  const [chartData, setChartData] = useState({});

  // Return {current: null}
  // Can approach with using chartRef.current
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5002/stock/${symbol}`
        );
        const data = response.data;
        const dates = data.map((entry) => entry.date);
        const prices = data.map((entry) => entry.close);

        setChartData({
          labels: dates,
          datasets: [
            {
              label: `Stock Price for ${symbol}`,
              data: prices,
              borderColor: "rgba(75,192,192,1)",
              fill: false,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchData();
  }, [symbol]);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy(); // Destroy the existing chart instance
    }
    if (chartData.labels) {
      const ctx = document.getElementById("myChart").getContext("2d");
      chartRef.current = new Chart(ctx, {
        type: "line",
        data: chartData,
        options: {
          maintainAspectRatio: false,
          responsive: true,
        },
      });
    }
  }, [chartData]);

  return (
    <div className="container">
      <h1>Stock Data for {symbol}</h1>
      <div className="chart-container">
        <canvas id="myChart"></canvas>
      </div>
      <StockNews symbol={symbol} />
    </div>
  );
}

export default Stock;
