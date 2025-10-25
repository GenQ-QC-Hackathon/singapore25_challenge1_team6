'use client';

import PageTransition from '@/components/PageTransition';

/**
 * Root Template
 * 
 * This template wraps all pages with the PageTransition component.
 * Unlike layout.tsx, template.tsx re-renders on navigation, which is
 * necessary for page transitions to work properly.
 * 
 * The template ensures smooth fade-in/fade-out animations between
 * all route changes without interfering with navigation functionality.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
