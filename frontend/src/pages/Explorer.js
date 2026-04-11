import React, { useState } from "react";
import { motion } from "framer-motion";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";

import { Bar, Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ArcElement
);

const SAMPLE_MOVIES = [
  { title: "Avatar", budget: 237000000, revenue: 2923706026, runtime: 162, popularity: 150, vote_average: 7.6, release_year: 2009, genres: "Action,Adventure" },
  { title: "Avengers: Endgame", budget: 356000000, revenue: 2799439100, runtime: 181, popularity: 200, vote_average: 8.3, release_year: 2019, genres: "Action,Sci-Fi" },
  { title: "Titanic", budget: 200000000, revenue: 2264438822, runtime: 194, popularity: 90, vote_average: 7.9, release_year: 1997, genres: "Drama,Romance" },
  { title: "Star Wars: The Force Awakens", budget: 245000000, revenue: 2068350756, runtime: 136, popularity: 120, vote_average: 7.8, release_year: 2015, genres: "Action,Sci-Fi" },
  { title: "Jurassic World", budget: 150000000, revenue: 1370995259, runtime: 124, popularity: 110, vote_average: 6.9, release_year: 2015, genres: "Action,Adventure" },
  { title: "The Dark Knight", budget: 185000000, revenue: 1006055832, runtime: 152, popularity: 88, vote_average: 8.5, release_year: 2008, genres: "Action,Crime" },
  { title: "Joker", budget: 55000000, revenue: 1074258931, runtime: 122, popularity: 95, vote_average: 8.2, release_year: 2019, genres: "Crime,Drama" },
  { title: "Black Panther", budget: 200000000, revenue: 1348258254, runtime: 134, popularity: 95, vote_average: 7.3, release_year: 2018, genres: "Action,Sci-Fi" },
  { title: "Frozen II", budget: 150000000, revenue: 1249996526, runtime: 103, popularity: 75, vote_average: 6.8, release_year: 2019, genres: "Animation,Family" },
  { title: "Barbie", budget: 145000000, revenue: 1444170556, runtime: 114, popularity: 110, vote_average: 7.0, release_year: 2023, genres: "Comedy,Adventure" },
  { title: "Oppenheimer", budget: 100000000, revenue: 952000000, runtime: 180, popularity: 120, vote_average: 8.5, release_year: 2023, genres: "Drama,History" },
  { title: "Spider-Man: No Way Home", budget: 200000000, revenue: 1921376647, runtime: 148, popularity: 170, vote_average: 8.1, release_year: 2021, genres: "Action,Adventure" },
  { title: "Top Gun: Maverick", budget: 170000000, revenue: 1496448041, runtime: 131, popularity: 100, vote_average: 8.2, release_year: 2022, genres: "Action,Drama" },
  { title: "The Lion King (2019)", budget: 260000000, revenue: 1446909325, runtime: 118, popularity: 95, vote_average: 7.1, release_year: 2019, genres: "Animation,Adventure" },
  { title: "Inception", budget: 160000000, revenue: 839044920, runtime: 148, popularity: 85, vote_average: 8.4, release_year: 2010, genres: "Sci-Fi,Action" },
  { title: "Interstellar", budget: 165000000, revenue: 677463584, runtime: 169, popularity: 88, vote_average: 8.6, release_year: 2014, genres: "Sci-Fi,Drama" },
  { title: "Dune", budget: 165000000, revenue: 401791141, runtime: 155, popularity: 95, vote_average: 8.0, release_year: 2021, genres: "Sci-Fi,Adventure" },
  { title: "Guardians of the Galaxy Vol. 3", budget: 250000000, revenue: 845400000, runtime: 150, popularity: 110, vote_average: 8.1, release_year: 2023, genres: "Action,Sci-Fi" },
  { title: "The Batman", budget: 185000000, revenue: 770875250, runtime: 176, popularity: 95, vote_average: 7.7, release_year: 2022, genres: "Action,Crime" },
  { title: "Aquaman", budget: 160000000, revenue: 1148485546, runtime: 143, popularity: 80, vote_average: 6.9, release_year: 2018, genres: "Action,Fantasy" }
];

