import React, { useState } from "react";
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
  ArcElement
} from "chart.js";

import { Line, Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend, ArcElement);

const TRENDS_DATA = {
  monthlyRevenue: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    data: [0.8, 0.9, 1.1, 1.3, 2.2, 2.8, 3.2, 2.9, 1.0, 1.2, 2.5, 3.5]
  },
  yearlyRevenue: {
    labels: ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"],
    data: [30.2, 32.1, 35.8, 36.0, 38.2, 42.1, 38.5, 40.1, 43.8, 42.5, 12.1, 44.2, 37.5, 45.2, 48.1]
  },
  genreROI: {
    labels: ["Horror", "Animation", "Superhero", "Sci-Fi", "Action", "Comedy", "Drama", "Romance"],
    roi: [420, 280, 260, 220, 190, 160, 120, 90],
    risk: [85, 35, 40, 55, 50, 60, 45, 70]
  },
  budgetRanges: {
    labels: ["< $10M", "$10-50M", "$50-100M", "$100-200M", "> $200M"],
    avgROI: [350, 180, 120, 85, 45],
    movieCount: [450, 800, 600, 400, 200]
  },
  topGrossing: [
    { rank: 1, title: "Avatar", revenue: 2923706026, year: 2009 },
    { rank: 2, title: "Avengers: Endgame", revenue: 2799439100, year: 2019 },
    { rank: 3, title: "Avatar: The Way of Water", revenue: 2320252801, year: 2022 },
    { rank: 4, title: "Titanic", revenue: 2264438822, year: 1997 },
    { rank: 5, title: "Star Wars: The Force Awakens", revenue: 2068350756, year: 2015 }
  ]
};

const fadeInUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 }
};

