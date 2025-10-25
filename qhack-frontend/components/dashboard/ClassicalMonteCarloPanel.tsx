'use client';

import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Clock, TrendingDown } from 'lucide-react';
import { generateMonteCarloData } from '@/lib/data';

const data = generateMonteCarloData(30);

export default function ClassicalMonteCarloPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-panel p-6 rounded-2xl neon-border-blue scanlines"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg neon-border-blue bg-neon-blue/10 flex items-center justify-center">
            <Activity className="w-5 h-5 neon-text-blue" />
          </div>
          <div>
            <h3 className="text-xl font-display font-bold neon-text-blue">
              Classical Monte Carlo
            </h3>
            <p className="text-xs text-gray-400 font-mono">Traditional Simulation</p>
          </div>
        </div>
        <motion.div
          className="px-3 py-1 rounded-full neon-border-blue bg-neon-blue/5"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="text-sm font-mono neon-text-blue">RUNNING</span>
        </motion.div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-black/30 border border-neon-blue/20">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-neon-blue" />
            <span className="text-xs text-gray-400">Runtime</span>
          </div>
          <p className="text-2xl font-display font-bold neon-text-blue">
            {data[data.length - 1].classicalTime.toFixed(2)}s
          </p>
        </div>

        <div className="p-4 rounded-lg bg-black/30 border border-neon-blue/20">
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown className="w-4 h-4 text-neon-blue" />
            <span className="text-xs text-gray-400">Error Rate</span>
          </div>
          <p className="text-2xl font-display font-bold neon-text-blue">
            {data[data.length - 1].classicalError.toFixed(2)}%
          </p>
        </div>

        <div className="p-4 rounded-lg bg-black/30 border border-neon-blue/20">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-4 h-4 text-neon-blue" />
            <span className="text-xs text-gray-400">Convergence</span>
          </div>
          <p className="text-lg font-display font-bold neon-text-blue">
            1/√N
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 240, 255, 0.1)" />
            <XAxis
              dataKey="iteration"
              stroke="rgba(0, 240, 255, 0.5)"
              style={{ fontSize: '12px', fontFamily: 'JetBrains Mono' }}
            />
            <YAxis
              stroke="rgba(0, 240, 255, 0.5)"
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
            <Line
              type="monotone"
              dataKey="classicalPFE"
              stroke="#00f0ff"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t border-neon-blue/20">
        <p className="text-sm text-gray-400">
          <span className="font-semibold text-neon-blue">PFE:</span>{' '}
          ${data[data.length - 1].classicalPFE.toFixed(2)}
        </p>
      </div>
    </motion.div>
  );
}
