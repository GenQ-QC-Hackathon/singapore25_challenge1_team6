'use client';

import { motion } from 'framer-motion';
import ClassicalMonteCarloPanel from '@/components/dashboard/ClassicalMonteCarloPanel';
import QuantumPanel from '@/components/dashboard/QuantumPanel';
import PortfolioConfig from '@/components/dashboard/PortfolioConfig';
import ResultsVisualization from '@/components/dashboard/ResultsVisualization';
import SystemLogs from '@/components/dashboard/SystemLogs';
import QuantumCircuitVisualizer from '@/components/dashboard/QuantumCircuitVisualizer';

export default function DashboardPage() {
  return (
    <div className="min-h-screen gradient-bg py-12 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-display font-black mb-4">
            <span className="text-gradient">Quantum Finance</span>
            <br />
            <span className="neon-text-blue">Risk Dashboard</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Real-time Monte Carlo simulation and Quantum Amplitude Estimation analysis
          </p>
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Simulations */}
          <div className="lg:col-span-2 space-y-6">
            {/* Classical and Quantum Panels */}
            <div className="grid md:grid-cols-2 gap-6">
              <ClassicalMonteCarloPanel />
              <QuantumPanel />
            </div>

            {/* Results Visualization */}
            <ResultsVisualization />

            {/* System Logs */}
            <SystemLogs />
          </div>

          {/* Right Column - Configuration */}
          <div className="space-y-6">
            <PortfolioConfig />

            {/* Quantum Circuit Visualizer */}
            <QuantumCircuitVisualizer />

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="glass-panel p-6 rounded-2xl neon-border-blue"
            >
              <h3 className="text-lg font-display font-bold neon-text-blue mb-4">
                Risk Metrics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                  <span className="text-sm text-gray-400">PFE 95%</span>
                  <span className="text-sm font-mono neon-text-blue">$12,500</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                  <span className="text-sm text-gray-400">PFE 99%</span>
                  <span className="text-sm font-mono neon-text-blue">$18,750</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                  <span className="text-sm text-gray-400">CVA</span>
                  <span className="text-sm font-mono neon-text-purple">$2,340</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                  <span className="text-sm text-gray-400">Expected Exposure</span>
                  <span className="text-sm font-mono neon-text-magenta">$8,900</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Confidence Level</span>
                  <span className="text-sm font-mono text-green-400">99%</span>
                </div>
              </div>
            </motion.div>

            {/* SDG Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="glass-panel p-6 rounded-2xl border-2 border-neon-magenta/30 holographic"
            >
              <div className="text-center">
                <motion.div
                  className="text-4xl mb-2"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  🎯
                </motion.div>
                <h4 className="text-lg font-display font-bold neon-text-magenta mb-2">
                  UN SDG 8
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Decent Work & Economic Growth through enhanced financial risk management
                  and quantum-accelerated stability analysis
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
