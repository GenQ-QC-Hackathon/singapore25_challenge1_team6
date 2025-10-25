'use client';

import { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { apiClient, ClassicalResult, QuantumResult } from '@/lib/api';
import { ConfigParams } from '@/components/dashboard/ConfigPanel';

// Lazy load heavy components for better initial load performance
const ConfigPanel = lazy(() => import('@/components/dashboard/ConfigPanel'));
const ResultCard = lazy(() => import('@/components/dashboard/ResultCard'));
const ComparisonView = lazy(() => import('@/components/dashboard/ComparisonView'));
const EmptyState = lazy(() => import('@/components/dashboard/EmptyState'));

// Loading fallback component
function ComponentLoader() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function DashboardPage() {
  // Form state
  const [params, setParams] = useState<ConfigParams>({
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
  const [loading, setLoading] = useState(false);

  // Error state
  const [error, setError] = useState<string | null>(null);

  // Mobile sidebar state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const runBothSimulations = async () => {
    setLoading(true);
    setError(null);
    setIsMobileSidebarOpen(false); // Close mobile sidebar when running
    
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
      setLoading(false);
    }
  };

  const hasResults = classicalResult || quantumResult;
  const hasBothResults = classicalResult && quantumResult;

  return (
    <main className="h-[90vh] bg-gradient-to-br from-slate-50 to-blue-50 pt-24 pb-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-12"
          style={{marginTop:"60px"}}
        >
          <h1
            id="dashboard-heading"
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{paddingTop: "30px", paddingBottom: "30px", paddingLeft: "600px"}}
        
          >
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent"
            >
              Quantum Risk Engine
            </span>
          </h1>
          <p className="text-slate-600 text-lg" style={{paddingTop: "30px", paddingBottom: "30px", paddingLeft: "600px"}}>
            Calculate PFE using Classical Monte Carlo vs Quantum Amplitude Estimation
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Input Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-3 flex justify-center"
            style={{marginLeft: "600px", marginTop: "60px"}}
          >
            <section
              className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm w-full max-w-md"
              aria-labelledby="portfolio-params-heading"
              style={{padding: "30px"}}
            >
              <h2
                id="portfolio-params-heading"
                className="text-2xl font-bold text-slate-900 mb-6 text-center"
              >
                Portfolio Parameters
              </h2>

              <div className="space-y-5">
                {/* Asset Weights */}
                <div className="grid grid-cols-2 gap-4">
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
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors touch-manipulation"
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
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors touch-manipulation"
                      aria-label="Portfolio weight for asset 2"
                    />
                  </div>
                </div>

                {/* Strike & Initial Price */}
                <div className="grid grid-cols-2 gap-4">
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
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors touch-manipulation"
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
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors touch-manipulation"
                      aria-label="Initial asset price"
                    />
                  </div>
                </div>

                {/* Volatility & Drift */}
                <div className="grid grid-cols-2 gap-4">
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
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors touch-manipulation"
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
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors touch-manipulation"
                      aria-label="Market drift mu"
                    />
                  </div>
                </div>

                {/* Confidence Level */}
                <div>
                  <label
                    htmlFor="confidence"
                    className="block text-sm font-medium text-slate-700 mb-3"
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
                    className="w-full h-3 accent-blue-500 touch-manipulation"
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
                    className="block text-sm font-medium text-slate-700 mb-3"
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
                    className="w-full h-3 accent-blue-500 touch-manipulation"
                    aria-label={`Monte Carlo samples: ${params.num_samples.toLocaleString()}`}
                    aria-valuemin={1000}
                    aria-valuemax={100000}
                    aria-valuenow={params.num_samples}
                  />
                </div>

        {/* Results Area - Desktop & Tablet */}
        <div className="hidden md:block md:w-2/3 lg:w-3/4 overflow-y-auto">
          <div className="p-8 space-y-6">
            {/* Empty State or Results */}
            {!hasResults ? (
              <Suspense fallback={<ComponentLoader />}>
                <EmptyState />
              </Suspense>
            ) : (
              <>
                {/* Result Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <AnimatePresence>
                    {classicalResult && (
                      <Suspense fallback={<ComponentLoader />}>
                        <ResultCard
                          type="classical"
                          result={classicalResult}
                        />
                      </Suspense>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {quantumResult && (
                      <Suspense fallback={<ComponentLoader />}>
                        <ResultCard
                          type="quantum"
                          result={quantumResult}
                        />
                      </Suspense>
                    )}
                  </AnimatePresence>
                </div>

              {/* Action Buttons */}
              <div className="mt-8 space-y-3" style={{marginTop: "20px"}}>
                <button
                  onClick={runBoth}
                  disabled={loading.both}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg font-semibold text-white text-base flex items-center justify-center gap-2 hover:from-blue-700 hover:to-violet-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm touch-manipulation active:scale-95"
                  aria-label="Run both classical and quantum simulations"
                  aria-busy={loading.both}
                  style={{padding: "10px", marginBottom: "30px"}}
                >
                  {loading.both ? (
                    <><Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> Running Both...</>
                  ) : (
                    <><Zap className="w-5 h-5" aria-hidden="true" /> Run Comparison</>
                  )}
                </AnimatePresence>
              </>
            )}
          </div>
        </div>
      </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={runClassical}
                    disabled={loading.classical}
                    className="py-3.5 bg-white border border-blue-300 rounded-lg font-medium text-blue-600 text-base flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors duration-200 disabled:opacity-50 touch-manipulation active:scale-95"
                    aria-label="Run classical Monte Carlo simulation"
                    aria-busy={loading.classical}
                    style={{padding: "10px"}}
                  >
                    {loading.classical ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : <Activity className="w-4 h-4" aria-hidden="true" />}
                    Classical
                  </button>

        {/* Mobile Results Area */}
        <div className="flex-1 overflow-y-auto p-4">
          {!hasResults ? (
            <Suspense fallback={<ComponentLoader />}>
              <EmptyState />
            </Suspense>
          ) : (
            <div className="space-y-6">
              {/* Result Cards - Stacked */}
              <AnimatePresence>
                {classicalResult && (
                  <Suspense fallback={<ComponentLoader />}>
                    <ResultCard
                      type="classical"
                      result={classicalResult}
                    />
                  </Suspense>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {quantumResult && (
                  <Suspense fallback={<ComponentLoader />}>
                    <ResultCard
                      type="quantum"
                      result={quantumResult}
                    />
                  </Suspense>
                )}
              </AnimatePresence>

              {/* Comparison Panel */}
              <AnimatePresence>
                {hasBothResults && (
                  <Suspense fallback={<ComponentLoader />}>
                    <ComparisonView
                      classicalResult={classicalResult}
                      quantumResult={quantumResult}
                    />
                  </Suspense>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile Sticky Configure Button */}
        {!isMobileSidebarOpen && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="sticky bottom-0 left-0 right-0 p-4 glass border-t-0 shadow-lg z-10"
          >
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="w-full h-14 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg font-semibold text-white text-base shadow-lg hover:shadow-xl active:scale-98 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
            >
              Configure Parameters
            </button>
          </motion.div>
        )}

        {/* Mobile Sidebar Drawer */}
        <AnimatePresence>
          {isMobileSidebarOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 glass-dark z-30"
                onClick={() => setIsMobileSidebarOpen(false)}
              />

              {/* Drawer */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-y-0 left-0 w-full max-w-md bg-white border-r border-slate-200 shadow-2xl z-40 overflow-y-auto"
              >
                <Suspense fallback={<ComponentLoader />}>
                  <ConfigPanel
                    params={params}
                    onParamsChange={setParams}
                    onRunSimulation={runBothSimulations}
                    loading={loading}
                    error={error}
                  />
                </Suspense>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
