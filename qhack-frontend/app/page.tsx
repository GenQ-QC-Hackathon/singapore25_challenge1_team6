'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap, TrendingUp, Shield } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section 
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-20"
        aria-labelledby="hero-heading"
      >
        <div className="container mx-auto text-center max-w-7xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-block mb-6 sm:mb-8"
          >
            <div className="px-4 sm:px-6 py-2 rounded-full border border-violet-200 bg-white/80 backdrop-blur-sm inline-flex items-center gap-2">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-violet-600" />
              <span className="text-xs sm:text-sm font-medium text-slate-700">
                <span className="hidden sm:inline">GenQ Hackathon 2025 | Team QHackers</span>
                <span className="sm:hidden">GenQ 2025 | QHackers</span>
              </span>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 
              id="hero-heading"
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 leading-tight px-4"
            >
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                QHack
              </span>
              <br />
              <span className="text-slate-900 text-3xl sm:text-5xl md:text-6xl lg:text-7xl">Quantum Risk Engine</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-base sm:text-xl md:text-2xl text-slate-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4"
          >
            Revolutionizing{' '}
            <span className="text-violet-600 font-semibold">
              Counterparty Credit Risk
            </span>{' '}
            through{' '}
            <span className="text-blue-600 font-semibold">
              Quantum Monte Carlo
            </span>{' '}
            and Amplitude Estimation
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-6 px-4"
          >
            <Link href="/dashboard" className="w-full sm:w-auto">
              <button 
                className="group w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base sm:text-lg flex items-center gap-3 min-w-[200px] justify-center transition-colors duration-200 touch-manipulation active:scale-95"
                aria-label="Navigate to dashboard"
              >
                <span>Enter Dashboard</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </button>
            </Link>

            <Link href="/about" className="w-full sm:w-auto">
              <button 
                className="group w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg border-2 border-slate-300 hover:border-violet-500 bg-white hover:bg-violet-50 text-slate-700 hover:text-violet-700 font-semibold text-base sm:text-lg flex items-center gap-3 min-w-[200px] justify-center transition-all duration-200 touch-manipulation active:scale-95"
                aria-label="Learn about the team"
              >
                <span>Meet the Team</span>
              </button>
            </Link>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-16 md:mt-20 max-w-5xl mx-auto px-4"
            role="list"
            aria-label="Key features"
          >
            {/* Feature 1 */}
            <article className="bg-white shadow-sm hover:shadow-md rounded-xl p-5 sm:p-6 transition-all duration-200 hover:-translate-y-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" aria-hidden="true" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                Quantum Speedup
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Achieve quadratic advantage with Quantum Amplitude Estimation for faster risk convergence
              </p>
            </article>

            {/* Feature 2 */}
            <article className="bg-white shadow-sm hover:shadow-md rounded-xl p-5 sm:p-6 transition-all duration-200 hover:-translate-y-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-violet-100 flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-violet-600" aria-hidden="true" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                Real-Time Analytics
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Visualize Potential Future Exposure (PFE) and CVA calculations in real-time
              </p>
            </article>

            {/* Feature 3 */}
            <article className="bg-white shadow-sm hover:shadow-md rounded-xl p-5 sm:p-6 transition-all duration-200 hover:-translate-y-1 sm:col-span-2 md:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" aria-hidden="true" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                Risk Mitigation
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Advanced derivative portfolio risk analysis aligned with SDG 8 financial stability
              </p>
            </article>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
