'use client';

import { useEffect } from 'react';
import { reportWebVitals } from './web-vitals';

/**
 * Web Vitals Reporter Component
 * 
 * This component initializes web vitals reporting when the app loads.
 * It should be included in the root layout.
 */
export function WebVitalsReporter() {
  useEffect(() => {
    // Initialize web vitals reporting
    reportWebVitals();
  }, []);

  // This component doesn't render anything
  return null;
}
