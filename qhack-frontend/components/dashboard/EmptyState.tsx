'use client';

import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { fadeIn, durations, easings } from '@/lib/animations';
import { colors } from '@/lib/design-tokens';

/**
 * EmptyState Component
 * 
 * Displays a beautiful empty state in the dashboard when no results are available.
 * Features:
 * - Large animated icon (96px)
 * - Clear heading and subtext
 * - Subtle background with dashed border
 * - Smooth fade-in animation
 */

export default function EmptyState() {
  return (
    <motion.div
      className="flex items-center justify-center min-h-[500px] p-8"
      initial="initial"
      animate="animate"
      variants={fadeIn}
    >
      <div className="text-center max-w-md">
        {/* Animated Icon */}
        <motion.div
          className="inline-flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-white border-2 border-dashed border-slate-300 shadow-sm"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            transition: {
              duration: durations.slow / 1000,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.1,
            }
          }}
        >
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: [0.34, 1.56, 0.64, 1],
              }
            }}
          >
            <Zap 
              className="w-12 h-12 text-blue-600" 
              strokeWidth={2}
            />
          </motion.div>
        </motion.div>

        {/* Heading */}
        <motion.h3
          className="text-2xl font-semibold text-slate-900 mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: durations.slow / 1000,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.2,
            }
          }}
        >
          Ready to Calculate Risk
        </motion.h3>

        {/* Subtext */}
        <motion.p
          className="text-base text-slate-600 leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: durations.slow / 1000,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.3,
            }
          }}
        >
          Configure parameters and run simulation to see quantum vs classical results
        </motion.p>

        {/* Decorative Elements */}
        <motion.div
          className="mt-8 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            transition: {
              duration: durations.slow / 1000,
              delay: 0.4,
            }
          }}
        >
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 rounded-full bg-slate-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
        </motion.div>
      </div>
    </motion.div>
  );
}
