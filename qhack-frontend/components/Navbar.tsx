'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-neon-blue/30"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <Activity className="w-8 h-8 neon-text-blue" />
                <motion.div
                  className="absolute inset-0 blur-xl"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Activity className="w-8 h-8 text-neon-blue" />
                </motion.div>
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold neon-text-blue tracking-wider">
                  QHack
                </h1>
                <p className="text-xs text-neon-purple/70 font-mono">
                  Quantum Risk Engine
                </p>
              </div>
            </motion.div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href}>
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span
                      className={`
                        font-medium transition-colors duration-300
                        ${isActive
                          ? 'neon-text-blue'
                          : 'text-gray-300 hover:text-neon-purple'
                        }
                      `}
                    >
                      {link.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="underline"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-magenta"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Status Indicator */}
          <motion.div
            className="flex items-center gap-2 px-4 py-2 rounded-full neon-border-blue bg-black/50"
            animate={{
              boxShadow: [
                '0 0 10px rgba(0, 240, 255, 0.3)',
                '0 0 20px rgba(0, 240, 255, 0.6)',
                '0 0 10px rgba(0, 240, 255, 0.3)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-neon-blue"
              animate={{
                opacity: [1, 0.3, 1],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span className="text-sm font-mono text-neon-blue">
              ONLINE
            </span>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
