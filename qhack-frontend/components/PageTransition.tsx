'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { pageTransition } from '@/lib/animations';

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * PageTransition Component
 * 
 * Wraps page content with smooth fade-in/fade-out transitions.
 * Uses Framer Motion with optimized animations that don't interfere with navigation.
 * 
 * Features:
 * - Fade-in with 20px y-offset on page entry
 * - 300ms duration with easeOut easing
 * - Exit animations for smooth page changes
 * - Keyed by pathname for proper animation triggers
 */
export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
        style={{
          width: '100%',
          minHeight: '100%',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
