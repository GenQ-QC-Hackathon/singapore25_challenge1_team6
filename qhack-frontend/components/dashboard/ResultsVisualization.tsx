'use client';

import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart3, Trophy } from 'lucide-react';
import { generateMonteCarloData } from '@/lib/data';

const data = generateMonteCarloData(50);
const comparisonData = [
  {
    metric: 'Runtime (s)',
    Classical: data[data.length - 1].classicalTime,
    Quantum: data[data.length - 1].quantumTime,
  },
  {
    metric: 'Error Rate (%)',
    Classical: data[data.length - 1].classicalError,
    Quantum: data[data.length - 1].quantumError,
  },
  {
    metric: 'PFE ($K)',
    Classical: data[data.length - 1].classicalPFE / 1000,
    Quantum: data[data.length - 1].quantumPFE / 1000,
  },
];

export default function ResultsVisualization() {
  const speedup = (
    data[data.length - 1].classicalTime / data[data.length - 1].quantumTime
  ).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-panel p-6 rounded-2xl neon-border-blue holographic"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg neon-border-blue bg-neon-blue/10 flex items-center justify-center">
          <BarChart3 className="w-5 h-5 neon-text-blue" />
        </div>
        <div>
          <h3 className="text-xl font-display font-bold text-gradient">
            Performance Comparison
          </h3>
          <p className="text-xs text-gray-400 font-mono">Classical vs Quantum</p>
        </div>
      </div>

      {/* Speedup Banner */}
      <motion.div
        className="mb-6 p-4 rounded-lg neon-border-purple bg-gradient-to-r from-neon-purple/10 via-neon-magenta/10 to-neon-blue/10"
        animate={{
          boxShadow: [
            '0 0 20px rgba(176, 0, 255, 0.3)',
            '0 0 30px rgba(255, 0, 255, 0.4)',
            '0 0 20px rgba(0, 240, 255, 0.3)',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-neon-magenta" />
            <div>
              <p className="text-sm text-gray-400">Quantum Speedup</p>
              <p className="text-3xl font-display font-bold text-gradient">
                {speedup}x
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Error Reduction</p>
            <p className="text-2xl font-display font-bold neon-text-blue">
              {(
                ((data[data.length - 1].classicalError - data[data.length - 1].quantumError) /
                  data[data.length - 1].classicalError) *
                100
              ).toFixed(1)}%
            </p>
          </div>
        </div>
      </motion.div>

      {/* Comparison Chart */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 240, 255, 0.1)" />
            <XAxis
              dataKey="metric"
              stroke="rgba(255, 255, 255, 0.5)"
              style={{ fontSize: '12px', fontFamily: 'JetBrains Mono' }}
            />
            <YAxis
              stroke="rgba(255, 255, 255, 0.5)"
              style={{ fontSize: '12px', fontFamily: 'JetBrains Mono' }}
            />
            <Tooltip
              contentStyle={{
                background: 'rgba(10, 10, 30, 0.9)',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Legend
              wrapperStyle={{
                fontFamily: 'JetBrains Mono',
                fontSize: '12px',
              }}
            />
            <Bar dataKey="Classical" fill="#00f0ff" radius={[8, 8, 0, 0]} />
            <Bar dataKey="Quantum" fill="#b000ff" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="p-4 rounded-lg bg-black/30 border border-neon-blue/20">
          <p className="text-xs text-gray-400 mb-1">Classical Convergence</p>
          <p className="text-lg font-display font-bold neon-text-blue font-mono">
            O(1/√N)
          </p>
        </div>
        <div className="p-4 rounded-lg bg-black/30 border border-neon-purple/20">
          <p className="text-xs text-gray-400 mb-1">Quantum Convergence</p>
          <p className="text-lg font-display font-bold neon-text-purple font-mono">
            O(1/N)
          </p>
        </div>
      </div>
    </motion.div>
  );
}
