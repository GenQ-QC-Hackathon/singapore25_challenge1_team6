'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Zap, Clock, Award } from 'lucide-react';
import { ClassicalResult, QuantumResult } from '@/lib/api';
import AnimatedNumber from '../ui/AnimatedNumber';

export interface ComparisonViewProps {
  classicalResult: ClassicalResult;
  quantumResult: QuantumResult;
  className?: string;
}

export default function ComparisonView({
  classicalResult,
  quantumResult,
  className = '',
}: ComparisonViewProps) {
  // Calculate speedup metrics
  const speedup = classicalResult.runtime_ms / quantumResult.runtime_ms;
  const timeSaved = classicalResult.runtime_ms - quantumResult.runtime_ms;
  const percentageFaster = ((timeSaved / classicalResult.runtime_ms) * 100);

  // Calculate accuracy comparison
  const pfeComparison = Math.abs(classicalResult.pfe - quantumResult.pfe);
  const pfePercentDiff = (pfeComparison / classicalResult.pfe) * 100;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={{ 
        duration: 0.4, 
        ease: [0.16, 1, 0.3, 1],
        delay: 0.2 
      }}
      className={`relative ${className}`}
      aria-label="Quantum vs Classical Comparison"
    >
      {/* Gradient Border Container */}
      <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-blue-500 via-violet-500 to-blue-500 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-out">
        {/* Content Container with Neutral Background */}
        <div className="relative bg-white rounded-2xl p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <Award className="w-8 h-8 text-violet-600" aria-hidden="true" />
                Performance Comparison
              </h3>
              <p className="text-slate-600 mt-2">
                Quantum advantage analysis
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-violet-600 text-white px-6 py-3 rounded-full shadow-md">
              <span className="text-sm font-semibold uppercase tracking-wide">
                Quantum Advantage
              </span>
            </div>
          </div>

          {/* Main Speedup Metric - Primary Focus */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 ease-out p-8 mb-6 border border-slate-200">
            <div className="text-center">
              <p className="text-slate-600 text-lg font-medium mb-4 uppercase tracking-wide flex items-center justify-center gap-2">
                <TrendingUp className="w-6 h-6 text-violet-600" aria-hidden="true" />
                Quantum Speedup
              </p>
              <div className="flex items-baseline justify-center gap-3">
                <p className="text-7xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent tabular-nums">
                  <AnimatedNumber
                    value={speedup}
                    decimals={2}
                    suffix="×"
                    duration={1200}
                  />
                </p>
                <span className="text-2xl text-slate-600 font-medium">faster</span>
              </div>
              <p className="text-slate-500 mt-4 text-lg">
                Quantum computing achieved{' '}
                <span className="font-semibold text-violet-600">
                  <AnimatedNumber
                    value={percentageFaster}
                    decimals={1}
                    suffix="%"
                    duration={1200}
                  />
                </span>
                {' '}reduction in computation time
              </p>
            </div>
          </div>

          {/* Side-by-Side Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Classical Column */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 ease-out p-6 border-l-4 border-blue-500">
              <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" aria-hidden="true" />
                Classical Monte Carlo
              </h4>
              <div className="space-y-4">
                <div>
                  <p className="text-slate-600 text-sm font-medium mb-1 uppercase tracking-wide">
                    Runtime
                  </p>
                  <p className="text-3xl font-bold text-blue-600 tabular-nums flex items-baseline gap-2">
                    <Clock className="w-5 h-5" aria-hidden="true" />
                    <AnimatedNumber
                      value={classicalResult.runtime_ms}
                      decimals={1}
                      suffix="ms"
                      duration={1000}
                    />
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 text-sm font-medium mb-1 uppercase tracking-wide">
                    PFE Result
                  </p>
                  <p className="text-2xl font-bold text-slate-900 tabular-nums">
                    $<AnimatedNumber
                      value={classicalResult.pfe}
                      decimals={2}
                      duration={1000}
                    />
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 text-sm font-medium mb-1 uppercase tracking-wide">
                    Complexity
                  </p>
                  <p className="text-lg font-mono text-slate-700">
                    O(1/√N)
                  </p>
                </div>
              </div>
            </div>

            {/* Quantum Column */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 ease-out p-6 border-l-4 border-violet-500">
              <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-violet-500" aria-hidden="true" />
                Quantum Amplitude Estimation
              </h4>
              <div className="space-y-4">
                <div>
                  <p className="text-slate-600 text-sm font-medium mb-1 uppercase tracking-wide">
                    Runtime
                  </p>
                  <p className="text-3xl font-bold text-violet-600 tabular-nums flex items-baseline gap-2">
                    <Zap className="w-5 h-5" aria-hidden="true" />
                    <AnimatedNumber
                      value={quantumResult.runtime_ms}
                      decimals={1}
                      suffix="ms"
                      duration={1000}
                    />
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 text-sm font-medium mb-1 uppercase tracking-wide">
                    PFE Result
                  </p>
                  <p className="text-2xl font-bold text-slate-900 tabular-nums">
                    $<AnimatedNumber
                      value={quantumResult.pfe}
                      decimals={2}
                      duration={1000}
                    />
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 text-sm font-medium mb-1 uppercase tracking-wide">
                    Complexity
                  </p>
                  <p className="text-lg font-mono text-slate-700">
                    O(1/N)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 shadow-sm">
              <p className="text-slate-600 text-xs font-medium mb-1 uppercase tracking-wide">
                Time Saved
              </p>
              <p className="text-2xl font-bold text-emerald-600 tabular-nums">
                <AnimatedNumber
                  value={timeSaved}
                  decimals={1}
                  suffix="ms"
                  duration={1000}
                />
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 shadow-sm">
              <p className="text-slate-600 text-xs font-medium mb-1 uppercase tracking-wide">
                PFE Difference
              </p>
              <p className="text-2xl font-bold text-slate-900 tabular-nums">
                $<AnimatedNumber
                  value={pfeComparison}
                  decimals={2}
                  duration={1000}
                />
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 shadow-sm">
              <p className="text-slate-600 text-xs font-medium mb-1 uppercase tracking-wide">
                Accuracy Variance
              </p>
              <p className="text-2xl font-bold text-slate-900 tabular-nums">
                <AnimatedNumber
                  value={pfePercentDiff}
                  decimals={2}
                  suffix="%"
                  duration={1000}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
