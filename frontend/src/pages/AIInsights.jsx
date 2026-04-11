import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, TrendingUp, AlertTriangle, CheckCircle, Lightbulb, Zap, Target, Award, Users, Clock, DollarSign } from 'lucide-react';
import { StaggerContainer, StaggerItem, AnimatedCard } from '../components/animated';

const AI_RECOMMENDATIONS = [
  {
    id: 1,
    type: 'optimal_budget',
    title: 'Sweet Spot Budget',
    description: 'Movies with budgets between $10M-$50M show the highest ROI average (180%).',
    icon: DollarSign,
    color: 'emerald',
    confidence: 92,
    data: { min: 10000000, max: 50000000, avg_roi: 180 }
  },
  {
    id: 2,
    type: 'release_timing',
    title: 'Best Release Windows',
    description: 'Holiday releases (Nov-Dec) earn 3x budget on average. Summer blockbusters earn 2.5x.',
    icon: Clock,
    color: 'blue',
    confidence: 88,
    data: { holiday_roi: 300, summer_roi: 250 }
  },
  {
    id: 3,
    type: 'genre_strategy',
    title: 'Genre ROI Analysis',
    description: 'Horror films offer highest ROI (420% avg) but higher risk. Animation offers best risk-adjusted returns.',
    icon: Target,
    color: 'purple',
    confidence: 85,
    data: { horror_roi: 420, animation_roi: 280 }
  },
  {
    id: 4,
    type: 'cast_impact',
    title: 'Star Power Matters',
    description: 'Movies with A-list actors see 45% higher opening weekends on average.',
    icon: Users,
    color: 'amber',
    confidence: 78,
    data: { a_list_boost: 45 }
  },
  {
    id: 5,
    type: 'franchise',
    title: 'Franchise Advantage',
    description: 'Sequel/prequel films earn 2.3x more than original IP with 40% lower risk.',
    icon: Award,
    color: 'rose',
    confidence: 95,
    data: { franchise_multiplier: 2.3, risk_reduction: 40 }
  },
  {
    id: 6,
    type: 'runtime',
    title: 'Optimal Runtime',
    description: 'Movies between 110-130 minutes perform best. Avoid exceeding 150 minutes.',
    icon: TrendingUp,
    color: 'cyan',
    confidence: 82,
    data: { optimal_min: 110, optimal_max: 130 }
  }
];

const TREND_PREDICTIONS = [
  { name: 'Streaming Synergy', confidence: 87, trend: 'up' },
  { name: 'Superhero Fatigue', confidence: 72, trend: 'down' },
  { name: 'Horror Renaissance', confidence: 91, trend: 'up' },
  { name: 'AI in VFX', confidence: 95, trend: 'up' },
  { name: 'Smaller Budgets', confidence: 68, trend: 'neutral' },
];

