'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Zap, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Tooltip from '../ui/Tooltip';

export interface ConfigParams {
  w1: number;
  w2: number;
  strike: number;
  s0: number;
  mu: number;
  sigma: number;
  tau: number;
  alpha: number;
  num_samples: number;
  num_qubits: number;
  ae_iterations: number;
}

export interface ConfigPanelProps {
  params: ConfigParams;
  onParamsChange: (params: ConfigParams) => void;
  onRunSimulation: () => void;
  loading: boolean;
  error?: string | null;
}

export default function ConfigPanel({
  params,
  onParamsChange,
  onRunSimulation,
  loading,
  error,
}: ConfigPanelProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const updateParam = (key: keyof ConfigParams, value: number) => {
    onParamsChange({ ...params, [key]: value });
  };

  return (
    <aside
      className="w-full lg:w-1/4 lg:min-w-[320px] lg:max-w-[400px] bg-white border-r border-slate-200 shadow-sm lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto"
      aria-label="Configuration panel"
    >
      <div className="p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Configure Parameters
        </h2>

        {/* Basic Parameters Section */}
        <section className="mb-6" aria-labelledby="basic-params-heading">
          <h3
            id="basic-params-heading"
            className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-4"
          >
            Basic Parameters
          </h3>

          <div className="space-y-6">
            {/* Portfolio Weights */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="weight1"
                  className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2"
                >
                  <span>Weight 1</span>
                  <Tooltip content="Portfolio allocation weight for the first asset" />
                </label>
                <input
                  id="weight1"
                  type="number"
                  step="0.1"
                  value={params.w1}
                  onChange={(e) => updateParam('w1', parseFloat(e.target.value))}
                  className="w-full h-12 px-4 bg-white border border-slate-200 rounded-lg text-slate-900 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-200"
                  aria-label="Portfolio weight for asset 1"
                />
              </div>
              <div>
                <label
                  htmlFor="weight2"
                  className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2"
                >
                  <span>Weight 2</span>
                  <Tooltip content="Portfolio allocation weight for the second asset" />
                </label>
                <input
                  id="weight2"
                  type="number"
                  step="0.1"
                  value={params.w2}
                  onChange={(e) => updateParam('w2', parseFloat(e.target.value))}
                  className="w-full h-12 px-4 bg-white border border-slate-200 rounded-lg text-slate-900 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-200"
                  aria-label="Portfolio weight for asset 2"
                />
              </div>
            </div>

            {/* Strike Price */}
            <div>
              <label
                htmlFor="strike"
                className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2"
              >
                <span>Strike Price</span>
                <Tooltip content="The predetermined price at which the option can be exercised" />
              </label>
              <input
                id="strike"
                type="number"
                value={params.strike}
                onChange={(e) => updateParam('strike', parseFloat(e.target.value))}
                className="w-full h-12 px-4 bg-white border border-slate-200 rounded-lg text-slate-900 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-200"
                aria-label="Option strike price"
              />
            </div>

            {/* Initial Price */}
            <div>
              <label
                htmlFor="initial-price"
                className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2"
              >
                <span>Initial Price</span>
                <Tooltip content="The current market price of the underlying asset (S₀)" />
              </label>
              <input
                id="initial-price"
                type="number"
                value={params.s0}
                onChange={(e) => updateParam('s0', parseFloat(e.target.value))}
                className="w-full h-12 px-4 bg-white border border-slate-200 rounded-lg text-slate-900 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-200"
                aria-label="Initial asset price"
              />
            </div>

            {/* Volatility */}
            <div>
              <label
                htmlFor="volatility"
                className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2"
              >
                <span>Volatility (σ)</span>
                <Tooltip content="Standard deviation of asset returns, measuring price fluctuation intensity" />
              </label>
              <input
                id="volatility"
                type="number"
                step="0.01"
                value={params.sigma}
                onChange={(e) => updateParam('sigma', parseFloat(e.target.value))}
                className="w-full h-12 px-4 bg-white border border-slate-200 rounded-lg text-slate-900 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-200"
                aria-label="Market volatility sigma"
              />
            </div>

            {/* Confidence Level */}
            <div>
              <label
                htmlFor="confidence"
                className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2"
              >
                <span>Confidence Level (α): {(params.alpha * 100).toFixed(0)}%</span>
                <Tooltip content="Statistical confidence level for risk calculations (e.g., 95% means 95% confidence)" />
              </label>
              <input
                id="confidence"
                type="range"
                min="0.90"
                max="0.99"
                step="0.01"
                value={params.alpha}
                onChange={(e) => updateParam('alpha', parseFloat(e.target.value))}
                className="w-full slider-blue"
                aria-label={`Confidence level: ${(params.alpha * 100).toFixed(0)} percent`}
                aria-valuemin={90}
                aria-valuemax={99}
                aria-valuenow={params.alpha * 100}
              />
            </div>
          </div>
        </section>

        {/* Advanced Settings Section (Collapsible) */}
        <section className="mb-8" aria-labelledby="advanced-settings-heading">
          <button
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="w-full flex items-center justify-between text-sm font-semibold text-slate-700 uppercase tracking-wide mb-4 hover:text-slate-900 transition-colors"
            aria-expanded={isAdvancedOpen}
            aria-controls="advanced-settings-content"
          >
            <span id="advanced-settings-heading">Advanced Settings</span>
            {isAdvancedOpen ? (
              <ChevronUp className="w-4 h-4" aria-hidden="true" />
            ) : (
              <ChevronDown className="w-4 h-4" aria-hidden="true" />
            )}
          </button>

          <AnimatePresence initial={false}>
            {isAdvancedOpen && (
              <motion.div
                id="advanced-settings-content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <div className="space-y-6">
                  {/* Drift */}
                  <div>
                    <label
                      htmlFor="drift"
                      className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2"
                    >
                      <span>Drift (μ)</span>
                      <Tooltip content="Expected return rate of the asset, representing the trend direction" />
                    </label>
                    <input
                      id="drift"
                      type="number"
                      step="0.01"
                      value={params.mu}
                      onChange={(e) => updateParam('mu', parseFloat(e.target.value))}
                      className="w-full h-12 px-4 bg-white border border-slate-200 rounded-lg text-slate-900 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-200"
                      aria-label="Market drift mu"
                    />
                  </div>

                  {/* Time to Maturity */}
                  <div>
                    <label
                      htmlFor="tau"
                      className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2"
                    >
                      <span>Time to Maturity (τ)</span>
                      <Tooltip content="Time remaining until option expiration, measured in years" />
                    </label>
                    <input
                      id="tau"
                      type="number"
                      step="0.1"
                      value={params.tau}
                      onChange={(e) => updateParam('tau', parseFloat(e.target.value))}
                      className="w-full h-12 px-4 bg-white border border-slate-200 rounded-lg text-slate-900 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-200"
                      aria-label="Time to maturity in years"
                    />
                  </div>

                  {/* Monte Carlo Samples */}
                  <div>
                    <label
                      htmlFor="mc-samples"
                      className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2"
                    >
                      <span>MC Samples: {params.num_samples.toLocaleString()}</span>
                      <Tooltip content="Number of random simulations for classical Monte Carlo method. Higher = more accurate but slower" />
                    </label>
                    <input
                      id="mc-samples"
                      type="range"
                      min="1000"
                      max="100000"
                      step="1000"
                      value={params.num_samples}
                      onChange={(e) => updateParam('num_samples', parseInt(e.target.value))}
                      className="w-full slider-blue"
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
                      className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2"
                    >
                      <span>Qubits: {params.num_qubits} (bins: {Math.pow(2, params.num_qubits)})</span>
                      <Tooltip content="Number of qubits for quantum circuit. More qubits = finer discretization (2^n bins) but exponentially more complex" />
                    </label>
                    <input
                      id="qubits"
                      type="range"
                      min="3"
                      max="8"
                      step="1"
                      value={params.num_qubits}
                      onChange={(e) => updateParam('num_qubits', parseInt(e.target.value))}
                      className="w-full slider-violet"
                      aria-label={`Number of qubits: ${params.num_qubits}, bins: ${Math.pow(2, params.num_qubits)}`}
                      aria-valuemin={3}
                      aria-valuemax={8}
                      aria-valuenow={params.num_qubits}
                    />
                  </div>

                  {/* AE Iterations */}
                  <div>
                    <label
                      htmlFor="ae-iterations"
                      className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2"
                    >
                      <span>AE Iterations: {params.ae_iterations}</span>
                      <Tooltip content="Iterative Quantum Amplitude Estimation rounds. More iterations = higher precision but longer runtime" />
                    </label>
                    <input
                      id="ae-iterations"
                      type="range"
                      min="3"
                      max="10"
                      step="1"
                      value={params.ae_iterations}
                      onChange={(e) => updateParam('ae_iterations', parseInt(e.target.value))}
                      className="w-full slider-violet"
                      aria-label={`Amplitude estimation iterations: ${params.ae_iterations}`}
                      aria-valuemin={3}
                      aria-valuemax={10}
                      aria-valuenow={params.ae_iterations}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Primary Action Button */}
        <motion.button
          onClick={onRunSimulation}
          disabled={loading}
          className="w-full h-14 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg font-semibold text-white text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200 ease-out disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          aria-label="Run both classical and quantum simulations"
          aria-busy={loading}
          whileHover={!loading ? { scale: 1.02 } : undefined}
          whileTap={!loading ? { scale: 0.98 } : undefined}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
              Running Simulation...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" aria-hidden="true" />
              Run Comparison
            </>
          )}
        </motion.button>

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
      </div>
    </aside>
  );
}
