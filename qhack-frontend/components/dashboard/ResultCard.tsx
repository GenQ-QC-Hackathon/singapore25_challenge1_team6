'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Zap, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { ClassicalResult, QuantumResult } from '@/lib/api';
import AnimatedNumber from '../ui/AnimatedNumber';

export interface ResultCardProps {
  type: 'classical' | 'quantum';
  result: ClassicalResult | QuantumResult;
  className?: string;
}

export default function ResultCard({ type, result, className = '' }: ResultCardProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const isClassical = type === 'classical';
  const classicalResult = isClassical ? (result as ClassicalResult) : null;
  const quantumResult = !isClassical ? (result as QuantumResult) : null;

  // Color scheme based on type
  const colorScheme = {
    border: isClassical ? 'border-blue-500' : 'border-violet-500',
    icon: isClassical ? 'text-blue-500' : 'text-violet-500',
    badge: isClassical ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-violet-50 border-violet-200 text-violet-600',
    metric: isClassical ? 'text-blue-600' : 'text-violet-600',
    button: isClassical ? 'hover:bg-blue-50 text-blue-600' : 'hover:bg-violet-50 text-violet-600',
  };

  // Top 3 metrics
  const primaryMetrics = [
    {
      label: 'Potential Future Exposure',
      value: result.pfe,
      prefix: '$',
      decimals: 2,
    },
    {
      label: 'Expected Exposure',
      value: isClassical ? classicalResult?.expected_exposure : quantumResult?.expected_exposure,
      prefix: '$',
      decimals: 2,
    },
    {
      label: 'Runtime',
      value: result.runtime_ms,
      suffix: 'ms',
      decimals: 1,
      icon: Clock,
    },
  ];

  // Additional metrics for "View Details"
  const secondaryMetrics = isClassical
    ? [
        { label: 'Samples Used', value: classicalResult?.samples_used.toLocaleString() },
        { label: 'Sample Mean', value: classicalResult?.sample_mean.toFixed(2) },
        { label: 'Sample Std Dev', value: classicalResult?.sample_std.toFixed(2) },
        { label: 'Variance Reduction', value: classicalResult?.variance_reduction },
        { label: 'Confidence Level', value: `${(result.alpha * 100).toFixed(0)}%` },
      ]
    : [
        { label: 'Qubits', value: quantumResult?.num_qubits.toString() },
        { label: 'Discretization Bins', value: quantumResult?.discretization_bins.toLocaleString() },
        { label: 'AE Iterations', value: quantumResult?.ae_iterations.toString() },
        { label: 'Backend', value: quantumResult?.backend },
        { label: 'Circuit Depth', value: quantumResult?.circuit_depth?.toString() || 'N/A' },
        { label: 'Confidence Level', value: `${(result.alpha * 100).toFixed(0)}%` },
      ];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`bg-white border-l-4 ${colorScheme.border} rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200 ease-out p-8 ${className}`}
      aria-label={`${isClassical ? 'Classical Monte Carlo' : 'Quantum Amplitude Estimation'} results`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          {isClassical ? (
            <Activity className={`w-6 h-6 ${colorScheme.icon}`} aria-hidden="true" />
          ) : (
            <Zap className={`w-6 h-6 ${colorScheme.icon}`} aria-hidden="true" />
          )}
          {isClassical ? 'Classical Monte Carlo' : 'Quantum Amplitude Estimation'}
        </h3>
        <div className={`px-4 py-2 ${colorScheme.badge} border rounded-full`}>
          <span className="font-mono text-sm font-medium">
            {isClassical ? 'O(1/√N)' : 'O(1/N)'}
          </span>
        </div>
      </div>

      {/* Primary Metrics - Top 3 with tabular figures */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        {primaryMetrics.map((metric, index) => (
          <div key={index} className="bg-slate-50 rounded-lg p-6 shadow-sm border border-slate-100">
            <p className="text-slate-600 text-sm font-medium mb-3 uppercase tracking-wide flex items-center gap-2">
              {metric.icon && <metric.icon className="w-4 h-4" aria-hidden="true" />}
              {metric.label}
            </p>
            <p className={`text-5xl font-bold ${colorScheme.metric} tabular-nums`}>
              {typeof metric.value === 'number' ? (
                <AnimatedNumber
                  value={metric.value}
                  decimals={metric.decimals}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  duration={1000}
                />
              ) : (
                'N/A'
              )}
            </p>
          </div>
        ))}
      </div>

      {/* Collapsible "View Details" Section */}
      <div className="border-t border-slate-200 pt-6">
        <button
          onClick={() => setIsDetailsOpen(!isDetailsOpen)}
          className={`w-full flex items-center justify-between text-sm font-semibold text-slate-700 uppercase tracking-wide transition-colors duration-200 ${colorScheme.button} rounded-lg px-4 py-3`}
          aria-expanded={isDetailsOpen}
          aria-controls={`${type}-details`}
        >
          <span>View Details</span>
          {isDetailsOpen ? (
            <ChevronUp className="w-4 h-4" aria-hidden="true" />
          ) : (
            <ChevronDown className="w-4 h-4" aria-hidden="true" />
          )}
        </button>

        <AnimatePresence initial={false}>
          {isDetailsOpen && (
            <motion.div
              id={`${type}-details`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
                {secondaryMetrics.map((metric, index) => (
                  <div key={index} className="bg-slate-50 rounded-lg p-4 shadow-sm border border-slate-100">
                    <p className="text-slate-600 text-xs font-medium mb-1 uppercase tracking-wide">
                      {metric.label}
                    </p>
                    <p className="text-lg font-mono text-slate-900 tabular-nums">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}
