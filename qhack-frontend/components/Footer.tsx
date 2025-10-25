'use client';

import { Github, Linkedin, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="mt-20 border-t border-slate-200 bg-white"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">
              QHack
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Revolutionizing counterparty credit risk through Quantum Monte Carlo
              and Amplitude Estimation. Built for GenQ Hackathon 2025.
            </p>
            <div className="mt-4">
              <span className="text-xs text-violet-600 font-medium">
                SDG 8: Decent Work & Economic Growth
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick links">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://qiskit.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                >
                  Qiskit Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://arxiv.org/abs/1805.00109"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                >
                  Quantum Amplitude Estimation
                </a>
              </li>
              <li>
                <a
                  href="https://sdgs.un.org/goals/goal8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                >
                  UN SDG 8
                </a>
              </li>
            </ul>
          </nav>

          {/* Team & Social */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">
              Team QHackers
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              A passionate team of quantum computing enthusiasts and financial engineers.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 hover:border-blue-300 transition-colors duration-200"
                aria-label="Visit our GitHub repository"
              >
                <Github className="w-5 h-5 text-slate-700" aria-hidden="true" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 hover:border-violet-300 transition-colors duration-200"
                aria-label="Connect with us on LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-slate-700" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-600 text-sm">
              <span>Built with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>by Team QHackers</span>
            </div>
            <div className="text-slate-600 text-sm font-mono">
              GenQ Hackathon {currentYear}
            </div>
            <div className="text-slate-500 text-xs font-mono">
              Powered by Qiskit × Next.js × TailwindCSS
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
