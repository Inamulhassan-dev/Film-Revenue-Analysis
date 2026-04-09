import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-around",
      padding: "15px",
      background: "#020617"
    }}>
      <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/predict">Predictor</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}

export default Navbar;