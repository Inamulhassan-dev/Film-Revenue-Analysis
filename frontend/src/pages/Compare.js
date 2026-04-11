import React, { useState } from "react";
import { motion } from "framer-motion";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  RadialLinearScale,
  ArcElement
} from "chart.js";

import { Bar, Radar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, PointElement, LineElement, RadialLinearScale, ArcElement);

const COMPARABLE_MOVIES = [
  { name: "Avatar", budget: 237000000, revenue: 2923706026, runtime: 162, popularity: 150, vote_average: 7.6 },
  { name: "Avengers: Endgame", budget: 356000000, revenue: 2799439100, runtime: 181, popularity: 200, vote_average: 8.3 },
  { name: "Titanic", budget: 200000000, revenue: 2264438822, runtime: 194, popularity: 90, vote_average: 7.9 },
  { name: "Star Wars: The Force Awakens", budget: 245000000, revenue: 2068350756, runtime: 136, popularity: 120, vote_average: 7.8 },
  { name: "Jurassic World", budget: 150000000, revenue: 1370995259, runtime: 124, popularity: 110, vote_average: 6.9 },
  { name: "The Dark Knight", budget: 185000000, revenue: 1006055832, runtime: 152, popularity: 88, vote_average: 8.5 },
  { name: "Joker", budget: 55000000, revenue: 1074258931, runtime: 122, popularity: 95, vote_average: 8.2 },
  { name: "Black Panther", budget: 200000000, revenue: 1348258254, runtime: 134, popularity: 95, vote_average: 7.3 },
  { name: "Frozen II", budget: 150000000, revenue: 1249996526, runtime: 103, popularity: 75, vote_average: 6.8 },
  { name: "Barbie", budget: 145000000, revenue: 1444170556, runtime: 114, popularity: 110, vote_average: 7.0 },
  { name: "Oppenheimer", budget: 100000000, revenue: 952000000, runtime: 180, popularity: 120, vote_average: 8.5 },
  { name: "Spider-Man: No Way Home", budget: 200000000, revenue: 1921376647, runtime: 148, popularity: 170, vote_average: 8.1 },
  { name: "Top Gun: Maverick", budget: 170000000, revenue: 1496448041, runtime: 131, popularity: 100, vote_average: 8.2 },
  { name: "Inception", budget: 160000000, revenue: 839044920, runtime: 148, popularity: 85, vote_average: 8.4 },
  { name: "Interstellar", budget: 165000000, revenue: 677463584, runtime: 169, popularity: 88, vote_average: 8.6 },
  { name: "Dune", budget: 165000000, revenue: 401791141, runtime: 155, popularity: 95, vote_average: 8.0 },
  { name: "The Batman", budget: 185000000, revenue: 770875250, runtime: 176, popularity: 95, vote_average: 7.7 },
  { name: "Guardians of the Galaxy Vol. 3", budget: 250000000, revenue: 845400000, runtime: 150, popularity: 110, vote_average: 8.1 },
  { name: "Aquaman", budget: 160000000, revenue: 1148485546, runtime: 143, popularity: 80, vote_average: 6.9 },
  { name: "Mission: Impossible - Fallout", budget: 178000000, revenue: 791657398, runtime: 147, popularity: 70, vote_average: 7.7 }
];

