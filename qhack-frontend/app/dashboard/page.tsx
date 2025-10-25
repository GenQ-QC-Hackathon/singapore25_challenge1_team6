'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Zap, Activity, TrendingUp, Clock, BarChart3, Loader2 } from 'lucide-react';
import { apiClient, ClassicalResult, QuantumResult } from '@/lib/api';

export default function DashboardPage() {
  // Form state
  const [params, setParams] = useState({
    w1: 0.5,
    w2: 0.5,
    strike: 100,
    s0: 100,
    mu: 0.05,
    sigma: 0.2,
    tau: 1.0,
    alpha: 0.95,
    num_samples: 10000,
    num_qubits: 5,
    ae_iterations: 6,
  });

  // Results state
  const [classicalResult, setClassicalResult] = useState<ClassicalResult | null>(null);
  const [quantumResult, setQuantumResult] = useState<QuantumResult | null>(null);

  // Loading state
  const [loading, setLoading] = useState({
    classical: false,
    quantum: false,
    both: false,
  });

  // Error state
  const [error, setError] = useState<string | null>(null);

  const runClassical = async () => {
    setLoading({ ...loading, classical: true });
    setError(null);
    try {
      const result = await apiClient.simulateClassical({
        w1: params.w1,
        w2: params.w2,
        strike: params.strike,
        s0: params.s0,
        mu: params.mu,
        sigma: params.sigma,
        tau: params.tau,
        alpha: params.alpha,
        num_samples: params.num_samples,
        seed: 42,
      });
      setClassicalResult(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading({ ...loading, classical: false });
    }
  };

  const runQuantum = async () => {
    setLoading({ ...loading, quantum: true });
    setError(null);
    try {
      const result = await apiClient.simulateQuantum({
        w1: params.w1,
        w2: params.w2,
        strike: params.strike,
        s0: params.s0,
        mu: params.mu,
        sigma: params.sigma,
        tau: params.tau,
        alpha: params.alpha,
        num_qubits: params.num_qubits,
        ae_iterations: params.ae_iterations,
        backend_name: 'aer_simulator',
        seed: 42,
      });
      setQuantumResult(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading({ ...loading, quantum: false });
    }
  };

  const runBoth = async () => {
    setLoading({ classical: true, quantum: true, both: true });
    setError(null);
    try {
      const [classical, quantum] = await Promise.all([
        apiClient.simulateClassical({
          w1: params.w1,
          w2: params.w2,
          strike: params.strike,
          s0: params.s0,
          mu: params.mu,
          sigma: params.sigma,
          tau: params.tau,
          alpha: params.alpha,
          num_samples: params.num_samples,
          seed: 42,
        }),
        apiClient.simulateQuantum({
          w1: params.w1,
          w2: params.w2,
          strike: params.strike,
          s0: params.s0,
          mu: params.mu,
          sigma: params.sigma,
          tau: params.tau,
          alpha: params.alpha,
          num_qubits: params.num_qubits,
          ae_iterations: params.ae_iterations,
          backend_name: 'aer_simulator',
          seed: 42,
        }),
      ]);
      setClassicalResult(classical);
      setQuantumResult(quantum);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading({ classical: false, quantum: false, both: false });
    }
  };

  const speedup = classicalResult && quantumResult
    ? (classicalResult.runtime_ms / quantumResult.runtime_ms).toFixed(2)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Quantum Risk Engine
            </span>
          </h1>
          <p className="text-slate-600 text-lg">
            Calculate PFE using Classical Monte Carlo vs Quantum Amplitude Estimation
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Input Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Portfolio Parameters
              </h2>

              <div className="space-y-4">
                {/* Asset Weights */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Weight 1</label>
                    <input
                      type="number"
                      step="0.1"
                      value={params.w1}
                      onChange={(e) => setParams({ ...params, w1: parseFloat(e.target.value) })}
                      className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Weight 2</label>
                    <input
                      type="number"
                      step="0.1"
                      value={params.w2}
                      onChange={(e) => setParams({ ...params, w2: parseFloat(e.target.value) })}
                      className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Strike & Initial Price */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Strike Price</label>
                    <input
                      type="number"
                      value={params.strike}
                      onChange={(e) => setParams({ ...params, strike: parseFloat(e.target.value) })}
                      className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Initial Price</label>
                    <input
                      type="number"
                      value={params.s0}
                      onChange={(e) => setParams({ ...params, s0: parseFloat(e.target.value) })}
                      className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Volatility & Drift */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Volatility (σ)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={params.sigma}
                      onChange={(e) => setParams({ ...params, sigma: parseFloat(e.target.value) })}
                      className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Drift (μ)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={params.mu}
                      onChange={(e) => setParams({ ...params, mu: parseFloat(e.target.value) })}
                      className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Confidence Level */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Confidence Level (α): {(params.alpha * 100).toFixed(0)}%
                  </label>
                  <input
                    type="range"
                    min="0.90"
                    max="0.99"
                    step="0.01"
                    value={params.alpha}
                    onChange={(e) => setParams({ ...params, alpha: parseFloat(e.target.value) })}
                    className="w-full accent-blue-500"
                  />
                </div>

                {/* Classical Samples */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    MC Samples: {params.num_samples.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min="1000"
                    max="100000"
                    step="1000"
                    value={params.num_samples}
                    onChange={(e) => setParams({ ...params, num_samples: parseInt(e.target.value) })}
                    className="w-full accent-blue-500"
                  />
                </div>

                {/* Quantum Qubits */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Qubits: {params.num_qubits} (bins: {Math.pow(2, params.num_qubits)})
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="8"
                    step="1"
                    value={params.num_qubits}
                    onChange={(e) => setParams({ ...params, num_qubits: parseInt(e.target.value) })}
                    className="w-full accent-violet-500"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 space-y-3">
                <button
                  onClick={runBoth}
                  disabled={loading.both}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg font-semibold text-white flex items-center justify-center gap-2 hover:from-blue-700 hover:to-violet-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  {loading.both ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Running Both...</>
                  ) : (
                    <><Zap className="w-5 h-5" /> Run Comparison</>
                  )}
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={runClassical}
                    disabled={loading.classical}
                    className="py-3 bg-white border border-blue-300 rounded-lg font-medium text-blue-600 flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors duration-200 disabled:opacity-50"
                  >
                    {loading.classical ? <Loader2 className="w-4 h-4 animate-spin" /> : <Activity className="w-4 h-4" />}
                    Classical
                  </button>

                  <button
                    onClick={runQuantum}
                    disabled={loading.quantum}
                    className="py-3 bg-white border border-violet-300 rounded-lg font-medium text-violet-600 flex items-center justify-center gap-2 hover:bg-violet-50 transition-colors duration-200 disabled:opacity-50"
                  >
                    {loading.quantum ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                    Quantum
                  </button>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
                >
                  <p className="text-red-600 text-sm">{error}</p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Right: Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Classical Result */}
            <AnimatePresence>
              {classicalResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border-l-4 border-blue-500 rounded-xl p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                      <Activity className="w-6 h-6 text-blue-500" />
                      Classical Monte Carlo
                    </h3>
                    <div className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
                      <span className="text-blue-600 font-mono text-sm">O(1/√N)</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-slate-600 text-sm mb-1">Potential Future Exposure</p>
                      <p className="text-3xl font-bold text-blue-600">
                        ${classicalResult.pfe.toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-slate-600 text-sm mb-1">Expected Exposure</p>
                      <p className="text-3xl font-bold text-blue-600">
                        ${classicalResult.expected_exposure.toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-slate-600 text-sm mb-1 flex items-center gap-1">
                        <Clock className="w-4 h-4" /> Runtime
                      </p>
                      <p className="text-3xl font-bold text-blue-600">
                        {classicalResult.runtime_ms.toFixed(1)}ms
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-slate-600 text-sm">Samples Used</p>
                      <p className="text-xl font-mono text-slate-900">{classicalResult.samples_used.toLocaleString()}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-slate-600 text-sm">Std Deviation</p>
                      <p className="text-xl font-mono text-slate-900">{classicalResult.sample_std.toFixed(2)}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quantum Result */}
            <AnimatePresence>
              {quantumResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border-l-4 border-violet-500 rounded-xl p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                      <Zap className="w-6 h-6 text-violet-500" />
                      Quantum Amplitude Estimation
                    </h3>
                    <div className="px-4 py-2 bg-violet-50 border border-violet-200 rounded-full">
                      <span className="text-violet-600 font-mono text-sm">O(1/N)</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-slate-600 text-sm mb-1">Potential Future Exposure</p>
                      <p className="text-3xl font-bold text-violet-600">
                        ${quantumResult.pfe.toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-slate-600 text-sm mb-1">Expected Exposure</p>
                      <p className="text-3xl font-bold text-violet-600">
                        ${quantumResult.expected_exposure?.toFixed(2) || 'N/A'}
                      </p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-slate-600 text-sm mb-1 flex items-center gap-1">
                        <Clock className="w-4 h-4" /> Runtime
                      </p>
                      <p className="text-3xl font-bold text-violet-600">
                        {quantumResult.runtime_ms.toFixed(1)}ms
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-slate-600 text-sm">Qubits</p>
                      <p className="text-xl font-mono text-slate-900">{quantumResult.num_qubits}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-slate-600 text-sm">Bins</p>
                      <p className="text-xl font-mono text-slate-900">{quantumResult.discretization_bins}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-slate-600 text-sm">AE Iterations</p>
                      <p className="text-xl font-mono text-slate-900">{quantumResult.ae_iterations}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Comparison */}
            <AnimatePresence>
              {classicalResult && quantumResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-br from-blue-50 to-violet-50 border border-slate-200 rounded-xl p-6 shadow-sm"
                >
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent mb-6 flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-slate-700" />
                    Performance Comparison
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <p className="text-slate-600 text-sm mb-2">PFE Difference</p>
                      <p className="text-2xl font-bold text-slate-900">
                        {Math.abs(classicalResult.pfe - quantumResult.pfe).toFixed(2)} ({((Math.abs(classicalResult.pfe - quantumResult.pfe) / classicalResult.pfe) * 100).toFixed(1)}%)
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <p className="text-slate-600 text-sm mb-2">Convergence Advantage</p>
                      <p className="text-lg font-semibold text-slate-900">
                        Quantum: O(1/N) vs Classical: O(1/√N)
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
                    <p className="text-center text-base">
                      <span className="text-slate-700">Quantum shows </span>
                      <span className="text-blue-600 font-bold text-lg">quadratic speedup</span>
                      <span className="text-slate-700"> potential for large-scale calculations!</span>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
