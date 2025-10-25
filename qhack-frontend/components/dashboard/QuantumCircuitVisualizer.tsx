'use client';

import { motion } from 'framer-motion';
import { Cpu, Zap } from 'lucide-react';

interface QuantumGate {
  name: string;
  qubit: number;
  color: string;
}

const sampleCircuit: QuantumGate[] = [
  { name: 'H', qubit: 0, color: '#00f0ff' },
  { name: 'X', qubit: 1, color: '#b000ff' },
  { name: 'CNOT', qubit: 0, color: '#ff00ff' },
  { name: 'H', qubit: 2, color: '#00f0ff' },
  { name: 'RY', qubit: 1, color: '#b000ff' },
  { name: 'CNOT', qubit: 1, color: '#ff00ff' },
  { name: 'RZ', qubit: 0, color: '#00f0ff' },
  { name: 'H', qubit: 3, color: '#b000ff' },
];

export default function QuantumCircuitVisualizer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-panel p-6 rounded-2xl neon-border-purple"
    >
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          className="w-10 h-10 rounded-lg neon-border-purple bg-neon-purple/10 flex items-center justify-center"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Cpu className="w-5 h-5 neon-text-purple" />
        </motion.div>
        <div>
          <h3 className="text-xl font-display font-bold neon-text-purple">
            Quantum Circuit
          </h3>
          <p className="text-xs text-gray-400 font-mono">8 Qubits | Depth 42</p>
        </div>
      </div>

      {/* Circuit Diagram */}
      <div className="relative bg-black/50 rounded-lg p-6 border border-neon-purple/20">
        {/* Qubit Lines */}
        {[0, 1, 2, 3].map((qubit) => (
          <div key={qubit} className="relative mb-8 last:mb-0">
            {/* Qubit Label */}
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 font-mono text-sm neon-text-purple">
              q{qubit}
            </div>

            {/* Quantum Line */}
            <div className="relative h-0.5 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-magenta opacity-30" />

            {/* Gates on this qubit */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-around">
              {sampleCircuit
                .filter((gate) => gate.qubit === qubit)
                .map((gate, index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.5 + index * 0.1,
                      type: "spring",
                    }}
                    whileHover={{ scale: 1.2 }}
                  >
                    {/* Gate Box */}
                    <motion.div
                      className="w-12 h-12 rounded-lg flex items-center justify-center font-mono font-bold text-sm cursor-pointer"
                      style={{
                        backgroundColor: `${gate.color}20`,
                        border: `2px solid ${gate.color}`,
                        color: gate.color,
                        boxShadow: `0 0 10px ${gate.color}40, inset 0 0 10px ${gate.color}20`,
                      }}
                      animate={{
                        boxShadow: [
                          `0 0 10px ${gate.color}40, inset 0 0 10px ${gate.color}20`,
                          `0 0 20px ${gate.color}60, inset 0 0 15px ${gate.color}30`,
                          `0 0 10px ${gate.color}40, inset 0 0 10px ${gate.color}20`,
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {gate.name}
                    </motion.div>

                    {/* Quantum Particle */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: gate.color,
                        boxShadow: `0 0 10px ${gate.color}`,
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.2,
                      }}
                    />
                  </motion.div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Circuit Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center p-3 rounded-lg bg-black/30 border border-neon-purple/20">
          <p className="text-xs text-gray-400 mb-1">Total Gates</p>
          <p className="text-xl font-display font-bold neon-text-purple">
            {sampleCircuit.length}
          </p>
        </div>
        <div className="text-center p-3 rounded-lg bg-black/30 border border-neon-blue/20">
          <p className="text-xs text-gray-400 mb-1">Entanglement</p>
          <p className="text-xl font-display font-bold neon-text-blue">
            3
          </p>
        </div>
        <div className="text-center p-3 rounded-lg bg-black/30 border border-neon-magenta/20">
          <p className="text-xs text-gray-400 mb-1">Shots</p>
          <p className="text-xl font-display font-bold neon-text-magenta">
            8192
          </p>
        </div>
      </div>

      {/* Status */}
      <div className="mt-4 pt-4 border-t border-neon-purple/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Zap className="w-4 h-4 text-green-400" />
          </motion.div>
          <span className="text-sm text-gray-400">Circuit Compiled</span>
        </div>
        <span className="text-xs font-mono text-neon-purple">IBM Quantum Simulator</span>
      </div>
    </motion.div>
  );
}
