'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap, TrendingUp, Shield } from 'lucide-react';
import Link from 'next/link';
import ParticleBackground from '@/components/particles/ParticleBackground';

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden gradient-bg">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="container mx-auto text-center">
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-8"
          >
            <div className="px-6 py-2 rounded-full neon-border-purple bg-black/50 backdrop-blur-sm inline-flex items-center gap-2">
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Zap className="w-4 h-4 text-neon-purple" />
              </motion.div>
              <span className="text-sm font-mono text-neon-purple">
                GenQ Hackathon 2025 | Team QHackers
              </span>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl font-display font-black mb-6 leading-tight">
              <span className="inline-block">
                <motion.span
                  className="text-gradient"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  QHack
                </motion.span>
              </span>
              <br />
              <span className="neon-text-blue">Quantum Risk Engine</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Revolutionizing{' '}
            <span className="neon-text-purple font-semibold">
              Counterparty Credit Risk
            </span>{' '}
            through{' '}
            <span className="neon-text-magenta font-semibold">
              Quantum Monte Carlo
            </span>{' '}
            and Amplitude Estimation
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="/dashboard">
              <motion.button
                className="cyber-button group px-8 py-4 rounded-full neon-border-blue bg-neon-blue/10 font-semibold text-lg flex items-center gap-3 min-w-[200px] justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 neon-text-blue">Enter Dashboard</span>
                <ArrowRight className="w-5 h-5 neon-text-blue group-hover:translate-x-1 transition-transform relative z-10" />
              </motion.button>
            </Link>

            <Link href="/about">
              <motion.button
                className="cyber-button group px-8 py-4 rounded-full border border-neon-purple/50 bg-black/50 font-semibold text-lg flex items-center gap-3 min-w-[200px] justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 text-gray-300 group-hover:text-neon-purple transition-colors">
                  Meet the Team
                </span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto"
          >
            {/* Feature 1 */}
            <motion.div
              className="glass-panel p-6 rounded-2xl hover-lift"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 rounded-full neon-border-blue bg-neon-blue/10 flex items-center justify-center mb-4 mx-auto">
                <Zap className="w-6 h-6 neon-text-blue" />
              </div>
              <h3 className="text-xl font-display font-bold neon-text-blue mb-2">
                Quantum Speedup
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Achieve quadratic advantage with Quantum Amplitude Estimation for faster risk convergence
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              className="glass-panel p-6 rounded-2xl hover-lift"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 rounded-full neon-border-purple bg-neon-purple/10 flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="w-6 h-6 neon-text-purple" />
              </div>
              <h3 className="text-xl font-display font-bold neon-text-purple mb-2">
                Real-Time Analytics
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Visualize Potential Future Exposure (PFE) and CVA calculations in real-time
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              className="glass-panel p-6 rounded-2xl hover-lift"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 rounded-full neon-border-magenta bg-neon-magenta/10 flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-6 h-6 neon-text-magenta" />
              </div>
              <h3 className="text-xl font-display font-bold neon-text-magenta mb-2">
                Risk Mitigation
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Advanced derivative portfolio risk analysis aligned with SDG 8 financial stability
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-neon-blue/20 blur-3xl"
        animate={{
          y: [0, -30, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full bg-neon-purple/20 blur-3xl"
        animate={{
          y: [0, 30, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
