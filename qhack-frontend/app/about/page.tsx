'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';
import { teamMembers } from '@/lib/data';

export default function AboutPage() {
  return (
    <main className="h-screen bg-slate-50 py-8 px-6 overflow-hidden flex items-center">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-8"
        >
          <h1 
            id="about-heading"
            className="text-4xl md:text-5xl font-bold mb-3"
          >
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Meet the Team
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Quantum computing enthusiasts revolutionizing financial risk management
          </p>
        </motion.div>

        {/* Team Cards - 3 Column Grid */}
        <section aria-labelledby="team-section-heading" className="mb-8">
          <h2 id="team-section-heading" className="sr-only">Team Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.article
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 ease-out hover:-translate-y-1 w-full max-w-[280px] mx-auto"
              >
                {/* Avatar - 80px */}
                <div className="relative mb-3">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 p-1 mx-auto">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <span className="text-3xl">{member.avatar}</span>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <h3 className="text-lg font-bold text-slate-900 text-center mb-1">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-violet-600 text-center mb-3">
                  {member.role}
                </p>

                {/* Social Links - Only 2 icons */}
                <div className="flex justify-center gap-3">
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                      aria-label={`${member.name}'s GitHub profile`}
                    >
                      <Github className="w-4 h-4 text-slate-700" aria-hidden="true" />
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
                      <Linkedin className="w-4 h-4 text-slate-700" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Combined Mission Section - Single Centered Card */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="max-w-[800px] mx-auto"
          aria-labelledby="mission-section-heading"
        >
          <article className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 ease-out text-center">
            <h2 
              id="mission-section-heading"
              className="text-2xl font-bold text-slate-900 mb-3"
            >
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                Our Mission
              </span>
            </h2>
            <p className="text-slate-600 leading-relaxed mb-2">
              We leverage quantum computing to democratize advanced financial risk management, 
              combining Quantum Amplitude Estimation with classical Monte Carlo to achieve 
              quadratic speedups in derivative pricing and risk calculations.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Aligned with UN SDG 8, we're enhancing economic stability through better risk 
              assessment, enabling sustainable financial growth worldwide.
            </p>
          </article>
        </motion.section>
      </div>
    </main>
  );
}
