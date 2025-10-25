'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Play, RefreshCw } from 'lucide-react';
import { defaultPortfolioConfig } from '@/lib/data';

export default function PortfolioConfig() {
  const [config, setConfig] = useState(defaultPortfolioConfig);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 2000);
  };

  const handleReset = () => {
    setConfig(defaultPortfolioConfig);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-panel p-6 rounded-2xl neon-border-magenta"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg neon-border-magenta bg-neon-magenta/10 flex items-center justify-center">
          <Settings className="w-5 h-5 neon-text-magenta" />
        </div>
        <div>
          <h3 className="text-xl font-display font-bold neon-text-magenta">
            Portfolio Configuration
          </h3>
          <p className="text-xs text-gray-400 font-mono">Simulation Parameters</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Number of Assets */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Number of Assets
          </label>
          <input
            type="number"
            value={config.numAssets}
            onChange={(e) => setConfig({ ...config, numAssets: parseInt(e.target.value) })}
            className="w-full px-4 py-2 rounded-lg bg-black/50 border border-neon-magenta/30 text-white font-mono focus:outline-none focus:border-neon-magenta transition-colors"
          />
        </div>

        {/* Volatility */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Volatility (σ)
          </label>
          <input
            type="number"
            step="0.01"
            value={config.volatility}
            onChange={(e) => setConfig({ ...config, volatility: parseFloat(e.target.value) })}
            className="w-full px-4 py-2 rounded-lg bg-black/50 border border-neon-magenta/30 text-white font-mono focus:outline-none focus:border-neon-magenta transition-colors"
          />
        </div>

        {/* Strike Price */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Strike Price ($)
          </label>
          <input
            type="number"
            value={config.strikePrice}
            onChange={(e) => setConfig({ ...config, strikePrice: parseFloat(e.target.value) })}
            className="w-full px-4 py-2 rounded-lg bg-black/50 border border-neon-magenta/30 text-white font-mono focus:outline-none focus:border-neon-magenta transition-colors"
          />
        </div>

        {/* Spot Price */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Spot Price ($)
          </label>
          <input
            type="number"
            value={config.spotPrice}
            onChange={(e) => setConfig({ ...config, spotPrice: parseFloat(e.target.value) })}
            className="w-full px-4 py-2 rounded-lg bg-black/50 border border-neon-magenta/30 text-white font-mono focus:outline-none focus:border-neon-magenta transition-colors"
          />
        </div>

        {/* Risk Free Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Risk-Free Rate (%)
          </label>
          <input
            type="number"
            step="0.01"
            value={config.riskFreeRate}
            onChange={(e) => setConfig({ ...config, riskFreeRate: parseFloat(e.target.value) })}
            className="w-full px-4 py-2 rounded-lg bg-black/50 border border-neon-magenta/30 text-white font-mono focus:outline-none focus:border-neon-magenta transition-colors"
          />
        </div>

        {/* Number of Simulations */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Monte Carlo Iterations
          </label>
          <input
            type="number"
            step="1000"
            value={config.numSimulations}
            onChange={(e) => setConfig({ ...config, numSimulations: parseInt(e.target.value) })}
            className="w-full px-4 py-2 rounded-lg bg-black/50 border border-neon-magenta/30 text-white font-mono focus:outline-none focus:border-neon-magenta transition-colors"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6">
        <motion.button
          onClick={handleRun}
          disabled={isRunning}
          className="cyber-button flex-1 px-6 py-3 rounded-lg neon-border-magenta bg-neon-magenta/10 font-semibold text-neon-magenta flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isRunning ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <RefreshCw className="w-5 h-5" />
              </motion.div>
              <span className="relative z-10">Running...</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Run Simulation</span>
            </>
          )}
        </motion.button>

        <motion.button
          onClick={handleReset}
          className="px-6 py-3 rounded-lg border border-gray-600 bg-black/50 font-semibold text-gray-300 hover:text-white hover:border-gray-400 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Reset
        </motion.button>
      </div>
    </motion.div>
  );
}
