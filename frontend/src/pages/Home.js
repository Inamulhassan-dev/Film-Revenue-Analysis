import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } }
};

function Home() {
  return (
    <main style={styles.page}>
      <motion.section variants={container} initial="hidden" animate="show" style={styles.hero}>
        <motion.div variants={item} style={styles.badge}>🎬 Smart Studio Assistant</motion.div>
        <motion.h1 variants={item} style={styles.title}>
          Film Revenue Analysis
        </motion.h1>
        <motion.p variants={item} style={styles.subtitle}>
          Predict movie revenue with ML models, compare options, and explore practical insights in one polished dashboard.
        </motion.p>

        <motion.div variants={item} style={styles.actions}>
          <Link to="/predict" style={styles.primaryBtn}>🚀 Start Prediction</Link>
          <Link to="/explorer" style={styles.secondaryBtn}>🎞 Browse Movies</Link>
        </motion.div>
      </motion.section>

      <motion.section variants={container} initial="hidden" animate="show" style={styles.grid}>
        <motion.article variants={item} whileHover={{ y: -6, scale: 1.02 }} style={styles.card}>
          <div style={styles.icon}>🧠</div>
          <h3 style={styles.cardTitle}>ML Forecast</h3>
          <p style={styles.cardText}>Get revenue, ROI, confidence and risk instantly.</p>
        </motion.article>

        <motion.article variants={item} whileHover={{ y: -6, scale: 1.02 }} style={styles.card}>
          <div style={styles.icon}>⚖️</div>
          <h3 style={styles.cardTitle}>Easy Compare</h3>
          <p style={styles.cardText}>Compare multiple movies side by side with charts.</p>
        </motion.article>

        <motion.article variants={item} whileHover={{ y: -6, scale: 1.02 }} style={styles.card}>
          <div style={styles.icon}>📈</div>
          <h3 style={styles.cardTitle}>Clear Trends</h3>
          <p style={styles.cardText}>Understand timing, genres and decision drivers.</p>
        </motion.article>
      </motion.section>

      <div style={styles.bgGlowA} />
      <div style={styles.bgGlowB} />
    </main>
  );
}

const styles = {
  page: {
    position: "relative",
    maxWidth: 1120,
    margin: "0 auto",
    padding: "44px 16px 62px",
    overflow: "hidden"
  },
  hero: {
    textAlign: "center",
    marginBottom: 34
  },
  badge: {
    display: "inline-block",
    fontSize: 14,
    color: "#d9e6ff",
    background: "rgba(95,131,236,0.22)",
    border: "1px solid rgba(156,180,255,0.45)",
    borderRadius: 999,
    padding: "8px 14px",
    marginBottom: 14
  },
  title: {
    margin: 0,
    color: "#fff",
    fontSize: 52,
    lineHeight: 1.06,
    letterSpacing: -0.4
  },
  subtitle: {
    margin: "14px auto 0",
    maxWidth: 760,
    color: "#d9e4ff",
    fontSize: 20,
    lineHeight: 1.45
  },
  actions: {
    marginTop: 24,
    display: "flex",
    justifyContent: "center",
    gap: 12,
    flexWrap: "wrap"
  },
  primaryBtn: {
    textDecoration: "none",
    color: "#fff",
    fontWeight: 700,
    background: "linear-gradient(135deg,#2f67f1,#1d4ed8)",
    border: "1px solid rgba(146,177,255,0.45)",
    borderRadius: 12,
    padding: "12px 18px",
    boxShadow: "0 10px 26px rgba(31,74,194,0.42)"
  },
  secondaryBtn: {
    textDecoration: "none",
    color: "#fff",
    fontWeight: 700,
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: 12,
    padding: "12px 18px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: 16
  },
  card: {
    background: "linear-gradient(145deg,rgba(255,255,255,0.12),rgba(255,255,255,0.06))",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: 16,
    padding: 18,
    backdropFilter: "blur(10px)",
    boxShadow: "0 14px 28px rgba(8,18,42,0.25)"
  },
  icon: {
    fontSize: 26,
    marginBottom: 8
  },
  cardTitle: {
    margin: "0 0 8px",
    color: "#fff",
    fontSize: 22
  },
  cardText: {
    margin: 0,
    color: "#d5e0f7",
    fontSize: 16,
    lineHeight: 1.38
  },
  bgGlowA: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: "50%",
    filter: "blur(80px)",
    background: "rgba(76,118,255,0.24)",
    top: -80,
    right: -90,
    pointerEvents: "none"
  },
  bgGlowB: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: "50%",
    filter: "blur(84px)",
    background: "rgba(54,192,140,0.18)",
    bottom: -70,
    left: -90,
    pointerEvents: "none"
  }
};

export default Home;
