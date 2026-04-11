import { motion } from 'framer-motion';

export const AnimatedCard = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export const AnimatedButton = ({ children, onClick, className = "", variant = "primary", ...props }) => {
  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40",
    secondary: "bg-white/10 hover:bg-white/20 border border-white/20",
    success: "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg shadow-emerald-500/25",
    danger: "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-6 py-3 text-white font-semibold rounded-xl transition-all duration-300 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export const AnimatedInput = ({ label, icon: Icon, ...props }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="mb-4"
  >
    {label && (
      <label className="block text-gray-300 mb-2 text-sm font-medium">
        {label}
      </label>
    )}
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Icon size={18} />
        </div>
      )}
      <input
        className={`w-full px-4 py-3 bg-dark-200/50 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 ${Icon ? 'pl-10' : ''}`}
        {...props}
      />
    </div>
  </motion.div>
);

export const MetricCard = ({ title, value, change, icon: Icon, color = "primary" }) => {
  const colors = {
    primary: "from-primary-500 to-blue-600",
    success: "from-emerald-500 to-green-600",
    warning: "from-amber-500 to-orange-600",
    danger: "from-red-500 to-rose-600",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="glass-card p-6 relative overflow-hidden"
    >
      <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${colors[color]} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2`} />
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-400 text-sm">{title}</span>
        {Icon && <Icon className="text-primary-400" size={24} />}
      </div>
      <div className={`text-3xl font-bold bg-gradient-to-r ${colors[color]} bg-clip-text text-transparent`}>
        {value}
      </div>
      {change && (
        <div className={`text-sm mt-2 ${change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
          {change >= 0 ? '+' : ''}{change}%
        </div>
      )}
    </motion.div>
  );
};

export const AnimatedChart = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    className="glass-card p-6"
  >
    {children}
  </motion.div>
);

export const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

export const StaggerContainer = ({ children, delay = 0 }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren: delay,
          staggerChildren: 0.1,
        },
      },
    }}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className = "" }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    }}
    transition={{ duration: 0.4 }}
    className={className}
  >
    {children}
  </motion.div>
);

export const PulseGlow = ({ children, color = "primary" }) => (
  <motion.div
    animate={{
      boxShadow: [
        `0 0 5px rgba(59, 130, 246, 0.3)`,
        `0 0 20px rgba(59, 130, 246, 0.6)`,
        `0 0 5px rgba(59, 130, 246, 0.3)`,
      ],
    }}
    transition={{ duration: 2, repeat: Infinity }}
    className="rounded-xl"
  >
    {children}
  </motion.div>
);

export const FlipCard = ({ front, back, isFlipped, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    onClick={onClick}
    style={{ perspective: 1000 }}
    className="cursor-pointer"
  >
    <motion.div
      initial={false}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.6 }}
      style={{
        transformStyle: 'preserve-3d',
        position: 'relative',
      }}
    >
      <div
        style={{ backfaceVisibility: 'hidden' }}
        className="glass-card p-6"
      >
        {front}
      </div>
      <div
        style={{
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          position: 'absolute',
          inset: 0,
        }}
        className="glass-card p-6"
      >
        {back}
      </div>
    </motion.div>
  </motion.div>
);

export const Confetti = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 2,
    duration: Math.random() * 2 + 2,
    color: ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6'][Math.floor(Math.random() * 5)],
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ top: -10, left: `${p.x}%`, opacity: 1 }}
          animate={{
            top: '100vh',
            opacity: 0,
            rotate: Math.random() * 720,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            width: 10,
            height: 10,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
          }}
        />
      ))}
    </div>
  );
};