function Compare() {
  const [selected, setSelected] = useState([]);
  const [maxMovies] = useState(3);

  const formatMoney = (num) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(0)}M`;
    return `$${num.toLocaleString()}`;
  };

  const toggleMovie = (movie) => {
    if (selected.find(m => m.name === movie.name)) {
      setSelected(selected.filter(m => m.name !== movie.name));
    } else if (selected.length < maxMovies) {
      setSelected([...selected, movie]);
    }
  };

  const barChartData = {
    labels: ["Budget", "Revenue", "Profit"],
    datasets: selected.map((movie, idx) => ({
      label: movie.name,
      data: [
        movie.budget / 1e6,
        movie.revenue / 1e6,
        (movie.revenue - movie.budget) / 1e6
      ],
      backgroundColor: [
        ["rgba(239, 68, 68, 0.7)", "rgba(59, 130, 246, 0.7)", "rgba(168, 85, 247, 0.7)"][idx]
      ]
    }))
  };

  const radarChartData = {
    labels: ["Budget", "Popularity", "Rating", "Runtime", "Revenue", "ROI"],
    datasets: selected.map((movie, idx) => ({
      label: movie.name,
      data: [
        Math.min(movie.budget / 3e8 * 100, 100),
        movie.popularity,
        movie.vote_average * 10,
        movie.runtime / 2,
        Math.min(movie.revenue / 3e9 * 100, 100),
        Math.min(((movie.revenue - movie.budget) / movie.budget * 100) / 5, 100)
      ],
      borderColor: ["#ef4444", "#3b82f6", "#22c55e"][idx],
      backgroundColor: ["rgba(239, 68, 68, 0.2)", "rgba(59, 130, 246, 0.2)", "rgba(34, 197, 94, 0.2)"][idx]
    }))
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1400px", margin: "0 auto" }}>
      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: "center", marginBottom: "40px" }}
      >
        ⚖️ Movie Comparison Tool
      </motion.h1>

      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
        {/* Movie Selection */}
        <div style={{ flex: "1", minWidth: "350px" }}>
          <h3>Select Movies (Max {maxMovies})</h3>
          <div style={{ 
            maxHeight: "600px", 
            overflowY: "auto",
            padding: "10px",
            background: "rgba(255,255,255,0.03)",
            borderRadius: "12px"
          }}>
            {COMPARABLE_MOVIES.map((movie, idx) => {
              const isSelected = selected.find(m => m.name === movie.name);
              const isDisabled = !isSelected && selected.length >= maxMovies;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -2 }}
                  onClick={() => !isDisabled && toggleMovie(movie)}
                  style={{
                    padding: "15px",
                    marginBottom: "10px",
                    background: isSelected ? "rgba(59, 130, 246, 0.2)" : "rgba(255,255,255,0.05)",
                    borderRadius: "10px",
                    cursor: isDisabled ? "not-allowed" : "pointer",
                    opacity: isDisabled ? 0.5 : 1,
                    border: isSelected ? "2px solid #3b82f6" : "2px solid transparent",
                    transition: "all 0.2s"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h4 style={{ margin: 0 }}>{movie.name}</h4>
                    <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                      ⭐ {movie.vote_average} | {movie.release_year || "2024"}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "15px", marginTop: "8px", fontSize: "13px", color: "#64748b" }}>
                    <span>Budget: {formatMoney(movie.budget)}</span>
                    <span>Revenue: {formatMoney(movie.revenue)}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Comparison Results */}
        <div style={{ flex: "1.5", minWidth: "400px" }}>
          {selected.length > 0 ? (
            <>
              {/* Comparison Table */}
              <div style={{
                background: "rgba(255,255,255,0.05)",
                borderRadius: "16px",
                padding: "20px",
                overflowX: "auto"
              }}>
                <h3>📊 Side-by-Side Comparison</h3>
                <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "15px" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                      <th style={{ textAlign: "left", padding: "12px", color: "#94a3b8" }}>Metric</th>
                      {selected.map(m => (
                        <th key={m.name} style={{ textAlign: "right", padding: "12px", color: "#3b82f6" }}>{m.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <td style={{ padding: "12px" }}>Budget</td>
                      {selected.map(m => <td key={m.name} style={{ textAlign: "right", color: "#ef4444" }}>{formatMoney(m.budget)}</td>)}
                    </tr>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <td style={{ padding: "12px" }}>Revenue</td>
                      {selected.map(m => <td key={m.name} style={{ textAlign: "right", color: "#22c55e" }}>{formatMoney(m.revenue)}</td>)}
                    </tr>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <td style={{ padding: "12px" }}>Profit</td>
                      {selected.map(m => (
                        <td key={m.name} style={{ textAlign: "right", color: m.revenue > m.budget ? "#22c55e" : "#ef4444" }}>
                          {formatMoney(m.revenue - m.budget)}
                        </td>
                      ))}
                    </tr>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <td style={{ padding: "12px" }}>ROI</td>
                      {selected.map(m => (
                        <td key={m.name} style={{ textAlign: "right", color: "#3b82f6" }}>
                          {((m.revenue - m.budget) / m.budget * 100).toFixed(0)}%
                        </td>
                      ))}
                    </tr>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <td style={{ padding: "12px" }}>Runtime</td>
                      {selected.map(m => <td key={m.name} style={{ textAlign: "right" }}>{m.runtime} min</td>)}
                    </tr>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <td style={{ padding: "12px" }}>Popularity</td>
                      {selected.map(m => <td key={m.name} style={{ textAlign: "right" }}>{m.popularity}</td>)}
                    </tr>
                    <tr>
                      <td style={{ padding: "12px" }}>Rating</td>
                      {selected.map(m => (
                        <td key={m.name} style={{ textAlign: "right" }}>
                          <span style={{
                            background: m.vote_average >= 8 ? "#22c55e" : m.vote_average >= 6 ? "#eab308" : "#ef4444",
                            padding: "2px 8px",
                            borderRadius: "10px",
                            fontSize: "12px"
                          }}>
                            ⭐ {m.vote_average}
                          </span>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Charts */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "30px" }}>
                <motion.div whileHover={{ y: -4 }} style={{ background: "rgba(255,255,255,0.05)", padding: "20px", borderRadius: "16px" }}>
                  <h4 style={{ textAlign: "center" }}>Financial Comparison</h4>
                  <Bar data={barChartData} options={{
                    responsive: true,
                    plugins: { legend: { position: 'bottom' } },
                    scales: { y: { title: { display: true, text: 'Millions $' } } }
                  }} />
                </motion.div>
                <motion.div whileHover={{ y: -4 }} style={{ background: "rgba(255,255,255,0.05)", padding: "20px", borderRadius: "16px" }}>
                  <h4 style={{ textAlign: "center" }}>Multi-Dimensional Comparison</h4>
                  <Radar data={radarChartData} options={{
                    responsive: true,
                    plugins: { legend: { position: 'bottom' } },
                    scales: { r: { min: 0, max: 100 } }
                  }} />
                </motion.div>
              </div>
            </>
          ) : (
            <div style={{
              textAlign: "center",
              padding: "100px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "20px"
            }}>
              <h2 style={{ color: "#64748b" }}>⚖️ No Movies Selected</h2>
              <p style={{ color: "#94a3b8", marginTop: "10px" }}>
                Select movies from the left to compare them side by side
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Compare;
