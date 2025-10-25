'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap, TrendingUp, Shield } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';

// Preload dashboard page for faster navigation
if (typeof window !== 'undefined') {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = '/dashboard';
  document.head.appendChild(link);
}

export default function Home() {
  return (
    <div className="h-[93vh] flex flex-col">
      {/* Hero Section - reduced height and removed top padding */}
      <section 
        className="h-[55vh] flex items-center justify-center px-4 sm:px-6 bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50 animate-gradient pt-16"
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
            className="text-xl text-slate-600 mb-12 mx-auto leading-relaxed"
            style={{marginTop: "50px", marginBottom: "50px",}}
          >
            Accelerate counterparty credit risk calculations with quantum amplitude estimation
          </motion.p>

          {/* Single Primary CTA Button - centered text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center"
          >
            <Link href="/dashboard">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group h-14  rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-semibold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-200"
                style={{padding: "20px"}}
                aria-label="Navigate to dashboard"
              >
                <span>Start Calculating</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Feature Cards Section - centered articles */}
      <section className="py-20 px-4 sm:px-6 bg-white" style={{marginTop: "100px", marginLeft:"450px"}}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-20 max-w-5xl mx-auto justify-items-center"
          role="list"
         
          aria-label="Key features"
        >
          {/* Feature 1: Quantum Speedup */}
          <article className="bg-blue-50 shadow-md hover:shadow-xl rounded-xl p-6 transition-all duration-200 hover:-translate-y-2 w-full text-center" style={{padding: "20px"}}>
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mb-4 mx-auto" style={{marginBottom: "20px", marginLeft: "100px"}}>
              <Zap className="w-6 h-6 text-white" aria-hidden="true"  />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 leading-[1.2]">
              Quantum Speedup
            </h3>
            <p className="text-slate-600 text-sm leading-[1.5]">
              Quadratic advantage with Quantum Amplitude Estimation
            </p>
          </motion.article>

          {/* Feature 2: Real-Time Analytics */}
          <article className="bg-blue-50 shadow-md hover:shadow-xl rounded-xl p-6 transition-all duration-200 hover:-translate-y-2 text-center" style={{padding: "20px"}}>
            <div className="w-12 h-12 rounded-full bg-violet-500 flex items-center justify-center mb-4 mx-auto" style={{marginBottom: "20px", marginLeft: "100px"}}>
              <TrendingUp className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 leading-[1.2]">
              Real-Time Analytics
            </h3>
            <p className="text-slate-600 text-sm leading-[1.5]">
              Visualize PFE and CVA calculations instantly
            </p>
          </motion.article>

          {/* Feature 3: Risk Mitigation */}
          <article className="bg-blue-50 shadow-md hover:shadow-xl rounded-xl p-6 transition-all duration-200 hover:-translate-y-2 text-center" style={{padding: "20px"}}>
            <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center mb-4 mx-auto"  style={{marginBottom: "20px", marginLeft: "100px"}}>
              <Shield className="w-6 h-6 text-white" aria-hidden="true" />
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
      
      {/* Footer */}
   
    </div>
  );
}
