'use client';

import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Clock, TrendingDown, Loader2 } from 'lucide-react';
import { generateMonteCarloData } from '@/lib/data';

const data = generateMonteCarloData(30);

export default function ClassicalMonteCarloPanel() {
  const isLoading = false; // This would come from props or state in real implementation

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-slate-200 rounded-xl p-6 border-l-4 border-l-blue-500"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <Activity className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-900">
              Classical Monte Carlo
            </h3>
            <p className="text-xs text-slate-500 font-mono">Traditional Simulation</p>
          </div>
        </div>
        {isLoading ? (
          <div className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 flex items-center gap-2">
            <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
            <span className="text-sm font-mono text-blue-600">RUNNING</span>
          </div>
        ) : (
          <div className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
            <span className="text-sm font-mono text-blue-600">COMPLETE</span>
          </div>
        )}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-slate-50">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-medium text-slate-600">Runtime</span>
          </div>
          <p className="text-2xl font-semibold text-slate-900">
            {data[data.length - 1].classicalTime.toFixed(2)}s
          </p>
        </div>

        <div className="p-4 rounded-lg bg-slate-50">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-medium text-slate-600">Error Rate</span>
          </div>
          <p className="text-2xl font-semibold text-slate-900">
            {data[data.length - 1].classicalError.toFixed(2)}%
          </p>
        </div>

        <div className="p-4 rounded-lg bg-slate-50">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-medium text-slate-600">Convergence</span>
          </div>
          <p className="text-lg font-semibold text-slate-900 font-mono">
            1/√N
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis
              dataKey="iteration"
              stroke="#64748B"
              style={{ fontSize: '12px', fontFamily: 'JetBrains Mono' }}
            />
            <YAxis
              stroke="#64748B"
              style={{ fontSize: '12px', fontFamily: 'JetBrains Mono' }}
            />
            <Tooltip
              contentStyle={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                color: '#0F172A',
              }}
            />
            <Line
              type="monotone"
              dataKey="classicalPFE"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-200">
        <p className="text-sm text-slate-600">
          <span className="font-semibold text-blue-600">PFE:</span>{' '}
          ${data[data.length - 1].classicalPFE.toFixed(2)}
        </p>
      </div>
    </motion.div>
  );
}
