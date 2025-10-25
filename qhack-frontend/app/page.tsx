'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap, TrendingUp, Shield } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - 80vh with animated gradient background */}
      <section 
        className="h-[80vh] flex items-center justify-center px-4 sm:px-6 bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50 animate-gradient"
        aria-labelledby="hero-heading"
      >
        <div className="container mx-auto text-center max-w-4xl">
          {/* Main Title with stagger animation */}
          <motion.h1 
            id="hero-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.2]"
          >
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Quantum Risk Engine
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl text-slate-600 mb-12 max-w-[600px] mx-auto leading-[1.5]"
          >
            Accelerate counterparty credit risk calculations with quantum amplitude estimation
          </motion.p>

          {/* Single Primary CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/dashboard">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group h-14 px-10 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-semibold text-lg flex items-center gap-3 mx-auto shadow-lg hover:shadow-xl transition-all duration-200"
                aria-label="Navigate to dashboard"
              >
                <span>Start Calculating</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          role="list"
          aria-label="Key features"
        >
          {/* Feature 1: Quantum Speedup */}
          <motion.article 
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white shadow-md hover:shadow-xl rounded-xl p-6 transition-shadow duration-200 max-w-[360px] mx-auto w-full cursor-default border border-slate-200"
          >
            <div className="w-12 h-12 rounded-full bg-blue-50 border-2 border-blue-500 flex items-center justify-center mb-4 transition-transform duration-200">
              <Zap className="w-6 h-6 text-blue-600" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 leading-[1.2]">
              Quantum Speedup
            </h3>
            <p className="text-slate-600 text-sm leading-[1.5]">
              Quadratic advantage with Quantum Amplitude Estimation
            </p>
          </motion.article>

          {/* Feature 2: Real-Time Analytics */}
          <motion.article 
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white shadow-md hover:shadow-xl rounded-xl p-6 transition-shadow duration-200 max-w-[360px] mx-auto w-full cursor-default border border-slate-200"
          >
            <div className="w-12 h-12 rounded-full bg-violet-50 border-2 border-violet-500 flex items-center justify-center mb-4 transition-transform duration-200">
              <TrendingUp className="w-6 h-6 text-violet-600" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 leading-[1.2]">
              Real-Time Analytics
            </h3>
            <p className="text-slate-600 text-sm leading-[1.5]">
              Visualize PFE and CVA calculations instantly
            </p>
          </motion.article>

          {/* Feature 3: Risk Mitigation */}
          <motion.article 
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white shadow-md hover:shadow-xl rounded-xl p-6 transition-shadow duration-200 max-w-[360px] mx-auto w-full cursor-default border border-slate-200"
          >
            <div className="w-12 h-12 rounded-full bg-slate-50 border-2 border-slate-400 flex items-center justify-center mb-4 transition-transform duration-200">
              <Shield className="w-6 h-6 text-slate-700" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 leading-[1.2]">
              Risk Mitigation
            </h3>
            <p className="text-slate-600 text-sm leading-[1.5]">
              Advanced portfolio risk analysis for financial stability
            </p>
          </motion.article>
        </motion.div>
      </section>
    </div>
  );
}
