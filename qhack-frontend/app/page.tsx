'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap, TrendingUp, Shield } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section 
        className="min-h-screen flex items-center justify-center px-6"
        aria-labelledby="hero-heading"
      >
        <div className="container mx-auto text-center max-w-7xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-block mb-8"
          >
            <div className="px-6 py-2 rounded-full border border-violet-200 bg-white/80 backdrop-blur-sm inline-flex items-center gap-2">
              <Zap className="w-4 h-4 text-violet-600" />
              <span className="text-sm font-medium text-slate-700">
                GenQ Hackathon 2025 | Team QHackers
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
              className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                QHack
              </span>
              <br />
              <span className="text-slate-900">Quantum Risk Engine</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed"
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
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="/dashboard">
              <button 
                className="group px-8 py-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg flex items-center gap-3 min-w-[200px] justify-center transition-colors duration-200"
                aria-label="Navigate to dashboard"
              >
                <span>Enter Dashboard</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </button>
            </Link>

            <Link href="/about">
              <button 
                className="group px-8 py-4 rounded-lg border-2 border-slate-300 hover:border-violet-500 bg-white hover:bg-violet-50 text-slate-700 hover:text-violet-700 font-semibold text-lg flex items-center gap-3 min-w-[200px] justify-center transition-all duration-200"
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
            className="grid md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto"
            role="list"
            aria-label="Key features"
          >
            {/* Feature 1 */}
            <article className="bg-white shadow-sm hover:shadow-md rounded-xl p-6 transition-shadow duration-200 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4 mx-auto">
                <Zap className="w-6 h-6 text-blue-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Quantum Speedup
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Achieve quadratic advantage with Quantum Amplitude Estimation for faster risk convergence
              </p>
            </article>

            {/* Feature 2 */}
            <article className="bg-white shadow-sm hover:shadow-md rounded-xl p-6 transition-shadow duration-200 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="w-6 h-6 text-violet-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Real-Time Analytics
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Visualize Potential Future Exposure (PFE) and CVA calculations in real-time
              </p>
            </article>

            {/* Feature 3 */}
            <article className="bg-white shadow-sm hover:shadow-md rounded-xl p-6 transition-shadow duration-200 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-6 h-6 text-emerald-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
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
