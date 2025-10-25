'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ChevronRight } from 'lucide-react';
import { generateSystemLogs } from '@/lib/data';

export default function SystemLogs() {
  const [logs, setLogs] = useState<string[]>([]);
  const allLogs = generateSystemLogs();

  useEffect(() => {
    // Simulate real-time log streaming
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < allLogs.length) {
        setLogs((prev) => [...prev, allLogs[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-panel p-6 rounded-2xl neon-border-purple scanlines"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg neon-border-purple bg-neon-purple/10 flex items-center justify-center">
          <Terminal className="w-5 h-5 neon-text-purple" />
        </div>
        <div>
          <h3 className="text-xl font-display font-bold neon-text-purple">
            System Console
          </h3>
          <p className="text-xs text-gray-400 font-mono">Real-time Job Status</p>
        </div>
      </div>

      {/* Console Window */}
      <div className="bg-black/80 rounded-lg p-4 h-96 overflow-y-auto font-mono text-sm border border-neon-purple/30">
        <AnimatePresence>
          {logs.map((log, index) => {
            const isSystem = log.includes('[SYSTEM]');
            const isQuantum = log.includes('[QUANTUM]');
            const isClassical = log.includes('[CLASSICAL]');
            const isSuccess = log.includes('[SUCCESS]');
            const isAnalysis = log.includes('[ANALYSIS]');

            let color = 'text-gray-400';
            if (isSystem) color = 'text-neon-blue';
            if (isQuantum) color = 'text-neon-purple';
            if (isClassical) color = 'text-neon-blue';
            if (isSuccess) color = 'text-green-400';
            if (isAnalysis) color = 'text-neon-magenta';

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-2 mb-2"
              >
                <ChevronRight className={`w-4 h-4 mt-0.5 flex-shrink-0 ${color}`} />
                <span className={color}>{log}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Blinking Cursor */}
        {logs.length === allLogs.length && (
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <ChevronRight className="w-4 h-4 text-neon-purple" />
            <motion.span
              className="inline-block w-2 h-4 bg-neon-purple"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>
        )}
      </div>

      {/* Status Bar */}
      <div className="mt-4 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-4">
          <span className="text-gray-400">
            Logs: <span className="neon-text-purple">{logs.length}/{allLogs.length}</span>
          </span>
          <span className="text-gray-400">
            Status: <span className="text-green-400">READY</span>
          </span>
        </div>
        <motion.div
          className="flex items-center gap-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-gray-400">CONNECTED</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
