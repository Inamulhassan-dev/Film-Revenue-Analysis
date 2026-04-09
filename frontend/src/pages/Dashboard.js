import React from "react";
import { Bar } from "react-chartjs-2";

function Dashboard() {

  const data = {
    labels: ["Action", "Drama", "Comedy", "Thriller"],
    datasets: [
      {
        label: "Average Revenue",
        data: [800, 600, 500, 700],
      }
    ]
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>📊 Movie Insights Dashboard</h2>

      <div style={{ width: "500px", margin: "auto" }}>
        <Bar data={data} />
      </div>
    </div>
  );
}

export default Dashboard;