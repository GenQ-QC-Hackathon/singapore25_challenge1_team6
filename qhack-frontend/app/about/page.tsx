'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Target, Lightbulb, Rocket } from 'lucide-react';
import { teamMembers } from '@/lib/data';

export default function AboutPage() {
  return (
    <div className="min-h-screen gradient-bg py-12 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-display font-black mb-4">
            <span className="text-gradient">Meet the Team</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A passionate group of quantum computing enthusiasts and financial engineers
            revolutionizing risk management with quantum algorithms
          </p>
        </motion.div>

        {/* Team Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel p-6 rounded-2xl neon-border-blue hover-lift group"
              whileHover={{ scale: 1.05 }}
            >
              {/* Avatar */}
              <div className="relative mb-4">
                <motion.div
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-neon-blue via-neon-purple to-neon-magenta p-1 mx-auto"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <span className="text-4xl">{member.avatar}</span>
                  </div>
                </motion.div>
              </div>

              {/* Info */}
              <h3 className="text-xl font-display font-bold neon-text-blue text-center mb-1">
                {member.name}
              </h3>
              <p className="text-sm font-mono neon-text-purple text-center mb-3">
                {member.role}
              </p>
              <p className="text-sm text-gray-400 text-center leading-relaxed mb-4">
                {member.description}
              </p>

              {/* Social Links */}
              <div className="flex justify-center gap-4">
                {member.github && (
                  <motion.a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg neon-border-blue bg-black/50 hover:bg-neon-blue/10 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github className="w-5 h-5 text-neon-blue" />
                  </motion.a>
                )}
                {member.linkedin && (
                  <motion.a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg neon-border-purple bg-black/50 hover:bg-neon-purple/10 transition-colors"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Linkedin className="w-5 h-5 text-neon-purple" />
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {/* Our Mission */}
          <div className="glass-panel p-8 rounded-2xl neon-border-magenta holographic">
            <div className="w-16 h-16 rounded-full neon-border-magenta bg-neon-magenta/10 flex items-center justify-center mb-4 mx-auto">
              <Target className="w-8 h-8 neon-text-magenta" />
            </div>
            <h3 className="text-2xl font-display font-bold neon-text-magenta text-center mb-4">
              Our Mission
            </h3>
            <p className="text-gray-400 text-center leading-relaxed">
              Leverage quantum computing to democratize advanced financial risk management,
              making enterprise-grade tools accessible to all financial institutions.
            </p>
          </div>

          {/* Innovation */}
          <div className="glass-panel p-8 rounded-2xl neon-border-blue holographic">
            <div className="w-16 h-16 rounded-full neon-border-blue bg-neon-blue/10 flex items-center justify-center mb-4 mx-auto">
              <Lightbulb className="w-8 h-8 neon-text-blue" />
            </div>
            <h3 className="text-2xl font-display font-bold neon-text-blue text-center mb-4">
              Innovation
            </h3>
            <p className="text-gray-400 text-center leading-relaxed">
              Combining Quantum Amplitude Estimation with classical Monte Carlo to achieve
              quadratic speedups in derivative pricing and risk calculations.
            </p>
          </div>

          {/* Impact */}
          <div className="glass-panel p-8 rounded-2xl neon-border-purple holographic">
            <div className="w-16 h-16 rounded-full neon-border-purple bg-neon-purple/10 flex items-center justify-center mb-4 mx-auto">
              <Rocket className="w-8 h-8 neon-text-purple" />
            </div>
            <h3 className="text-2xl font-display font-bold neon-text-purple text-center mb-4">
              Impact
            </h3>
            <p className="text-gray-400 text-center leading-relaxed">
              Aligned with UN SDG 8, we're enhancing economic stability through better risk
              assessment, enabling sustainable financial growth worldwide.
            </p>
          </div>
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="glass-panel p-8 rounded-2xl neon-border-blue text-center"
        >
          <h2 className="text-3xl font-display font-bold text-gradient mb-6">
            Technology Stack
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Qiskit',
              'Python',
              'Next.js',
              'TypeScript',
              'TailwindCSS',
              'Framer Motion',
              'Recharts',
              'IBM Quantum',
            ].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
                className="px-6 py-3 rounded-full neon-border-purple bg-neon-purple/10 font-mono text-neon-purple hover:bg-neon-purple/20 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Hackathon Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 text-lg mb-2">
            Built for <span className="neon-text-magenta font-bold">GenQ Hackathon 2025</span>
          </p>
          <p className="text-gray-500 font-mono">
            Team QHackers | Quantum Finance Risk Engine
          </p>
        </motion.div>
      </div>
    </div>
  );
}
