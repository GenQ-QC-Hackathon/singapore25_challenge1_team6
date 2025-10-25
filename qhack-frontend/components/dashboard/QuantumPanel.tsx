'use client';

import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Zap, Clock, TrendingDown, Cpu } from 'lucide-react';
import { generateMonteCarloData } from '@/lib/data';

const data = generateMonteCarloData(30);

export default function QuantumPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-panel p-6 rounded-2xl neon-border-purple scanlines"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-10 h-10 rounded-lg neon-border-purple bg-neon-purple/10 flex items-center justify-center"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Zap className="w-5 h-5 neon-text-purple" />
          </motion.div>
          <div>
            <h3 className="text-xl font-display font-bold neon-text-purple">
              Quantum Amplitude Estimation
            </h3>
            <p className="text-xs text-gray-400 font-mono">Quadratic Speedup</p>
          </div>
        </div>
        <motion.div
          className="px-3 py-1 rounded-full neon-border-purple bg-neon-purple/5"
          animate={{
            opacity: [0.5, 1, 0.5],
            boxShadow: [
              '0 0 10px rgba(176, 0, 255, 0.3)',
              '0 0 20px rgba(176, 0, 255, 0.6)',
              '0 0 10px rgba(176, 0, 255, 0.3)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="text-sm font-mono neon-text-purple">QUANTUM</span>
        </motion.div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-black/30 border border-neon-purple/20">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-neon-purple" />
            <span className="text-xs text-gray-400">Runtime</span>
          </div>
          <p className="text-2xl font-display font-bold neon-text-purple">
            {data[data.length - 1].quantumTime.toFixed(2)}s
          </p>
        </div>

        <div className="p-4 rounded-lg bg-black/30 border border-neon-purple/20">
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown className="w-4 h-4 text-neon-purple" />
            <span className="text-xs text-gray-400">Error Rate</span>
          </div>
          <p className="text-2xl font-display font-bold neon-text-purple">
            {data[data.length - 1].quantumError.toFixed(2)}%
          </p>
        </div>

        <div className="p-4 rounded-lg bg-black/30 border border-neon-purple/20">
          <div className="flex items-center gap-2 mb-1">
            <Cpu className="w-4 h-4 text-neon-purple" />
            <span className="text-xs text-gray-400">Convergence</span>
          </div>
          <p className="text-lg font-display font-bold neon-text-purple">
            1/N
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(176, 0, 255, 0.1)" />
            <XAxis
              dataKey="iteration"
              stroke="rgba(176, 0, 255, 0.5)"
              style={{ fontSize: '12px', fontFamily: 'JetBrains Mono' }}
            />
            <YAxis
              stroke="rgba(176, 0, 255, 0.5)"
              style={{ fontSize: '12px', fontFamily: 'JetBrains Mono' }}
            />
            <Tooltip
              contentStyle={{
                background: 'rgba(10, 10, 30, 0.9)',
                border: '1px solid rgba(176, 0, 255, 0.3)',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Line
              type="monotone"
              dataKey="quantumPFE"
              stroke="#b000ff"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t border-neon-purple/20">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">
            <span className="font-semibold text-neon-purple">PFE:</span>{' '}
            ${data[data.length - 1].quantumPFE.toFixed(2)}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Qubits: 8</span>
            <span className="text-xs text-gray-400">|</span>
            <span className="text-xs text-gray-400">Depth: 42</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
