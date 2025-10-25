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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 
            id="dashboard-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-2"
          >
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Quantum Risk Engine
            </span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg px-4">
            Calculate PFE using Classical Monte Carlo vs Quantum Amplitude Estimation
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left: Input Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-1"
          >
            <section 
              className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 shadow-sm"
              aria-labelledby="portfolio-params-heading"
            >
              <h2 
                id="portfolio-params-heading"
                className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6"
              >
                Portfolio Parameters
              </h2>

              <div className="space-y-3 sm:space-y-4">
                {/* Asset Weights */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label 
                      htmlFor="weight1"
                      className="block text-sm font-medium text-slate-700 mb-1.5 sm:mb-2"
                    >
                      Weight 1
                    </label>
                    <input
                      id="weight1"
                      type="number"
                      step="0.1"
                      value={params.w1}
                      onChange={(e) => setParams({ ...params, w1: parseFloat(e.target.value) })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white border border-slate-300 rounded-lg text-slate-900 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors touch-manipulation"
                      aria-label="Portfolio weight for asset 1"
                    />
                  </div>
                  <div>
                    <label 
                      htmlFor="weight2"
                      className="block text-sm font-medium text-slate-700 mb-1.5 sm:mb-2"
                    >
                      Weight 2
                    </label>
                    <input
                      id="weight2"
                      type="number"
                      step="0.1"
                      value={params.w2}
                      onChange={(e) => setParams({ ...params, w2: parseFloat(e.target.value) })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white border border-slate-300 rounded-lg text-slate-900 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors touch-manipulation"
                      aria-label="Portfolio weight for asset 2"
                    />
                  </div>
                </div>

                {/* Strike & Initial Price */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label 
                      htmlFor="strike"
                      className="block text-sm font-medium text-slate-700 mb-1.5 sm:mb-2"
                    >
                      Strike Price
                    </label>
                    <input
                      id="strike"
                      type="number"
                      value={params.strike}
                      onChange={(e) => setParams({ ...params, strike: parseFloat(e.target.value) })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white border border-slate-300 rounded-lg text-slate-900 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors touch-manipulation"
                      aria-label="Option strike price"
                    />
                  </div>
                  <div>
                    <label 
                      htmlFor="initial-price"
                      className="block text-sm font-medium text-slate-700 mb-1.5 sm:mb-2"
                    >
                      Initial Price
                    </label>
                    <input
                      id="initial-price"
                      type="number"
                      value={params.s0}
                      onChange={(e) => setParams({ ...params, s0: parseFloat(e.target.value) })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white border border-slate-300 rounded-lg text-slate-900 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors touch-manipulation"
                      aria-label="Initial asset price"
                    />
                  </div>
                </div>

                {/* Volatility & Drift */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label 
                      htmlFor="volatility"
                      className="block text-sm font-medium text-slate-700 mb-1.5 sm:mb-2"
                    >
                      Volatility (σ)
                    </label>
                    <input
                      id="volatility"
                      type="number"
                      step="0.01"
                      value={params.sigma}
                      onChange={(e) => setParams({ ...params, sigma: parseFloat(e.target.value) })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white border border-slate-300 rounded-lg text-slate-900 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors touch-manipulation"
                      aria-label="Market volatility sigma"
                    />
                  </div>
                  <div>
                    <label 
                      htmlFor="drift"
                      className="block text-sm font-medium text-slate-700 mb-1.5 sm:mb-2"
                    >
                      Drift (μ)
                    </label>
                    <input
                      id="drift"
                      type="number"
                      step="0.01"
                      value={params.mu}
                      onChange={(e) => setParams({ ...params, mu: parseFloat(e.target.value) })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white border border-slate-300 rounded-lg text-slate-900 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors touch-manipulation"
                      aria-label="Market drift mu"
                    />
                  </div>
                </div>

                {/* Confidence Level */}
                <div>
                  <label 
                    htmlFor="confidence"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Confidence Level (α): {(params.alpha * 100).toFixed(0)}%
                  </label>
                  <input
                    id="confidence"
                    type="range"
                    min="0.90"
                    max="0.99"
                    step="0.01"
                    value={params.alpha}
                    onChange={(e) => setParams({ ...params, alpha: parseFloat(e.target.value) })}
                    className="w-full accent-blue-500"
                    aria-label={`Confidence level: ${(params.alpha * 100).toFixed(0)} percent`}
                    aria-valuemin={90}
                    aria-valuemax={99}
                    aria-valuenow={params.alpha * 100}
                  />
                </div>

                {/* Classical Samples */}
                <div>
                  <label 
                    htmlFor="mc-samples"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    MC Samples: {params.num_samples.toLocaleString()}
                  </label>
                  <input
                    id="mc-samples"
                    type="range"
                    min="1000"
                    max="100000"
                    step="1000"
                    value={params.num_samples}
                    onChange={(e) => setParams({ ...params, num_samples: parseInt(e.target.value) })}
                    className="w-full accent-blue-500"
                    aria-label={`Monte Carlo samples: ${params.num_samples.toLocaleString()}`}
                    aria-valuemin={1000}
                    aria-valuemax={100000}
                    aria-valuenow={params.num_samples}
                  />
                </div>

                {/* Quantum Qubits */}
                <div>
                  <label 
                    htmlFor="qubits"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Qubits: {params.num_qubits} (bins: {Math.pow(2, params.num_qubits)})
                  </label>
                  <input
                    id="qubits"
                    type="range"
                    min="3"
                    max="8"
                    step="1"
                    value={params.num_qubits}
                    onChange={(e) => setParams({ ...params, num_qubits: parseInt(e.target.value) })}
                    className="w-full accent-violet-500"
                    aria-label={`Number of qubits: ${params.num_qubits}, bins: ${Math.pow(2, params.num_qubits)}`}
                    aria-valuemin={3}
                    aria-valuemax={8}
                    aria-valuenow={params.num_qubits}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 space-y-3">
                <button
                  onClick={runBoth}
                  disabled={loading.both}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg font-semibold text-white flex items-center justify-center gap-2 hover:from-blue-700 hover:to-violet-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  aria-label="Run both classical and quantum simulations"
                  aria-busy={loading.both}
                >
                  {loading.both ? (
                    <><Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> Running Both...</>
                  ) : (
                    <><Zap className="w-5 h-5" aria-hidden="true" /> Run Comparison</>
                  )}
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={runClassical}
                    disabled={loading.classical}
                    className="py-3 bg-white border border-blue-300 rounded-lg font-medium text-blue-600 flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors duration-200 disabled:opacity-50"
                    aria-label="Run classical Monte Carlo simulation"
                    aria-busy={loading.classical}
                  >
                    {loading.classical ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : <Activity className="w-4 h-4" aria-hidden="true" />}
                    Classical
                  </button>

                  <button
                    onClick={runQuantum}
                    disabled={loading.quantum}
                    className="py-3 bg-white border border-violet-300 rounded-lg font-medium text-violet-600 flex items-center justify-center gap-2 hover:bg-violet-50 transition-colors duration-200 disabled:opacity-50"
                    aria-label="Run quantum amplitude estimation simulation"
                    aria-busy={loading.quantum}
                  >
                    {loading.quantum ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : <Zap className="w-4 h-4" aria-hidden="true" />}
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
                  role="alert"
                  aria-live="assertive"
                >
                  <p className="text-red-600 text-sm">{error}</p>
                </motion.div>
              )}
            </section>
          </motion.div>

          {/* Right: Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Classical Result */}
            <AnimatePresence>
              {classicalResult && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border-l-4 border-blue-500 rounded-xl p-6 shadow-sm"
                  aria-labelledby="classical-results-heading"
                  aria-live="polite"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 
                      id="classical-results-heading"
                      className="text-2xl font-bold text-slate-900 flex items-center gap-2"
                    >
                      <Activity className="w-6 h-6 text-blue-500" aria-hidden="true" />
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
                </motion.section>
              )}
            </AnimatePresence>

            {/* Quantum Result */}
            <AnimatePresence>
              {quantumResult && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border-l-4 border-violet-500 rounded-xl p-6 shadow-sm"
                  aria-labelledby="quantum-results-heading"
                  aria-live="polite"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 
                      id="quantum-results-heading"
                      className="text-2xl font-bold text-slate-900 flex items-center gap-2"
                    >
                      <Zap className="w-6 h-6 text-violet-500" aria-hidden="true" />
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
                </motion.section>
              )}
            </AnimatePresence>

            {/* Comparison */}
            <AnimatePresence>
              {classicalResult && quantumResult && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-br from-blue-50 to-violet-50 border-2 border-transparent rounded-xl p-6 shadow-sm relative overflow-hidden"
                  style={{
                    backgroundImage: 'linear-gradient(white, white), linear-gradient(to right, rgb(59, 130, 246), rgb(139, 92, 246))',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box',
                  }}
                  aria-labelledby="comparison-heading"
                  aria-live="polite"
                >
                  <h3 
                    id="comparison-heading"
                    className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2"
                  >
                    <BarChart3 className="w-6 h-6 text-blue-600" aria-hidden="true" />
                    Performance Comparison
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg p-5 shadow-sm">
                      <p className="text-slate-600 text-sm font-medium mb-2">PFE Difference</p>
                      <p className="text-3xl font-bold text-slate-900 mb-1">
                        ${Math.abs(classicalResult.pfe - quantumResult.pfe).toFixed(2)}
                      </p>
                      <p className="text-sm text-slate-500">
                        {((Math.abs(classicalResult.pfe - quantumResult.pfe) / classicalResult.pfe) * 100).toFixed(2)}% variance
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-5 shadow-sm">
                      <p className="text-slate-600 text-sm font-medium mb-2">Runtime Comparison</p>
                      <p className="text-3xl font-bold text-slate-900 mb-1">
                        {speedup}x
                      </p>
                      <p className="text-sm text-slate-500">
                        {classicalResult.runtime_ms > quantumResult.runtime_ms ? 'Quantum faster' : 'Classical faster'}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-slate-600 text-sm font-medium mb-1">Classical Complexity</p>
                      <p className="text-lg font-mono text-blue-600">O(1/√N)</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-slate-600 text-sm font-medium mb-1">Quantum Complexity</p>
                      <p className="text-lg font-mono text-violet-600">O(1/N)</p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
                    <p className="text-center text-slate-700">
                      Quantum amplitude estimation provides{' '}
                      <span className="font-semibold text-blue-600">quadratic speedup</span>
                      {' '}for large-scale risk calculations
                    </p>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
