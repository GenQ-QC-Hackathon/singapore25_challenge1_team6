/**
 * Performance Optimization Utilities
 * 
 * This file contains utilities and configurations for optimizing
 * application performance, including lazy loading, code splitting,
 * and animation optimizations.
 */

// ============================================================================
// GPU-ACCELERATED PROPERTIES
// ============================================================================

/**
 * List of CSS properties that are GPU-accelerated and should be used
 * for animations to ensure 60fps performance.
 * 
 * ALWAYS USE: transform, opacity
 * AVOID: width, height, top, left, margin, padding
 */
export const GPU_ACCELERATED_PROPERTIES = [
  'transform',
  'opacity',
  'filter',
  'backdrop-filter',
] as const;

/**
 * Hint to browser that an element will be animated
 * Use sparingly as it consumes memory
 */
export function enableWillChange(properties: string[] = ['transform', 'opacity']) {
  return {
    willChange: properties.join(', '),
  };
}

// ============================================================================
// LAZY LOADING UTILITIES
// ============================================================================

/**
 * Preload a route for faster navigation
 */
export function preloadRoute(href: string) {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
}

/**
 * Preload multiple routes
 */
export function preloadRoutes(hrefs: string[]) {
  hrefs.forEach(preloadRoute);
}

// ============================================================================
// IMAGE OPTIMIZATION
// ============================================================================

/**
 * Get optimized image props for Next.js Image component
 */
export function getOptimizedImageProps(
  src: string,
  alt: string,
  priority: boolean = false
) {
  return {
    src,
    alt,
    priority,
    quality: 85, // Good balance between quality and file size
    loading: priority ? ('eager' as const) : ('lazy' as const),
    placeholder: 'blur' as const,
  };
}

// ============================================================================
// BUNDLE SIZE OPTIMIZATION
// ============================================================================

/**
 * Dynamically import a module only when needed
 */
export async function lazyImport<T>(
  importFn: () => Promise<{ default: T }>
): Promise<T> {
  const module = await importFn();
  return module.default;
}

/**
 * Check if code splitting is supported
 */
export function supportsCodeSplitting(): boolean {
  return typeof window !== 'undefined' && 'import' in window;
}

// ============================================================================
// PERFORMANCE MONITORING
// ============================================================================

/**
 * Measure component render time
 */
export function measureRenderTime(componentName: string, callback: () => void) {
  if (typeof window === 'undefined' || !window.performance) {
    callback();
    return;
  }

  const perf = window.performance;
  const startMark = `${componentName}-start`;
  const endMark = `${componentName}-end`;
  const measureName = `${componentName}-render`;

  perf.mark(startMark);
  callback();
  perf.mark(endMark);
  
  try {
    perf.measure(measureName, startMark, endMark);
    const measure = perf.getEntriesByName(measureName)[0];
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${componentName} rendered in ${measure.duration.toFixed(2)}ms`);
    }
    
    // Clean up marks
    perf.clearMarks(startMark);
    perf.clearMarks(endMark);
    perf.clearMeasures(measureName);
  } catch (error) {
    // Silently fail if performance API is not fully supported
  }
}

/**
 * Get Web Vitals metrics
 */
export function reportWebVitals(metric: any) {
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vitals]', metric);
  }
  
  // In production, you could send this to an analytics service
  // Example: analytics.track('web-vitals', metric);
}

// ============================================================================
// REDUCED MOTION SUPPORT
// ============================================================================

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get animation duration based on user preference
 * Returns 0.01ms if user prefers reduced motion, otherwise returns the specified duration
 */
export function getAnimationDuration(duration: number): number {
  return prefersReducedMotion() ? 0.01 : duration;
}

/**
 * Create a media query listener for reduced motion preference changes
 */
export function onReducedMotionChange(callback: (prefersReduced: boolean) => void) {
  if (typeof window === 'undefined') return () => {};
  
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const handler = (e: MediaQueryListEvent) => callback(e.matches);
  
  mediaQuery.addEventListener('change', handler);
  
  // Return cleanup function
  return () => mediaQuery.removeEventListener('change', handler);
}

// ============================================================================
// DEBOUNCE & THROTTLE
// ============================================================================

/**
 * Debounce function to limit execution rate
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function to limit execution rate
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// ============================================================================
// INTERSECTION OBSERVER
// ============================================================================

/**
 * Create an intersection observer for lazy loading
 */
export function createLazyLoadObserver(
  callback: (entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverInit
) {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }
  
  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    });
  }, {
    rootMargin: '50px',
    threshold: 0.01,
    ...options,
  });
}

// ============================================================================
// MEMORY OPTIMIZATION
// ============================================================================

/**
 * Clean up resources when component unmounts
 */
export function createCleanup(...cleanupFns: (() => void)[]) {
  return () => {
    cleanupFns.forEach((fn) => {
      try {
        fn();
      } catch (error) {
        console.error('Cleanup error:', error);
      }
    });
  };
}

/**
 * Memoize expensive computations
 */
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map();
  
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    
    return result;
  }) as T;
}

// ============================================================================
// EXPORTS
// ============================================================================

export const performanceUtils = {
  GPU_ACCELERATED_PROPERTIES,
  enableWillChange,
  preloadRoute,
  preloadRoutes,
  getOptimizedImageProps,
  lazyImport,
  supportsCodeSplitting,
  measureRenderTime,
  reportWebVitals,
  prefersReducedMotion,
  getAnimationDuration,
  onReducedMotionChange,
  debounce,
  throttle,
  createLazyLoadObserver,
  createCleanup,
  memoize,
} as const;

export default performanceUtils;
