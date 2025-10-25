'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-neon-blue/30 glass-panel">
      <div className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-display font-bold neon-text-blue mb-3">
              QHack
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Revolutionizing counterparty credit risk through Quantum Monte Carlo
              and Amplitude Estimation. Built for GenQ Hackathon 2025.
            </p>
            <div className="mt-4">
              <span className="text-xs text-neon-purple/70 font-mono">
                SDG 8: Decent Work & Economic Growth
              </span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-display font-bold neon-text-purple mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://qiskit.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-neon-blue transition-colors text-sm"
                >
                  Qiskit Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://arxiv.org/abs/1805.00109"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-neon-blue transition-colors text-sm"
                >
                  Quantum Amplitude Estimation
                </a>
              </li>
              <li>
                <a
                  href="https://sdgs.un.org/goals/goal8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-neon-blue transition-colors text-sm"
                >
                  UN SDG 8
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Team & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-display font-bold neon-text-magenta mb-3">
              Team QHackers
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              A passionate team of quantum computing enthusiasts and financial engineers.
            </p>
            <div className="flex gap-4">
              <motion.a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg neon-border-blue bg-black/50 hover:bg-neon-blue/10 transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="w-5 h-5 text-neon-blue" />
              </motion.a>
              <motion.a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg neon-border-purple bg-black/50 hover:bg-neon-purple/10 transition-colors"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="w-5 h-5 text-neon-purple" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 pt-6 border-t border-neon-blue/20"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>Built with</span>
              <Heart className="w-4 h-4 text-neon-pink fill-neon-pink animate-pulse" />
              <span>by Team QHackers</span>
            </div>
            <div className="text-gray-400 text-sm font-mono">
              GenQ Hackathon {currentYear}
            </div>
            <div className="text-gray-500 text-xs font-mono">
              Powered by Qiskit × Next.js × TailwindCSS
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-50" />
    </footer>
  );
}