function InsightCard({ insight, index }) {
  const Icon = insight.icon;
  const colorMap = {
    emerald: 'from-emerald-500 to-green-600 text-emerald-400',
    blue: 'from-blue-500 to-indigo-600 text-blue-400',
    purple: 'from-purple-500 to-violet-600 text-purple-400',
    amber: 'from-amber-500 to-orange-600 text-amber-400',
    rose: 'from-rose-500 to-pink-600 text-rose-400',
    cyan: 'from-cyan-500 to-teal-600 text-cyan-400',
  };

  return (
    <StaggerItem>
      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        className="glass-card p-6 relative overflow-hidden group"
      >
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorMap[insight.color]} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500`} />
        
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${colorMap[insight.color]}`}>
            <Icon className="text-white" size={24} />
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{insight.confidence}%</div>
            <div className="text-xs text-gray-400">Confidence</div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-white mb-2">{insight.title}</h3>
        <p className="text-gray-300 text-sm mb-4">{insight.description}</p>

        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-dark-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${insight.confidence}%` }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className={`h-full bg-gradient-to-r ${colorMap[insight.color]}`}
            />
          </div>
        </div>
      </motion.div>
    </StaggerItem>
  );
}

function TrendPrediction({ name, confidence, trend }) {
  const trendColors = {
    up: 'text-emerald-400 bg-emerald-500/20',
    down: 'text-red-400 bg-red-500/20',
    neutral: 'text-gray-400 bg-gray-500/20'
  };
  const trendIcons = {
    up: '↑',
    down: '↓',
    neutral: '→'
  };

  return (
    <div className="flex items-center justify-between p-4 glass-card">
      <div className="flex items-center gap-3">
        <Sparkles className="text-primary-400" size={20} />
        <span className="text-white font-medium">{name}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-gray-400">{confidence}%</span>
        <span className={`px-2 py-1 rounded-full text-sm ${trendColors[trend]}`}>
          {trendIcons[trend]}
        </span>
      </div>
    </div>
  );
}

export default function AIInsights() {
  const [activeTab, setActiveTab] = useState('recommendations');

  return (
    <div className="min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Brain className="text-primary-400" size={40} />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-400 to-emerald-400 bg-clip-text text-transparent">
            AI-Powered Insights
          </h1>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Advanced machine learning analysis and industry predictions to help you make smarter investment decisions
        </p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Insights Generated', value: '2,847', icon: Lightbulb, color: 'from-amber-500 to-orange-600' },
          { label: 'Accuracy Rate', value: '87.3%', icon: Target, color: 'from-emerald-500 to-green-600' },
          { label: 'Trends Tracked', value: '156', icon: TrendingUp, color: 'from-blue-500 to-indigo-600' },
          { label: 'Success Rate', value: '91.2%', icon: CheckCircle, color: 'from-purple-500 to-violet-600' },
        ].map((stat, i) => (
          <AnimatedCard key={i} delay={i * 0.1} className="glass-card p-6 text-center">
            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
              <stat.icon className="text-white" size={28} />
            </div>
            <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </AnimatedCard>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        {[
          { id: 'recommendations', label: 'Recommendations', icon: Brain },
          { id: 'trends', label: 'Trend Predictions', icon: TrendingUp },
          { id: 'risks', label: 'Risk Analysis', icon: AlertTriangle },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <tab.icon size={20} />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'recommendations' && (
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AI_RECOMMENDATIONS.map((insight, i) => (
              <InsightCard key={insight.id} insight={insight} index={i} />
            ))}
          </div>
        </StaggerContainer>
      )}

      {activeTab === 'trends' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Sparkles className="text-amber-400" />
              2024-2025 Trend Predictions
            </h3>
            <div className="space-y-4">
              {TREND_PREDICTIONS.map((trend, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <TrendPrediction {...trend} />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Zap className="text-primary-400" />
              AI Analysis Summary
            </h3>
            <div className="space-y-4 text-gray-300">
              <p>
                <strong className="text-white">Horror Genre:</strong> Continuing strong momentum with 
                improved marketing strategies and streaming acquisitions driving profitability.
              </p>
              <p>
                <strong className="text-white">Animation Market:</strong> Disney/Pixar dominance challenged 
                by indie studios. Mid-budget animation showing excellent returns.
              </p>
              <p>
                <strong className="text-white">Superhero Fatigue:</strong> Moderate decline in pure superhero 
                content, but universe-connected films still perform well.
              </p>
              <p>
                <strong className="text-white">AI in Filmmaking:</strong> VFX cost reduction through AI tools 
                enabling more ambitious projects at lower budgets.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'risks' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatedCard className="glass-card p-6">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <AlertTriangle className="text-red-400" />
              High Risk Factors
            </h3>
            <div className="space-y-4">
              {[
                { factor: 'Budgets > $200M', risk: 85, mitigation: 'Secure pre-sales and streaming deals' },
                { factor: 'Untested IP', risk: 72, mitigation: 'Build franchise potential early' },
                { factor: 'R-Rated Content', risk: 65, mitigation: 'International co-production' },
                { factor: 'Unproven Directors', risk: 58, mitigation: 'Attach experienced producers' },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">{item.factor}</span>
                    <span className="text-red-400 font-bold">{item.risk}%</span>
                  </div>
                  <p className="text-gray-400 text-sm">{item.mitigation}</p>
                </div>
              ))}
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.2} className="glass-card p-6">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <CheckCircle className="text-emerald-400" />
              Risk Mitigation Strategies
            </h3>
            <div className="space-y-4">
              {[
                { strategy: 'Diversify Genre Mix', impact: 'High' },
                { strategy: 'Star Talent Attachment', impact: 'Medium' },
                { strategy: 'Festival Premieres', impact: 'Medium' },
                { strategy: 'Streaming Pre-sales', impact: 'High' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                  <span className="text-white font-medium">{item.strategy}</span>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    item.impact === 'High' ? 'bg-emerald-500/30 text-emerald-400' : 'bg-blue-500/30 text-blue-400'
                  }`}>
                    {item.impact} Impact
                  </span>
                </div>
              ))}
            </div>
          </AnimatedCard>
        </div>
      )}
    </div>
  );
}
