import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

import { Bar, Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend, Filler);

function WhatIfSimulator() {
  const [movie, setMovie] = useState({
    budget: 50000000,
    runtime: 120,
    popularity: 50,
    rating: 7.0,
    release_date: "2024-06-15",
    genre_count: 1
  });

  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(false);

  const formatMoney = (num) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(0)}M`;
    return `$${num.toLocaleString()}`;
  };

  const predictScenario = async (scenarioName, scenarioData) => {
    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:5000/predict/detailed", scenarioData);
      setScenarios(prev => [...prev.filter(s => s.name !== scenarioName), {
        name: scenarioName,
        ...res.data
      }]);
    } catch (err) {
      console.error("Prediction error:", err);
    }
    setLoading(false);
  };

  const handleChange = (field, value) => {
    setMovie({ ...movie, [field]: value });
  };

  const runBaseline = () => {
    predictScenario("Baseline", movie);
  };

  const runDoubledBudget = () => {
    predictScenario("💰 2x Budget", {
      ...movie,
      budget: movie.budget * 2
    });
  };

  const runDoubledPopularity = () => {
    predictScenario("🔥 2x Popularity", {
      ...movie,
      popularity: Math.min(100, movie.popularity * 2)
    });
  };

  const runBetterRating = () => {
    predictScenario("⭐ Higher Rating (8.5)", {
      ...movie,
      rating: 8.5
    });
  };

  const runSummerRelease = () => {
    predictScenario("☀️ Summer Release", {
      ...movie,
      release_date: "2024-07-04"
    });
  };

  const runHolidayRelease = () => {
    predictScenario("🎄 Holiday Release", {
      ...movie,
      release_date: "2024-11-22"
    });
  };

  const runMultipleGenres = () => {
    predictScenario("🎭 Multi-Genre", {
      ...movie,
      genre_count: 3
    });
  };

  const runAllOptimized = () => {
    predictScenario("🚀 Fully Optimized", {
      ...movie,
      budget: movie.budget * 2,
      popularity: Math.min(100, movie.popularity * 2),
      rating: 8.5,
      release_date: "2024-11-22",
      genre_count: 2
    });
  };

  const comparisonChartData = {
    labels: scenarios.map(s => s.name),
    datasets: [
      {
        label: 'Predicted Revenue',
        data: scenarios.map(s => s.prediction?.revenue / 1e6 || 0),
        backgroundColor: 'rgba(34, 197, 94, 0.7)',
        borderRadius: 8
      },
      {
        label: 'Profit',
        data: scenarios.map(s => s.financials?.profit / 1e6 || 0),
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderRadius: 8
      }
    ]
  };

  const roiChartData = {
    labels: scenarios.map(s => s.name),
    datasets: [{
      label: 'ROI %',
      data: scenarios.map(s => s.financials?.roi_percentage || 0),
      borderColor: '#8b5cf6',
      backgroundColor: 'rgba(139, 92, 246, 0.2)',
      fill: true,
      tension: 0.4
    }]
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1600px", margin: "0 auto" }}>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: "center", marginBottom: "20px" }}
      >
        🔮 What-If Scenario Simulator
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        style={{ textAlign: "center", color: "#94a3b8", marginBottom: "40px" }}
      >
        Experiment with different variables to see how they affect your movie's revenue
      </motion.p>

      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
        {/* Controls */}
        <div style={{ flex: "1", minWidth: "350px" }}>
          <div style={{
            background: "rgba(255,255,255,0.05)",
            padding: "25px",
            borderRadius: "16px",
            marginBottom: "20px"
          }}>
            <h3>📝 Baseline Movie</h3>
            <p style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "20px" }}>
              Set your baseline movie parameters
            </p>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", color: "#94a3b8" }}>
                💰 Budget: {formatMoney(movie.budget)}
              </label>
              <input
                type="range"
                min="1000000"
                max="300000000"
                step="5000000"
                value={movie.budget}
                onChange={(e) => handleChange("budget", Number(e.target.value))}
                style={{ width: "100%" }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", color: "#94a3b8" }}>
                ⏱ Runtime: {movie.runtime} min
              </label>
              <input
                type="range"
                min="60"
                max="200"
                value={movie.runtime}
                onChange={(e) => handleChange("runtime", Number(e.target.value))}
                style={{ width: "100%" }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", color: "#94a3b8" }}>
                🔥 Popularity: {movie.popularity}
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={movie.popularity}
                onChange={(e) => handleChange("popularity", Number(e.target.value))}
                style={{ width: "100%" }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", color: "#94a3b8" }}>
                ⭐ Rating: {movie.rating}
              </label>
              <input
                type="range"
                min="3"
                max="9"
                step="0.1"
                value={movie.rating}
                onChange={(e) => handleChange("rating", Number(e.target.value))}
                style={{ width: "100%" }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", color: "#94a3b8" }}>
                📅 Release Date
              </label>
              <input
                type="date"
                value={movie.release_date}
                onChange={(e) => handleChange("release_date", e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", color: "#94a3b8" }}>
                🎭 Genre Count: {movie.genre_count}
              </label>
              <input
                type="range"
                min="1"
                max="4"
                value={movie.genre_count}
                onChange={(e) => handleChange("genre_count", Number(e.target.value))}
                style={{ width: "100%" }}
              />
            </div>

            <motion.button whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.98 }} onClick={runBaseline} style={buttonStyle}>
              📊 Run Baseline
            </motion.button>
          </div>

          {/* Scenario Buttons */}
          <div style={{
            background: "rgba(255,255,255,0.05)",
            padding: "25px",
            borderRadius: "16px"
          }}>
            <h3>🎯 Quick Scenarios</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "15px" }}>
              <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={runDoubledBudget} style={scenarioBtn} disabled={loading}>
                💰 2x Budget
              </motion.button>
              <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={runDoubledPopularity} style={scenarioBtn} disabled={loading}>
                🔥 2x Popularity
              </motion.button>
              <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={runBetterRating} style={scenarioBtn} disabled={loading}>
                ⭐ Higher Rating
              </motion.button>
              <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={runSummerRelease} style={scenarioBtn} disabled={loading}>
                ☀️ Summer
              </motion.button>
              <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={runHolidayRelease} style={scenarioBtn} disabled={loading}>
                🎄 Holiday
              </motion.button>
              <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={runMultipleGenres} style={scenarioBtn} disabled={loading}>
                🎭 Multi-Genre
              </motion.button>
            </div>
            <motion.button 
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={runAllOptimized} 
              style={{...scenarioBtn, gridColumn: "1 / -1", background: "linear-gradient(135deg, #22c55e, #16a34a)"}}
              disabled={loading}
            >
              🚀 Fully Optimized (All Changes)
            </motion.button>
          </div>
        </div>

        {/* Results */}
        <div style={{ flex: "1.5", minWidth: "400px" }}>
          {scenarios.length > 0 ? (
            <>
              {/* Results Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px", marginBottom: "30px" }}>
                {scenarios.map((scenario, idx) => (
                  <div key={idx} style={{
                    background: "rgba(255,255,255,0.05)",
                    padding: "20px",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.1)"
                  }}>
                    <h4 style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#94a3b8" }}>{scenario.name}</h4>
                    <div style={{ fontSize: "20px", fontWeight: "bold", color: "#22c55e" }}>
                      {scenario.prediction?.formatted || "..."}
                    </div>
                    <div style={{ fontSize: "14px", marginTop: "5px" }}>
                      ROI: <span style={{ color: scenario.financials?.roi_percentage > 0 ? "#22c55e" : "#ef4444" }}>
                        {scenario.financials?.roi_percentage?.toFixed(0) || "..."}%
                      </span>
                    </div>
                    <div style={{ fontSize: "12px", color: scenario.risk_assessment?.color || "#94a3b8" }}>
                      Risk: {scenario.risk_assessment?.level || "..."}
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div style={{ background: "rgba(255,255,255,0.05)", padding: "20px", borderRadius: "16px" }}>
                  <h4 style={{ textAlign: "center" }}>Revenue & Profit Comparison</h4>
                  <Bar data={comparisonChartData} options={{
                    responsive: true,
                    plugins: { legend: { position: 'bottom' } },
                    scales: { y: { title: { display: true, text: 'Millions $' } } }
                  }} />
                </div>
                <div style={{ background: "rgba(255,255,255,0.05)", padding: "20px", borderRadius: "16px" }}>
                  <h4 style={{ textAlign: "center" }}>ROI Comparison</h4>
                  <Line data={roiChartData} options={{
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: { y: { title: { display: true, text: 'ROI %' } } }
                  }} />
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div style={{ background: "rgba(255,255,255,0.05)", padding: "25px", borderRadius: "16px", marginTop: "20px" }}>
                <h4>📋 Scenario Analysis</h4>
                <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "15px" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                      <th style={{ textAlign: "left", padding: "10px", color: "#94a3b8" }}>Scenario</th>
                      <th style={{ textAlign: "right", padding: "10px", color: "#94a3b8" }}>Revenue</th>
                      <th style={{ textAlign: "right", padding: "10px", color: "#94a3b8" }}>ROI</th>
                      <th style={{ textAlign: "right", padding: "10px", color: "#94a3b8" }}>Risk</th>
                      <th style={{ textAlign: "right", padding: "10px", color: "#94a3b8" }}>Recommendation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scenarios.map((scenario, idx) => (
                      <tr key={idx} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        <td style={{ padding: "10px" }}>{scenario.name}</td>
                        <td style={{ textAlign: "right", color: "#22c55e" }}>
                          {scenario.prediction?.formatted || "..."}
                        </td>
                        <td style={{ textAlign: "right", color: scenario.financials?.roi_percentage > 0 ? "#22c55e" : "#ef4444" }}>
                          {scenario.financials?.roi_percentage?.toFixed(1) || "..."}%
                        </td>
                        <td style={{ textAlign: "right", color: scenario.risk_assessment?.color || "#94a3b8" }}>
                          {scenario.risk_assessment?.level || "..."}
                        </td>
                        <td style={{ textAlign: "right", fontWeight: "bold" }}>
                          {scenario.recommendation || "..."}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div style={{
              textAlign: "center",
              padding: "100px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "20px"
            }}>
              <h2 style={{ color: "#64748b" }}>🔮 No Scenarios Run Yet</h2>
              <p style={{ color: "#94a3b8", marginTop: "10px" }}>
                Adjust the parameters and click "Run Baseline" or try a quick scenario
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(0,0,0,0.3)",
  color: "white",
  fontSize: "16px"
};

const buttonStyle = {
  width: "100%",
  padding: "15px",
  marginTop: "20px",
  borderRadius: "12px",
  border: "none",
  background: "linear-gradient(135deg, #3b82f6, #2563eb)",
  color: "white",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer"
};

const scenarioBtn = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(255,255,255,0.05)",
  color: "white",
  cursor: "pointer",
  fontSize: "14px",
  transition: "all 0.2s"
};

export default WhatIfSimulator;
