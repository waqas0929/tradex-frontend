import React from "react";
import MyChartComponent from "./ChartComponents.jsx";  // Correct import
import "./Dashboard.css";

const Dashboard = () => {
  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Monthly Votes",
        data: [12, 19, 3, 5, 2, 7],
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
  
          if (!chartArea) {
            // This case happens on initial chart load
            return null;
          }
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, "rgba(255, 99, 132, 0.2)");
          gradient.addColorStop(0.5, "rgba(54, 162, 235, 0.2)");
          gradient.addColorStop(1, "rgba(75, 192, 192, 0.2)");
          return gradient;
        },
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
          "rgba(255, 99, 132, 0.4)",
          "rgba(54, 162, 235, 0.4)",
          "rgba(255, 206, 86, 0.4)",
          "rgba(75, 192, 192, 0.4)",
          "rgba(153, 102, 255, 0.4)",
          "rgba(255, 159, 64, 0.4)"
        ],
        hoverBorderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        hoverBorderWidth: 3,
        pointBackgroundColor: "#fff",
        pointBorderColor: "rgba(0,0,0,0.1)",
        pointBorderWidth: 2,
        pointHoverRadius: 7,
        pointHoverBackgroundColor: "rgba(255, 99, 132, 1)",
        pointHoverBorderColor: "rgba(0,0,0,0.1)",
        pointHoverBorderWidth: 3,
        pointRadius: 5,
        pointHitRadius: 10,
        fill: true,
        tension: 0.4
      }
    ]
  };
  
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="chart-container">
        <MyChartComponent data={chartData} />
      </div>
    </div>
  );
};

export default Dashboard;
