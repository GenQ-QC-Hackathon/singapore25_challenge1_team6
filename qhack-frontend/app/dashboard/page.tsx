'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { apiClient, ClassicalResult, QuantumResult } from '@/lib/api';
import ConfigPanel, { ConfigParams } from '@/components/dashboard/ConfigPanel';
import ResultCard from '@/components/dashboard/ResultCard';
import ComparisonView from '@/components/dashboard/ComparisonView';
import EmptyState from '@/components/dashboard/EmptyState';

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
    <main className="min-h-screen bg-slate-50">
      {/* Desktop & Tablet: Flex Layout */}
      <div className="flex h-screen overflow-hidden">
        {/* Config Sidebar - Desktop & Tablet */}
        <div className="hidden md:block md:w-1/3 lg:w-1/4 md:min-w-[320px] lg:max-w-[400px]">
          <ConfigPanel
            params={params}
            onParamsChange={setParams}
            onRunSimulation={runBothSimulations}
            loading={loading}
            error={error}
          />
        </div>

        {/* Results Area - Desktop & Tablet */}
        <div className="hidden md:block md:w-2/3 lg:w-3/4 overflow-y-auto">
          <div className="p-8 space-y-6">
            {/* Empty State or Results */}
            {!hasResults ? (
              <EmptyState />
            ) : (
              <>
                {/* Result Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <AnimatePresence>
                    {classicalResult && (
                      <ResultCard
                        type="classical"
                        result={classicalResult}
                      />
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {quantumResult && (
                      <ResultCard
                        type="quantum"
                        result={quantumResult}
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Comparison Panel */}
                <AnimatePresence>
                  {hasBothResults && (
                    <ComparisonView
                      classicalResult={classicalResult}
                      quantumResult={quantumResult}
                    />
                  )}
                </AnimatePresence>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden min-h-screen flex flex-col">
        {/* Mobile Header */}
        <div className="bg-white border-b border-slate-200 px-4 py-4 flex items-center justify-between sticky top-0 z-20">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Quantum Risk Engine
          </h1>
          <button
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="p-2 rounded-lg hover:bg-slate-100 active:bg-slate-200 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
            aria-label={isMobileSidebarOpen ? 'Close configuration' : 'Open configuration'}
          >
            {isMobileSidebarOpen ? (
              <X className="w-6 h-6 text-slate-700 transition-transform duration-200" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700 transition-transform duration-200" />
            )}
          </button>
        </div>

        {/* Mobile Results Area */}
        <div className="flex-1 overflow-y-auto p-4">
          {!hasResults ? (
            <EmptyState />
          ) : (
            <div className="space-y-6">
              {/* Result Cards - Stacked */}
              <AnimatePresence>
                {classicalResult && (
                  <ResultCard
                    type="classical"
                    result={classicalResult}
                  />
                )}
              </AnimatePresence>

              <AnimatePresence>
                {quantumResult && (
                  <ResultCard
                    type="quantum"
                    result={quantumResult}
                  />
                )}
              </AnimatePresence>

              {/* Comparison Panel */}
              <AnimatePresence>
                {hasBothResults && (
                  <ComparisonView
                    classicalResult={classicalResult}
                    quantumResult={quantumResult}
                  />
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
            className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 shadow-lg z-10"
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
                className="fixed inset-0 bg-black/50 z-30"
                onClick={() => setIsMobileSidebarOpen(false)}
              />

              {/* Drawer */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-y-0 left-0 w-full max-w-md bg-white z-40 overflow-y-auto"
              >
                <ConfigPanel
                  params={params}
                  onParamsChange={setParams}
                  onRunSimulation={runBothSimulations}
                  loading={loading}
                  error={error}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
