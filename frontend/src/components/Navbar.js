import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [open, setOpen] = useState(false);

  const items = [
    { to: "/", label: "🏠 Home" },
    { to: "/predict", label: "🎯 Predict" },
    { to: "/explorer", label: "🔎 Explorer" },
    { to: "/compare", label: "⚖️ Compare" },
    { to: "/whatif", label: "🧪 What If" },
    { to: "/trends", label: "📈 Trends" },
    { to: "/dashboard", label: "📊 Dashboard" },
    { to: "/about", label: "ℹ️ About" }
  ];

  return (
    <header style={styles.header}>
      <div style={styles.wrap}>
        <motion.div initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} style={styles.brand}>
          🎬 Film Analyzer
        </motion.div>

        <button style={styles.menuBtn} onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? "✖" : "☰"}
        </button>

        <nav style={styles.desktopNav}>
          {items.map((item, i) => (
            <motion.div key={item.to} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <NavLink
                to={item.to}
                style={({ isActive }) => ({
                  ...styles.link,
                  ...(isActive ? styles.active : {})
                })}
              >
                {item.label}
              </NavLink>
            </motion.div>
          ))}
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24 }}
            style={styles.mobileNav}
          >
            {items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                style={({ isActive }) => ({
                  ...styles.mobileLink,
                  ...(isActive ? styles.mobileActive : {})
                })}
              >
                {item.label}
              </NavLink>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

const styles = {
  header: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    backdropFilter: "blur(14px)",
    background: "linear-gradient(180deg,rgba(10,23,48,0.96),rgba(10,23,48,0.84))",
    borderBottom: "1px solid rgba(180,201,255,0.2)"
  },
  wrap: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    gap: 10
  },
  brand: {
    color: "#fff",
    fontSize: 24,
    fontWeight: 800,
    marginRight: "auto",
    letterSpacing: 0.2
  },
  menuBtn: {
    display: "none",
    border: "1px solid rgba(255,255,255,0.25)",
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    borderRadius: 10,
    padding: "6px 10px",
    cursor: "pointer"
  },
  desktopNav: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap"
  },
  link: {
    textDecoration: "none",
    color: "#d8e4ff",
    padding: "8px 12px",
    borderRadius: 10,
    fontSize: 14,
    border: "1px solid transparent",
    transition: "all .2s ease"
  },
  active: {
    color: "#fff",
    background: "linear-gradient(135deg,#2f67f1,#1f4cc2)",
    border: "1px solid rgba(158,185,255,0.5)",
    boxShadow: "0 8px 24px rgba(33,72,179,0.35)"
  },
  mobileNav: {
    display: "none"
  },
  mobileLink: {
    textDecoration: "none",
    color: "#d8e4ff",
    padding: "10px 12px",
    borderRadius: 10,
    fontSize: 15,
    border: "1px solid transparent"
  },
  mobileActive: {
    color: "#fff",
    background: "#2f67f1",
    border: "1px solid rgba(163,189,255,0.5)"
  }
};

if (typeof window !== "undefined") {
  const media = window.matchMedia("(max-width: 980px)");
  const apply = () => {
    styles.menuBtn.display = media.matches ? "inline-block" : "none";
    styles.desktopNav.display = media.matches ? "none" : "flex";
    styles.mobileNav.display = media.matches ? "grid" : "none";
    styles.mobileNav.maxWidth = media.matches ? 1200 : "none";
    styles.mobileNav.margin = media.matches ? "0 auto" : "0";
    styles.mobileNav.padding = media.matches ? "0 16px 12px" : "0";
    styles.mobileNav.gap = media.matches ? "6px" : "0";
  };
  apply();
  media.addEventListener("change", apply);
}

export default Navbar;