function Explorer() {
  const [view, setView] = useState("grid");
  const [sortBy, setSortBy] = useState("revenue");
  const [filterGenre, setFilterGenre] = useState("All");
  const [movies] = useState(SAMPLE_MOVIES);

  const genres = ["All", ...new Set(SAMPLE_MOVIES.flatMap(m => m.genres.split(",")))];

  const filteredMovies = movies
    .filter(m => filterGenre === "All" || m.genres.includes(filterGenre))
    .sort((a, b) => b[sortBy] - a[sortBy]);

  const formatMoney = (num) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
  };

  const revenueChartData = {
    labels: filteredMovies.slice(0, 10).map(m => m.title.length > 15 ? m.title.slice(0, 15) + "..." : m.title),
    datasets: [{
      label: "Revenue",
      data: filteredMovies.slice(0, 10).map(m => m.revenue / 1e9),
      backgroundColor: "rgba(34, 197, 94, 0.7)"
    }, {
      label: "Budget",
      data: filteredMovies.slice(0, 10).map(m => m.budget / 1e9),
      backgroundColor: "rgba(239, 68, 68, 0.7)"
    }]
  };

  const genreChartData = {
    labels: genres.filter(g => g !== "All"),
    datasets: [{
      data: genres.filter(g => g !== "All").map(genre => 
        SAMPLE_MOVIES.filter(m => m.genres.includes(genre)).length
      ),
      backgroundColor: [
        "#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899"
      ]
    }]
  };

  const yearChartData = {
    labels: [...new Set(SAMPLE_MOVIES.map(m => m.release_year))].sort(),
    datasets: [{
      label: "Total Revenue by Year",
      data: [...new Set(SAMPLE_MOVIES.map(m => m.release_year))].sort().map(year =>
        SAMPLE_MOVIES.filter(m => m.release_year === year).reduce((sum, m) => sum + m.revenue, 0) / 1e9
      ),
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      fill: true
    }]
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1600px", margin: "0 auto" }}>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: "center", marginBottom: "40px" }}
      >
        🎬 Movie Explorer
      </motion.h1>

      {/* Controls */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
        flexWrap: "wrap",
        gap: "20px"
      }}>
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <select
            value={filterGenre}
            onChange={(e) => setFilterGenre(e.target.value)}
            style={selectStyle}
          >
            {genres.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={selectStyle}
          >
            <option value="revenue">Sort by Revenue</option>
            <option value="budget">Sort by Budget</option>
            <option value="popularity">Sort by Popularity</option>
            <option value="vote_average">Sort by Rating</option>
            <option value="runtime">Sort by Runtime</option>
          </select>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => setView("grid")} style={{ ...viewBtnStyle, background: view === "grid" ? "#3b82f6" : "transparent" }}>
            📊 Grid
          </button>
          <button onClick={() => setView("chart")} style={{ ...viewBtnStyle, background: view === "chart" ? "#3b82f6" : "transparent" }}>
            📈 Charts
          </button>
        </div>
      </div>

      {view === "grid" ? (
        <>
          {/* Stats Summary */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "30px" }}>
            <StatCard title="Total Movies" value={filteredMovies.length} />
            <StatCard title="Total Revenue" value={formatMoney(filteredMovies.reduce((s, m) => s + m.revenue, 0))} />
            <StatCard title="Avg Budget" value={formatMoney(filteredMovies.reduce((s, m) => s + m.budget, 0) / filteredMovies.length)} />
            <StatCard title="Avg ROI" value={`${((filteredMovies.reduce((s, m) => s + (m.revenue - m.budget) / m.budget, 0) / filteredMovies.length) * 100).toFixed(0)}%`} />
          </div>

          {/* Movie Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "25px" }}>
            {filteredMovies.map((movie, idx) => (
              <motion.div key={idx} whileHover={{ y: -5, scale: 1.02 }} style={{
                background: "rgba(255,255,255,0.05)",
                borderRadius: "16px",
                padding: "20px",
                border: "1px solid rgba(255,255,255,0.1)",
                transition: "all 0.3s"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "15px" }}>
                  <h3 style={{ margin: 0, fontSize: "18px" }}>{movie.title}</h3>
                  <span style={{
                    background: movie.vote_average >= 8 ? "#22c55e" : movie.vote_average >= 6 ? "#eab308" : "#ef4444",
                    padding: "4px 10px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}>
                    ⭐ {movie.vote_average}
                  </span>
                </div>
                <p style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "10px" }}>{movie.genres}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "13px" }}>
                  <div>
                    <span style={{ color: "#64748b" }}>Budget:</span>
                    <span style={{ marginLeft: "5px", color: "#ef4444" }}>{formatMoney(movie.budget)}</span>
                  </div>
                  <div>
                    <span style={{ color: "#64748b" }}>Revenue:</span>
                    <span style={{ marginLeft: "5px", color: "#22c55e" }}>{formatMoney(movie.revenue)}</span>
                  </div>
                  <div>
                    <span style={{ color: "#64748b" }}>ROI:</span>
                    <span style={{ marginLeft: "5px", color: "#3b82f6" }}>
                      {((movie.revenue - movie.budget) / movie.budget * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div>
                    <span style={{ color: "#64748b" }}>Year:</span>
                    <span style={{ marginLeft: "5px" }}>{movie.release_year}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
          <div style={{ background: "rgba(255,255,255,0.05)", padding: "20px", borderRadius: "16px" }}>
            <h3 style={{ textAlign: "center" }}>Top 10 Revenue Comparison</h3>
            <Bar data={revenueChartData} options={{
              responsive: true,
              plugins: { legend: { position: 'bottom' } },
              scales: { y: { title: { display: true, text: 'Amount (Billions $)' } } }
            }} />
          </div>
          <div style={{ background: "rgba(255,255,255,0.05)", padding: "20px", borderRadius: "16px" }}>
            <h3 style={{ textAlign: "center" }}>Movies by Genre</h3>
            <Doughnut data={genreChartData} options={{ responsive: true }} />
          </div>
          <div style={{ background: "rgba(255,255,255,0.05)", padding: "20px", borderRadius: "16px", gridColumn: "1 / -1" }}>
            <h3 style={{ textAlign: "center" }}>Revenue Trends by Year</h3>
            <Line data={yearChartData} options={{
              responsive: true,
              plugins: { legend: { position: 'bottom' } },
              scales: { y: { title: { display: true, text: 'Revenue (Billions $)' } } }
            }} />
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.05)",
      padding: "20px",
      borderRadius: "12px",
      textAlign: "center"
    }}>
      <div style={{ color: "#94a3b8", fontSize: "14px" }}>{title}</div>
      <div style={{ fontSize: "24px", fontWeight: "bold", marginTop: "5px", color: "#3b82f6" }}>{value}</div>
    </div>
  );
}

const selectStyle = {
  padding: "10px 15px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(0,0,0,0.3)",
  color: "white",
  cursor: "pointer"
};

const viewBtnStyle = {
  padding: "10px 20px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.2)",
  color: "white",
  cursor: "pointer",
  transition: "all 0.3s"
};

export default Explorer;
