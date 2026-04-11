import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Plus, Trash2, TrendingUp, AlertCircle, DollarSign, Target, RotateCcw, Download, PieChart, BarChart3 } from 'lucide-react';
import { StaggerContainer, StaggerItem, AnimatedCard, Confetti } from '../components/animated';

const MOVIE_TEMPLATES = [
  { genre: 'Action', avgBudget: 150000000, avgRevenue: 450000000, risk: 'Medium', color: '#ef4444' },
  { genre: 'Animation', avgBudget: 120000000, avgRevenue: 360000000, risk: 'Low', color: '#22c55e' },
  { genre: 'Horror', avgBudget: 15000000, avgRevenue: 63000000, risk: 'High', color: '#a855f7' },
  { genre: 'Comedy', avgBudget: 40000000, avgRevenue: 120000000, risk: 'Medium', color: '#f59e0b' },
  { genre: 'Drama', avgBudget: 25000000, avgRevenue: 75000000, risk: 'Medium', color: '#3b82f6' },
  { genre: 'Sci-Fi', avgBudget: 180000000, avgRevenue: 450000000, risk: 'Medium', color: '#06b6d4' },
  { genre: 'Romance', avgBudget: 30000000, avgRevenue: 90000000, risk: 'Medium', color: '#ec4899' },
  { genre: 'Thriller', avgBudget: 25000000, avgRevenue: 87500000, risk: 'High', color: '#64748b' },
];

const DEFAULT_MOVIE = {
  name: 'New Film',
  genre: 'Action',
  budget: 50000000,
  expectedRevenue: 0,
  risk: 'Medium'
};

