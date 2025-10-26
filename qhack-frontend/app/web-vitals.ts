'use client';

import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from 'web-vitals';

/**
 * Web Vitals Reporting
 * 
 * This file sets up reporting for Core Web Vitals metrics:
 * - CLS (Cumulative Layout Shift): Target 0
 * - FCP (First Contentful Paint): Target < 1.8s
 * - INP (Interaction to Next Paint): Target < 200ms (replaces FID)
 * - LCP (Largest Contentful Paint): Target < 2.5s
 * - TTFB (Time to First Byte): Target < 800ms
 * 
 * Note: FID (First Input Delay) has been deprecated in favor of INP
 */

function sendToAnalytics(metric: Metric) {
  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
    });
  }

  // In production, send to your analytics service
  // Example: Google Analytics
  // if (typeof window !== 'undefined' && window.gtag) {
  //   window.gtag('event', metric.name, {
  //     value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
  //     event_category: 'Web Vitals',
  //     event_label: metric.id,
  //     non_interaction: true,
  //   });
  // }

  // Example: Custom analytics endpoint
  // fetch('/api/analytics', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     name: metric.name,
  //     value: metric.value,
  //     rating: metric.rating,
  //     delta: metric.delta,
  //     id: metric.id,
  //     navigationType: metric.navigationType,
  //   }),
  // });
}

/**
 * Initialize Web Vitals reporting
 * Call this in your root layout or _app.tsx
 */
export function reportWebVitals() {
  try {
    onCLS(sendToAnalytics);
    onFCP(sendToAnalytics);
    onINP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
  } catch (error) {
    console.error('[Web Vitals] Error initializing:', error);
  }
}

/**
 * Get performance thresholds for each metric
 */
export const PERFORMANCE_THRESHOLDS = {
  CLS: {
    good: 0.1,
    needsImprovement: 0.25,
    target: 0, // Zero layout shift target
  },
  FCP: {
    good: 1800,
    needsImprovement: 3000,
    target: 1800,
  },

  INP: {
    good: 200,
    needsImprovement: 500,
    target: 200,
  },
  LCP: {
    good: 2500,
    needsImprovement: 4000,
    target: 2500,
  },
  TTFB: {
    good: 800,
    needsImprovement: 1800,
    target: 800,
  },
} as const;

/**
 * Check if a metric meets the "good" threshold
 */
export function isGoodMetric(name: keyof typeof PERFORMANCE_THRESHOLDS, value: number): boolean {
  const threshold = PERFORMANCE_THRESHOLDS[name];
  return value <= threshold.good;
}

/**
 * Get rating for a metric value
 */
export function getMetricRating(
  name: keyof typeof PERFORMANCE_THRESHOLDS,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const threshold = PERFORMANCE_THRESHOLDS[name];
  
  if (value <= threshold.good) {
    return 'good';
  } else if (value <= threshold.needsImprovement) {
    return 'needs-improvement';
  } else {
    return 'poor';
  }
}
