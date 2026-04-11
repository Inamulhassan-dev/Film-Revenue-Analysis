import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function Dashboard() {
  const data = useMemo(
    () => ({
      labels: ["Action", "Drama", "Comedy", "Thriller", "Animation"],
      datasets: [
        {
          label: "Average Revenue (in M)",
          data: [820, 610, 540, 690, 720],
          backgroundColor: ["#2f67f1", "#40a26b", "#cc7a2d", "#8e62e9", "#2b9db0"],
          borderRadius: 8
        }
      ]
    }),
    []
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: "#d7e0f4" },
          grid: { color: "rgba(255,255,255,0.08)" }
        },
        x: {
          ticks: { color: "#d7e0f4" },
          grid: { display: false }
        }
      }
    }),
    []
  );

  return (
    <main style={styles.page}>
      <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} style={styles.heading}>
        📊 Movie Insights Dashboard
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} style={styles.sub}>
        Quick view of average revenue across major genres.
      </motion.p>

      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} style={styles.chartWrap}>
        <div style={styles.chartArea}>
          <Bar data={data} options={options} />
        </div>
      </motion.section>

      <section style={styles.cards}>
        <motion.div whileHover={{ y: -5, scale: 1.02 }} style={styles.card}>
          <h3 style={styles.cardTitle}>Top Genre</h3>
          <p style={styles.cardText}>Action currently leads in average revenue.</p>
        </motion.div>
        <motion.div whileHover={{ y: -5, scale: 1.02 }} style={styles.card}>
          <h3 style={styles.cardTitle}>Balanced Mix</h3>
          <p style={styles.cardText}>Animation and Thriller show reliable performance.</p>
        </motion.div>
      </section>

      <div style={styles.glowA} />
      <div style={styles.glowB} />
    </main>
  );
}

const styles = {
  page: {
    position: "relative",
    maxWidth: 1100,
    margin: "0 auto",
    padding: "32px 16px 56px"
  },
  heading: {
    margin: 0,
    color: "#ffffff",
    fontSize: 34
  },
  sub: {
    margin: "8px 0 18px",
    color: "#d2def9",
    fontSize: 18
  },
  chartWrap: {
    background: "linear-gradient(145deg,rgba(255,255,255,0.12),rgba(255,255,255,0.06))",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: 14,
    padding: 16,
    boxShadow: "0 18px 32px rgba(9,18,43,0.28)"
  },
  chartArea: {
    height: 380
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 14,
    marginTop: 16
  },
  card: {
    background: "linear-gradient(145deg,rgba(255,255,255,0.13),rgba(255,255,255,0.06))",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: 12,
    padding: 14,
    transition: "all .2s ease"
  },
  cardTitle: {
    margin: 0,
    color: "#fff",
    fontSize: 20
  },
  cardText: {
    margin: "8px 0 0",
    color: "#d2def9",
    fontSize: 16
  },
  glowA: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: "50%",
    filter: "blur(78px)",
    background: "rgba(77,123,255,0.2)",
    top: 20,
    right: -90,
    pointerEvents: "none"
  },
  glowB: {
    position: "absolute",
    width: 230,
    height: 230,
    borderRadius: "50%",
    filter: "blur(80px)",
    background: "rgba(54,193,140,0.16)",
    bottom: -60,
    left: -90,
    pointerEvents: "none"
  }
};

export default Dashboard;
