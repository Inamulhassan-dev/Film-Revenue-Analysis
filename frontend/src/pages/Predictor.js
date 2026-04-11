import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

function Predictor() {
  const [form, setForm] = useState({
    budget: "50000000",
    runtime: "120",
    popularity: "50",
    rating: "7.0",
    release_date: "2024-06-15",
    genre_count: "1"
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/stats");
      setStats(res.data.dataset);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://127.0.0.1:5000/predict/detailed", form);
      setResult(res.data);
    } catch (err) {
      alert("Error connecting to backend");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const modelChartData = result ? {
    labels: Object.keys(result.model_predictions).map(k => k.replace('_', ' ').toUpperCase()),
    datasets: [{
      label: 'Model Predictions',
      data: Object.values(result.model_predictions).map(v => v.revenue / 1e6),
      backgroundColor: [
        'rgba(102, 126, 234, 0.8)',
        'rgba(118, 75, 162, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(34, 197, 94, 0.8)'
      ],
      borderRadius: 8
    }]
  } : null;

  const roiChartData = result ? {
    labels: ['Budget', 'Profit', 'Revenue'],
    datasets: [{
      data: [
        result.financials.budget / 1e6,
        result.financials.profit / 1e6,
        result.financials.predicted_revenue / 1e6
      ],
      backgroundColor: ['#ef4444', '#22c55e', '#3b82f6'],
      borderWidth: 0
    }]
  } : null;

  return (
    <div style={{ padding: "40px", maxWidth: "1400px", margin: "0 auto" }}>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: "center", marginBottom: "40px" }}
      >
        🎯 Advanced Revenue Predictor
      </motion.h1>

      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
        {/* Input Form */}
        <div style={{ flex: "1", minWidth: "400px" }}>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card"
            style={{
            background: "rgba(255,255,255,0.08)",
            padding: "30px",
            borderRadius: "20px",
            backdropFilter: "blur(15px)"
          }}>
            <h3>📝 Movie Details</h3>

            <div style={{ marginTop: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", color: "#94a3b8" }}>
                💰 Budget (USD)
              </label>
              <input
                name="budget"
                type="number"
                value={form.budget}
                onChange={handleChange}
                style={inputStyle}
              />
              {stats && (
                <small style={{ color: "#64748b" }}>
                  Range: {stats.budget_range.formatted_min} - {stats.budget_range.formatted_max}
                </small>
              )}
            </div>

            <div style={{ marginTop: "15px" }}>
              <label style={{ display: "block", marginBottom: "8px", color: "#94a3b8" }}>
                ⏱ Runtime (minutes)
              </label>
              <input
                name="runtime"
                type="number"
                value={form.runtime}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div style={{ marginTop: "15px" }}>
              <label style={{ display: "block", marginBottom: "8px", color: "#94a3b8" }}>
                🔥 Popularity Score (1-100)
              </label>
              <input
                name="popularity"
                type="number"
                value={form.popularity}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div style={{ marginTop: "15px" }}>
              <label style={{ display: "block", marginBottom: "8px", color: "#94a3b8" }}>
                ⭐ Rating (1-10)
              </label>
              <input
                name="rating"
                type="number"
                step="0.1"
                min="1"
                max="10"
                value={form.rating}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div style={{ marginTop: "15px" }}>
              <label style={{ display: "block", marginBottom: "8px", color: "#94a3b8" }}>
                📅 Release Date
              </label>
              <input
                name="release_date"
                type="date"
                value={form.release_date}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div style={{ marginTop: "15px" }}>
              <label style={{ display: "block", marginBottom: "8px", color: "#94a3b8" }}>
                🎭 Number of Genres
              </label>
              <input
                name="genre_count"
                type="number"
                min="1"
                max="5"
                value={form.genre_count}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                ...buttonStyle,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "wait" : "pointer"
              }}
            >
              {loading ? "🔮 Analyzing..." : "🚀 Get Prediction"}
            </button>
          </motion.div>
        </div>

        {/* Results */}
        <div style={{ flex: "1", minWidth: "400px" }}>
          {result ? (
            <>
              {/* Main Prediction */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                className="glass-card"
                style={{
                background: "rgba(34,197,94,0.1)",
                padding: "30px",
                borderRadius: "20px",
                textAlign: "center",
                border: "1px solid rgba(34,197,94,0.3)"
              }}>
                <h3 style={{ color: "#22c55e" }}>💰 Predicted Revenue</h3>
                <h1 style={{ fontSize: "48px", color: "#22c55e", margin: "10px 0" }}>
                  {result.prediction.formatted}
                </h1>
                
                <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
                  <div style={{
                    background: "rgba(0,0,0,0.3)",
                    padding: "15px 25px",
                    borderRadius: "12px"
                  }}>
                    <div style={{ color: "#94a3b8", fontSize: "12px" }}>ROI</div>
                    <div style={{ fontSize: "24px", color: result.financials.roi_percentage > 0 ? "#22c55e" : "#ef4444" }}>
                      {result.financials.roi_percentage.toFixed(0)}%
                    </div>
                  </div>
                  <div style={{
                    background: "rgba(0,0,0,0.3)",
                    padding: "15px 25px",
                    borderRadius: "12px"
                  }}>
                    <div style={{ color: "#94a3b8", fontSize: "12px" }}>Confidence</div>
                    <div style={{ fontSize: "24px", color: "#3b82f6" }}>
                      {result.confidence.score.toFixed(0)}%
                    </div>
                  </div>
                  <div style={{
                    background: "rgba(0,0,0,0.3)",
                    padding: "15px 25px",
                    borderRadius: "12px"
                  }}>
                    <div style={{ color: "#94a3b8", fontSize: "12px" }}>Risk</div>
                    <div style={{ fontSize: "24px", color: result.risk_assessment.color }}>
                      {result.risk_assessment.level}
                    </div>
                  </div>
                </div>

                <div style={{
                  marginTop: "20px",
                  padding: "15px",
                  background: result.recommendation === "Avoid" ? "rgba(239,68,68,0.2)" : "rgba(34,197,94,0.2)",
                  borderRadius: "10px"
                }}>
                  <strong>Recommendation: {result.recommendation}</strong>
                </div>
              </motion.div>

              {/* Charts Row */}
              <div style={{ display: "flex", gap: "20px", marginTop: "20px", flexWrap: "wrap" }}>
                <motion.div whileHover={{ y: -4 }} style={{ flex: 1, minWidth: "200px" }}>
                  <h4 style={{ textAlign: "center" }}>Model Predictions</h4>
                  <Bar data={modelChartData} options={{
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: { y: { title: { display: true, text: 'Revenue (M)' } } }
                  }} />
                </motion.div>
                <motion.div whileHover={{ y: -4 }} style={{ flex: 1, minWidth: "200px" }}>
                  <h4 style={{ textAlign: "center" }}>Budget Breakdown</h4>
                  <Doughnut data={roiChartData} options={{
                    responsive: true,
                    plugins: { legend: { position: 'bottom' } }
                  }} />
                </motion.div>
              </div>

              {/* Detailed Stats */}
              <div className="glass-card" style={{
                background: "rgba(255,255,255,0.05)",
                padding: "20px",
                borderRadius: "15px",
                marginTop: "20px"
              }}>
                <h4>📊 Prediction Details</h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginTop: "15px" }}>
                  <div>
                    <span style={{ color: "#64748b" }}>Budget:</span>
                    <span style={{ marginLeft: "10px" }}>${(result.financials.budget / 1e6).toFixed(2)}M</span>
                  </div>
                  <div>
                    <span style={{ color: "#64748b" }}>Predicted Revenue:</span>
                    <span style={{ marginLeft: "10px", color: "#22c55e" }}>${(result.financials.predicted_revenue / 1e6).toFixed(2)}M</span>
                  </div>
                  <div>
                    <span style={{ color: "#64748b" }}>Profit:</span>
                    <span style={{ marginLeft: "10px", color: result.financials.profit > 0 ? "#22c55e" : "#ef4444" }}>
                      ${(result.financials.profit / 1e6).toFixed(2)}M
                    </span>
                  </div>
                  <div>
                    <span style={{ color: "#64748b" }}>Breakeven:</span>
                    <span style={{ marginLeft: "10px" }}>{result.financials.breakeven_achieved ? "✅ Yes" : "❌ No"}</span>
                  </div>
                </div>

                <h4 style={{ marginTop: "20px" }}>📈 Confidence Intervals</h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div style={{ background: "rgba(59,130,246,0.1)", padding: "10px", borderRadius: "8px" }}>
                    <small>80% Confidence</small>
                    <div>${(result.confidence.interval_80.low / 1e6).toFixed(2)}M - ${(result.confidence.interval_80.high / 1e6).toFixed(2)}M</div>
                  </div>
                  <div style={{ background: "rgba(168,85,247,0.1)", padding: "10px", borderRadius: "8px" }}>
                    <small>95% Confidence</small>
                    <div>${(result.confidence.interval_95.low / 1e6).toFixed(2)}M - ${(result.confidence.interval_95.high / 1e6).toFixed(2)}M</div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div style={{
              textAlign: "center",
              padding: "60px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "20px"
            }}>
              <h2 style={{ color: "#64748b" }}>🔮 No Prediction Yet</h2>
              <p style={{ color: "#94a3b8", marginTop: "10px" }}>
                Enter movie details and click "Get Prediction" to see results
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
  padding: "12px 15px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(0,0,0,0.3)",
  color: "white",
  fontSize: "16px",
  outline: "none"
};

const buttonStyle = {
  width: "100%",
  padding: "15px",
  marginTop: "25px",
  borderRadius: "12px",
  border: "none",
  background: "linear-gradient(135deg, #22c55e, #16a34a)",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "all 0.3s"
};

export default Predictor;