function PortfolioMovie({ movie, index, onUpdate, onRemove, totalBudget }) {
  const formatMoney = (num) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
    return `$${num.toLocaleString()}`;
  };

  const genreData = MOVIE_TEMPLATES.find(g => g.genre === movie.genre) || MOVIE_TEMPLATES[0];
  const expectedRevenue = movie.budget * (genreData.avgRevenue / genreData.avgBudget);
  const roi = ((expectedRevenue - movie.budget) / movie.budget * 100);
  const budgetShare = (movie.budget / totalBudget * 100);

  const riskColors = {
    Low: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    Medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    High: 'bg-red-500/20 text-red-400 border-red-500/30'
  };

  return (
    <StaggerItem>
      <motion.div
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="glass-card p-6 relative overflow-hidden group"
      >
        <button
          onClick={() => onRemove(index)}
          className="absolute top-3 right-3 p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
        >
          <Trash2 size={18} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: genreData.color }}
          />
          <input
            type="text"
            value={movie.name}
            onChange={(e) => onUpdate(index, { ...movie, name: e.target.value })}
            className="bg-transparent text-white font-semibold text-lg border-none outline-none w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-gray-400 text-xs mb-1 block">Genre</label>
            <select
              value={movie.genre}
              onChange={(e) => onUpdate(index, { ...movie, genre: e.target.value })}
              className="w-full bg-dark-200/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
            >
              {MOVIE_TEMPLATES.map(g => (
                <option key={g.genre} value={g.genre}>{g.genre}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-gray-400 text-xs mb-1 block">Budget</label>
            <input
              type="number"
              value={movie.budget}
              onChange={(e) => onUpdate(index, { ...movie, budget: Number(e.target.value) })}
              className="w-full bg-dark-200/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="text-center">
            <div className="text-gray-400 text-xs">Expected Revenue</div>
            <div className="text-emerald-400 font-bold">{formatMoney(expectedRevenue)}</div>
          </div>
          <div className="text-center">
            <div className="text-gray-400 text-xs">ROI</div>
            <div className={`font-bold ${roi > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {roi.toFixed(0)}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400 text-xs">Budget Share</div>
            <div className="text-blue-400 font-bold">{budgetShare.toFixed(1)}%</div>
          </div>
        </div>

        <div className={`mt-3 text-center text-xs px-3 py-1 rounded-full border ${riskColors[movie.risk]}`}>
          Risk: {movie.risk}
        </div>
      </motion.div>
    </StaggerItem>
  );
}

function PortfolioMetrics({ movies }) {
  const totalBudget = movies.reduce((sum, m) => sum + m.budget, 0);
  const genreData = MOVIE_TEMPLATES;
  
  const expectedRevenue = movies.reduce((sum, m) => {
    const gd = genreData.find(g => g.genre === m.genre) || genreData[0];
    return sum + (m.budget * (gd.avgRevenue / gd.avgBudget));
  }, 0);

  const avgROI = ((expectedRevenue - totalBudget) / totalBudget * 100);
  const expectedProfit = expectedRevenue - totalBudget;

  const formatMoney = (num) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
    return `$${num.toLocaleString()}`;
  };

  const genreDistribution = movies.reduce((acc, m) => {
    acc[m.genre] = (acc[m.genre] || 0) + m.budget;
    return acc;
  }, {});

  const colors = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#a855f7', '#ec4899', '#06b6d4', '#64748b'];

  return (
    <AnimatedCard className="glass-card p-6">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <Briefcase className="text-primary-400" />
        Portfolio Summary
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-dark-200/50 rounded-xl p-4">
          <div className="text-gray-400 text-sm">Total Investment</div>
          <div className="text-2xl font-bold text-white">{formatMoney(totalBudget)}</div>
        </div>
        <div className="bg-dark-200/50 rounded-xl p-4">
          <div className="text-gray-400 text-sm">Expected Revenue</div>
          <div className="text-2xl font-bold text-emerald-400">{formatMoney(expectedRevenue)}</div>
        </div>
        <div className="bg-dark-200/50 rounded-xl p-4">
          <div className="text-gray-400 text-sm">Expected Profit</div>
          <div className={`text-2xl font-bold ${expectedProfit > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {formatMoney(expectedProfit)}
          </div>
        </div>
        <div className="bg-dark-200/50 rounded-xl p-4">
          <div className="text-gray-400 text-sm">Portfolio ROI</div>
          <div className={`text-2xl font-bold ${avgROI > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {avgROI.toFixed(0)}%
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-400 mb-3">Genre Distribution</h4>
        <div className="space-y-2">
          {Object.entries(genreDistribution).map(([genre, budget], i) => (
            <div key={genre} className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors[i % colors.length] }}
              />
              <span className="text-white text-sm flex-1">{genre}</span>
              <span className="text-gray-400 text-sm">
                {formatMoney(budget)} ({(budget / totalBudget * 100).toFixed(0)}%)
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-500/20 text-primary-400 rounded-lg hover:bg-primary-500/30 transition-colors">
            <PieChart size={16} />
            <span className="text-sm">Pie Chart</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors">
            <BarChart3 size={16} />
            <span className="text-sm">Bar Chart</span>
          </button>
        </div>
      </div>
    </AnimatedCard>
  );
}

export default function PortfolioBuilder() {
  const [movies, setMovies] = useState([
    { ...DEFAULT_MOVIE, name: 'Summer Blockbuster' },
    { ...DEFAULT_MOVIE, name: 'Animated Feature', genre: 'Animation' },
  ]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [maxBudget] = useState(500000000);

  const totalBudget = movies.reduce((sum, m) => sum + m.budget, 0);
  const remainingBudget = maxBudget - totalBudget;
  const isOverBudget = remainingBudget < 0;

  const addMovie = () => {
    setMovies([...movies, { ...DEFAULT_MOVIE, name: `Film ${movies.length + 1}` }]);
  };

  const updateMovie = (index, updatedMovie) => {
    const newMovies = [...movies];
    newMovies[index] = updatedMovie;
    setMovies(newMovies);
  };

  const removeMovie = (index) => {
    setMovies(movies.filter((_, i) => i !== index));
  };

  const resetPortfolio = () => {
    setMovies([{ ...DEFAULT_MOVIE, name: 'New Film 1' }]);
  };

  const analyzePortfolio = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div className="min-h-screen p-8">
      {showConfetti && <Confetti />}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <Briefcase className="text-primary-400" />
              Portfolio Builder
            </h1>
            <p className="text-gray-400">Build and optimize your film investment portfolio</p>
          </div>
          <div className="text-right">
            <div className="text-gray-400 text-sm">Budget Limit</div>
            <div className="text-2xl font-bold text-white">${(maxBudget / 1e6).toFixed(0)}M</div>
          </div>
        </div>
      </motion.div>

      {/* Budget Status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`mb-8 p-4 rounded-xl border ${
          isOverBudget
            ? 'bg-red-500/10 border-red-500/30 text-red-400'
            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isOverBudget ? <AlertCircle /> : <TrendingUp />}
            <span>
              {isOverBudget
                ? `Over budget by $${Math.abs(remainingBudget / 1e6).toFixed(1)}M`
                : `Remaining budget: $${(remainingBudget / 1e6).toFixed(1)}M`
              }
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm opacity-75">${(totalBudget / 1e6).toFixed(1)}M / ${(maxBudget / 1e6).toFixed(0)}M</span>
          </div>
        </div>
        <div className="mt-2 h-2 bg-dark-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, (totalBudget / maxBudget * 100))}%` }}
            className={`h-full ${isOverBudget ? 'bg-red-500' : 'bg-emerald-500'}`}
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Movies List */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              Films ({movies.length})
            </h2>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addMovie}
                disabled={movies.length >= 10}
                className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus size={18} />
                Add Film
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetPortfolio}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg"
              >
                <RotateCcw size={18} />
                Reset
              </motion.button>
            </div>
          </div>

          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence>
                {movies.map((movie, index) => (
                  <PortfolioMovie
                    key={index}
                    movie={movie}
                    index={index}
                    onUpdate={updateMovie}
                    onRemove={removeMovie}
                    totalBudget={totalBudget}
                  />
                ))}
              </AnimatePresence>
            </div>
          </StaggerContainer>

          {movies.length === 0 && (
            <div className="glass-card p-12 text-center">
              <DollarSign className="mx-auto text-gray-500 mb-4" size={48} />
              <p className="text-gray-400">Add films to build your portfolio</p>
            </div>
          )}
        </div>

        {/* Portfolio Summary */}
        <div className="space-y-6">
          <PortfolioMetrics movies={movies} />

          <AnimatedCard className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Target className="text-emerald-400" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={analyzePortfolio}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                <TrendingUp size={18} />
                Analyze Portfolio
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-secondary flex items-center justify-center gap-2"
              >
                <Download size={18} />
                Export Report
              </motion.button>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.2} className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">💡 Tips</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Diversify across genres to reduce risk</li>
              <li>• Mix high-risk/high-reward with stable performers</li>
              <li>• Animation and Horror offer best ROI</li>
              <li>• Consider release timing for each film</li>
            </ul>
          </AnimatedCard>
        </div>
      </div>
    </div>
  );
}