function Trends() {
  const [activeTab, setActiveTab] = useState("overview");

  const formatMoney = (num) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(0)}M`;
    return `$${num.toLocaleString()}`;
  };

  const monthlyChartData = {
    labels: TRENDS_DATA.monthlyRevenue.labels,
    datasets: [{
      label: 'Revenue Multiplier (vs avg)',
      data: TRENDS_DATA.monthlyRevenue.data,
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      fill: true,
      tension: 0.4
    }]
  };

  const yearlyChartData = {
    labels: TRENDS_DATA.yearlyRevenue.labels,
    datasets: [{
      label: 'Total Box Office ($ Billions)',
      data: TRENDS_DATA.yearlyRevenue.data,
      backgroundColor: 'rgba(34, 197, 94, 0.7)',
      borderRadius: 8
    }]
  };

  const genreChartData = {
    labels: TRENDS_DATA.genreROI.labels,
    datasets: [{
      label: 'Average ROI (%)',
      data: TRENDS_DATA.genreROI.roi,
      backgroundColor: TRENDS_DATA.genreROI.roi.map(roi => 
        roi > 300 ? 'rgba(34, 197, 94, 0.7)' : 
        roi > 200 ? 'rgba(59, 130, 246, 0.7)' : 
        roi > 100 ? 'rgba(234, 179, 8, 0.7)' : 
        'rgba(239, 68, 68, 0.7)'
      ),
      borderRadius: 6
    }]
  };

  const budgetChartData = {
    labels: TRENDS_DATA.budgetRanges.labels,
    datasets: [{
      label: 'Average ROI (%)',
      data: TRENDS_DATA.budgetRanges.avgROI,
      backgroundColor: 'rgba(168, 85, 247, 0.7)',
      borderRadius: 6
    }]
  };

  const riskChartData = {
    labels: TRENDS_DATA.genreROI.labels,
    datasets: [{
      data: TRENDS_DATA.genreROI.risk,
      backgroundColor: TRENDS_DATA.genreROI.risk.map(r => 
        r < 40 ? 'rgba(34, 197, 94, 0.7)' : 
        r < 60 ? 'rgba(234, 179, 8, 0.7)' : 
        'rgba(239, 68, 68, 0.7)'
      )
    }]
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1600px", margin: "0 auto" }}>
      <motion.h1
        initial={fadeInUp.initial}
        animate={fadeInUp.animate}
        transition={{ duration: 0.45 }}
        style={{ textAlign: "center", marginBottom: "40px" }}
      >
        📈 Industry Trends & Insights
      </motion.h1>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "40px" }}
      >
        <QuickStat 
          title="2024 Global Box Office" 
          value="$48.1B" 
          change="+6.4%"
          positive={true}
          icon="🎬"
        />
        <QuickStat 
          title="Total Movies Tracked" 
          value="2,450" 
          change="+12%"
          positive={true}
          icon="🎥"
        />
        <QuickStat 
          title="Avg Horror ROI" 
          value="420%" 
          change="Highest"
          positive={true}
          icon="👻"
        />
        <QuickStat 
          title="Peak Season" 
          value="Summer" 
          change="3.2x avg"
          positive={true}
          icon="☀️"
        />
      </motion.div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "30px", flexWrap: "wrap" }}>
        {["overview", "seasonal", "genres", "budgets", "top"].map(tab => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            whileHover={{ y: -2, scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: "12px 24px",
              borderRadius: "10px",
              border: "none",
              background: activeTab === tab ? "#3b82f6" : "rgba(255,255,255,0.1)",
              color: "white",
              cursor: "pointer",
              fontWeight: activeTab === tab ? "bold" : "normal",
              textTransform: "capitalize"
            }}
          >
            {tab === "overview" && "📊 "}
            {tab === "seasonal" && "📅 "}
            {tab === "genres" && "🎭 "}
            {tab === "budgets" && "💰 "}
            {tab === "top" && "🏆 "}
            {tab}
          </motion.button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
          <div style={{ background: "rgba(255,255,255,0.05)", padding: "25px", borderRadius: "16px" }}>
            <h3 style={{ textAlign: "center" }}>Yearly Box Office Trend</h3>
            <Line data={yearlyChartData} options={{
              responsive: true,
              plugins: { legend: { display: false } },
              scales: { y: { title: { display: true, text: 'Billions $' } } }
            }} />
          </div>
          <div style={{ background: "rgba(255,255,255,0.05)", padding: "25px", borderRadius: "16px" }}>
            <h3 style={{ textAlign: "center" }}>Monthly Revenue Patterns</h3>
            <Line data={monthlyChartData} options={{
              responsive: true,
              plugins: { legend: { display: false } },
              scales: { y: { title: { display: true, text: 'Multiplier vs Average' } } }
            }} />
          </div>
        </div>
      )}

      {activeTab === "seasonal" && (
        <div style={{ background: "rgba(255,255,255,0.05)", padding: "25px", borderRadius: "16px" }}>
          <h3 style={{ textAlign: "center" }}>Monthly Revenue Multiplier</h3>
          <p style={{ textAlign: "center", color: "#94a3b8", marginBottom: "20px" }}>
            How much more (or less) revenue movies typically earn compared to the annual average
          </p>
          <Line data={monthlyChartData} options={{
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { 
              y: { title: { display: true, text: 'Revenue Multiplier' } },
              x: { title: { display: true, text: 'Month' } }
            }
          }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", marginTop: "30px" }}>
            <div style={{ background: "rgba(239,68,68,0.1)", padding: "20px", borderRadius: "12px", textAlign: "center" }}>
              <h4 style={{ color: "#ef4444" }}>❄️ Winter Season</h4>
              <p style={{ fontSize: "14px", color: "#94a3b8" }}>Nov - Feb</p>
              <p style={{ fontSize: "24px", fontWeight: "bold", color: "#22c55e" }}>3.2x avg</p>
              <small style={{ color: "#64748b" }}>Holiday releases perform best</small>
            </div>
            <div style={{ background: "rgba(234,179,8,0.1)", padding: "20px", borderRadius: "12px", textAlign: "center" }}>
              <h4 style={{ color: "#eab308" }}>☀️ Summer Season</h4>
              <p style={{ fontSize: "14px", color: "#94a3b8" }}>May - Aug</p>
              <p style={{ fontSize: "24px", fontWeight: "bold", color: "#22c55e" }}>2.8x avg</p>
              <small style={{ color: "#64748b" }}>Blockbuster season</small>
            </div>
            <div style={{ background: "rgba(148,163,184,0.1)", padding: "20px", borderRadius: "12px", textAlign: "center" }}>
              <h4 style={{ color: "#94a3b8" }}>🍂 Shoulder Season</h4>
              <p style={{ fontSize: "14px", color: "#94a3b8" }}>Mar - Apr, Sep - Oct</p>
              <p style={{ fontSize: "24px", fontWeight: "bold", color: "#3b82f6" }}>1.1x avg</p>
              <small style={{ color: "#64748b" }}>Opportunity for unique films</small>
            </div>
          </div>
        </div>
      )}

      {activeTab === "genres" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
          <div style={{ background: "rgba(255,255,255,0.05)", padding: "25px", borderRadius: "16px" }}>
            <h3 style={{ textAlign: "center" }}>Average ROI by Genre</h3>
            <Bar data={genreChartData} options={{
              responsive: true,
              indexAxis: 'y',
              plugins: { legend: { display: false } },
              scales: { x: { title: { display: true, text: 'ROI (%)' } } }
            }} />
          </div>
          <div style={{ background: "rgba(255,255,255,0.05)", padding: "25px", borderRadius: "16px" }}>
            <h3 style={{ textAlign: "center" }}>Risk Level by Genre</h3>
            <Doughnut data={riskChartData} options={{
              responsive: true,
              plugins: { legend: { position: 'right' } }
            }} />
          </div>
          <div style={{ background: "rgba(255,255,255,0.05)", padding: "25px", borderRadius: "16px", gridColumn: "1 / -1" }}>
            <h3 style={{ textAlign: "center" }}>Genre Insights</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginTop: "20px" }}>
              <GenreCard 
                title="🎃 Horror" 
                stats={["Avg ROI: 420%", "Risk: High (85%)", "Best months: Oct, Jan", "Low budget advantage"]}
                color="#ef4444"
              />
              <GenreCard 
                title="🎨 Animation" 
                stats={["Avg ROI: 280%", "Risk: Low (35%)", "Family audience", "Franchise potential"]}
                color="#22c55e"
              />
              <GenreCard 
                title="🦸 Superhero" 
                stats={["Avg ROI: 260%", "Risk: Medium (40%)", "High floor, high ceiling", "Requires IP/Studio"]}
                color="#3b82f6"
              />
              <GenreCard 
                title="🚀 Sci-Fi" 
                stats={["Avg ROI: 220%", "Risk: Medium (55%)", "VFX dependent", "Global appeal"]}
                color="#8b5cf6"
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === "budgets" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
          <div style={{ background: "rgba(255,255,255,0.05)", padding: "25px", borderRadius: "16px" }}>
            <h3 style={{ textAlign: "center" }}>ROI by Budget Range</h3>
            <Bar data={budgetChartData} options={{
              responsive: true,
              plugins: { legend: { display: false } },
              scales: { y: { title: { display: true, text: 'Average ROI (%)' } } }
            }} />
          </div>
          <div style={{ background: "rgba(255,255,255,0.05)", padding: "25px", borderRadius: "16px" }}>
            <h3 style={{ textAlign: "center" }}>Budget Sweet Spot Analysis</h3>
            <div style={{ padding: "20px" }}>
              <div style={{ 
                background: "linear-gradient(135deg, rgba(34,197,94,0.2), rgba(59,130,246,0.2))",
                padding: "30px",
                borderRadius: "16px",
                textAlign: "center"
              }}>
                <h4 style={{ color: "#22c55e" }}>💡 Optimal Budget Range</h4>
                <h2 style={{ fontSize: "36px", margin: "10px 0" }}>$10M - $50M</h2>
                <p style={{ color: "#94a3b8" }}>180% average ROI with manageable risk</p>
              </div>
              <div style={{ marginTop: "20px", padding: "15px", background: "rgba(0,0,0,0.2)", borderRadius: "10px" }}>
                <h4 style={{ marginBottom: "10px" }}>Budget Strategy Guide:</h4>
                <ul style={{ color: "#94a3b8", paddingLeft: "20px", fontSize: "14px" }}>
                  <li><strong style={{ color: "#22c55e" }}>$5-15M:</strong> Horror, indie films - highest ROI potential</li>
                  <li><strong style={{ color: "#eab308" }}>$50-100M:</strong> Mid-tier comedies, dramas - moderate returns</li>
                  <li><strong style={{ color: "#3b82f6" }}>$100-200M:</strong> Franchise films - safer investments</li>
                  <li><strong style={{ color: "#ef4444" }}>$200M+:</strong> Event films - high floor, variable ceiling</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "top" && (
        <div style={{ background: "rgba(255,255,255,0.05)", padding: "25px", borderRadius: "16px" }}>
          <h3 style={{ textAlign: "center" }}>🏆 Top 5 Highest Grossing Films</h3>
          <div style={{ marginTop: "30px" }}>
            {TRENDS_DATA.topGrossing.map((movie, idx) => (
              <div key={idx} style={{
                display: "flex",
                alignItems: "center",
                padding: "20px",
                marginBottom: "15px",
                background: idx === 0 ? "linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,165,0,0.1))" :
                           idx === 1 ? "linear-gradient(135deg, rgba(192,192,192,0.2), rgba(169,169,169,0.1))" :
                           idx === 2 ? "linear-gradient(135deg, rgba(205,127,50,0.2), rgba(184,134,11,0.1))" :
                           "rgba(255,255,255,0.03)",
                borderRadius: "12px",
                border: idx < 3 ? "1px solid rgba(255,255,255,0.1)" : "none"
              }}>
                <div style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background: idx === 0 ? "#FFD700" : idx === 1 ? "#C0C0C0" : idx === 2 ? "#CD7F32" : "#64748b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginRight: "20px"
                }}>
                  {movie.rank}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: 0 }}>{movie.title}</h4>
                  <small style={{ color: "#94a3b8" }}>{movie.year}</small>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "24px", fontWeight: "bold", color: "#22c55e" }}>
                    {formatMoney(movie.revenue)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function QuickStat({ title, value, change, positive, icon }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      style={{
      background: "rgba(255,255,255,0.05)",
      padding: "20px",
      borderRadius: "12px",
      textAlign: "center"
    }}>
      <div style={{ fontSize: "24px", marginBottom: "5px" }}>{icon}</div>
      <div style={{ color: "#94a3b8", fontSize: "13px" }}>{title}</div>
      <div style={{ fontSize: "28px", fontWeight: "bold", marginTop: "5px" }}>{value}</div>
      <div style={{ 
        color: positive ? "#22c55e" : "#ef4444", 
        fontSize: "12px",
        marginTop: "5px"
      }}>
        {change}
      </div>
    </motion.div>
  );
}

function GenreCard({ title, stats, color }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.05)", padding: "20px", borderRadius: "12px" }}>
      <h4 style={{ color, marginTop: 0 }}>{title}</h4>
      <ul style={{ margin: "10px 0 0 0", paddingLeft: "20px", color: "#94a3b8", fontSize: "14px" }}>
        {stats.map((stat, idx) => <li key={idx}>{stat}</li>)}
      </ul>
    </div>
  );
}

export default Trends;
