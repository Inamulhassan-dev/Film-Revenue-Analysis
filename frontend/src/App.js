import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Predictor from "./pages/Predictor";
import Explorer from "./pages/Explorer";
import Compare from "./pages/Compare";
import Trends from "./pages/Trends";
import WhatIf from "./pages/WhatIf";
import AIInsights from "./pages/AIInsights";
import PortfolioBuilder from "./pages/PortfolioBuilder";
import About from "./pages/About";
import FilmReelBackground from "./components/FilmReelBackground";

function App() {
  return (
    <Router>
      <FilmReelBackground />
      <Navbar />
      <div className="min-h-screen" style={{ position: "relative", zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/predict" element={<Predictor />} />
          <Route path="/explorer" element={<Explorer />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/whatif" element={<WhatIf />} />
          <Route path="/ai-insights" element={<AIInsights />} />
          <Route path="/portfolio" element={<PortfolioBuilder />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
