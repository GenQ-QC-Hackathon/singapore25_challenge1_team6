'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Target, Lightbulb, Rocket } from 'lucide-react';
import { teamMembers } from '@/lib/data';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-16"
        >
          <h1 
            id="about-heading"
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Meet the Team
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A passionate group of quantum computing enthusiasts and financial engineers
            revolutionizing risk management with quantum algorithms
          </p>
        </motion.div>

        {/* Team Cards */}
        <section aria-labelledby="team-section-heading">
          <h2 id="team-section-heading" className="sr-only">Team Members</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {teamMembers.map((member, index) => (
              <motion.article
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
              >
              {/* Avatar */}
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 p-1 mx-auto">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <span className="text-4xl">{member.avatar}</span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <h3 className="text-xl font-bold text-slate-900 text-center mb-1">
                {member.name}
              </h3>
              <p className="text-sm font-medium text-violet-600 text-center mb-3">
                {member.role}
              </p>
              <p className="text-sm text-slate-600 text-center leading-relaxed mb-4">
                {member.description}
              </p>

              {/* Social Links */}
              <div className="flex justify-center gap-4">
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    aria-label={`${member.name}'s GitHub profile`}
                  >
                    <Github className="w-5 h-5 text-slate-700" aria-hidden="true" />
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-violet-50 hover:border-violet-300 transition-colors"
                    aria-label={`${member.name}'s LinkedIn profile`}
                  >
                    <Linkedin className="w-5 h-5 text-slate-700" aria-hidden="true" />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
        </section>

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-8 mb-20"
          aria-labelledby="mission-section-heading"
        >
          <h2 id="mission-section-heading" className="sr-only">Our Mission and Values</h2>
          {/* Our Mission */}
          <article className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm">
            <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center mb-4 mx-auto">
              <Target className="w-8 h-8 text-violet-600" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 text-center mb-4">
              Our Mission
            </h3>
            <p className="text-slate-600 text-center leading-relaxed">
              Leverage quantum computing to democratize advanced financial risk management,
              making enterprise-grade tools accessible to all financial institutions.
            </p>
          </div>

          {/* Innovation */}
          <article className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4 mx-auto">
              <Lightbulb className="w-8 h-8 text-blue-600" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 text-center mb-4">
              Innovation
            </h3>
            <p className="text-slate-600 text-center leading-relaxed">
              Combining Quantum Amplitude Estimation with classical Monte Carlo to achieve
              quadratic speedups in derivative pricing and risk calculations.
            </p>
          </div>

          {/* Impact */}
          <article className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4 mx-auto">
              <Rocket className="w-8 h-8 text-emerald-600" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 text-center mb-4">
              Impact
            </h3>
            <p className="text-slate-600 text-center leading-relaxed">
              Aligned with UN SDG 8, we're enhancing economic stability through better risk
              assessment, enabling sustainable financial growth worldwide.
            </p>
          </article>
        </motion.section>

        {/* Technology Stack */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm text-center"
          aria-labelledby="tech-stack-heading"
        >
          <h2 
            id="tech-stack-heading"
            className="text-3xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Technology Stack
            </span>
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
                transition={{ duration: 0.2, delay: 0.5 + index * 0.03 }}
                className="px-6 py-3 rounded-full border border-violet-200 bg-violet-50 font-mono text-violet-700 hover:bg-violet-100 hover:border-violet-300 transition-colors"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.section>

        {/* Hackathon Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-600 text-lg mb-2">
            Built for <span className="text-violet-600 font-bold">GenQ Hackathon 2025</span>
          </p>
          <p className="text-slate-500 font-mono text-sm">
            Team QHackers | Quantum Finance Risk Engine
          </p>
        </motion.div>
      </div>
    </main>
  );
}
