import React, { useState } from "react";
import axios from "axios";

// Chart.js
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function Predictor() {
  const [form, setForm] = useState({
    budget: "",
    runtime: "",
    popularity: "",
    rating: "",
    year: ""
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = {
        budget: Number(form.budget),
        runtime: Number(form.runtime),
        popularity: Number(form.popularity),
        rating: Number(form.rating),
        year: Number(form.year)
      };

      const res = await axios.post("http://127.0.0.1:5000/predict", payload);
      setResult(res.data.predicted_revenue);

    } catch (err) {
      alert("Error connecting to backend");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: ["Budget", "Revenue"],
    datasets: [
      {
        label: "Prediction",
        data: [
          Number(form.budget || 0),
          Number(result || 0)
        ]
      }
    ]
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "90vh"
    }}>
      <div style={{
        background: "rgba(255,255,255,0.08)",
        padding: "30px",
        borderRadius: "20px",
        backdropFilter: "blur(15px)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
        width: "450px",
        textAlign: "center"
      }}>
        <h2>🎯 Movie Revenue Predictor</h2>

        <input name="budget" placeholder="💰 Budget" onChange={handleChange} />
        <input name="runtime" placeholder="⏱ Runtime" onChange={handleChange} />
        <input name="popularity" placeholder="🔥 Popularity" onChange={handleChange} />
        <input name="rating" placeholder="⭐ Rating" onChange={handleChange} />
        <input name="year" placeholder="📅 Year" onChange={handleChange} />

        <button onClick={handleSubmit}>
          {loading ? "Predicting..." : "🚀 Predict Revenue"}
        </button>

        {result && (
          <div style={{ marginTop: "20px" }}>
            <h3>💰 Predicted Revenue</h3>
            <h2 style={{ color: "#22c55e" }}>
              ${Number(result).toLocaleString()}
            </h2>

            <Bar data={chartData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Predictor;