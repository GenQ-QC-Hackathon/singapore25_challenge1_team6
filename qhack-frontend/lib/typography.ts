/**
 * Typography Utilities
 * 
 * Helper functions and utilities for consistent typography throughout the application.
 * Implements requirements from Task 20:
 * - Consistent type scale (12, 14, 16, 20, 24, 32, 48, 64px)
 * - Tabular figures for numeric displays
 * - Appropriate line heights (1.5 for body, 1.2 for headings)
 * - Font weight hierarchy (400, 500, 600, 700)
 */

import { typography } from './design-tokens';

/**
 * Typography class names for consistent styling
 */
export const typographyClasses = {
  // Headings with proper line-height (1.2)
  h1: 'text-4xl font-bold leading-[1.2] tracking-tight',           // 64px
  h2: 'text-3xl font-bold leading-[1.2] tracking-tight',           // 48px
  h3: 'text-2xl font-semibold leading-[1.2] tracking-tight',       // 32px
  h4: 'text-xl font-semibold leading-[1.2]',                       // 24px
  h5: 'text-lg font-semibold leading-[1.2]',                       // 20px
  h6: 'text-base font-semibold leading-[1.2]',                     // 16px
  
  // Body text with proper line-height (1.5)
  body: 'text-base font-normal leading-[1.5]',                     // 16px
  bodyLarge: 'text-lg font-normal leading-[1.5]',                  // 20px
  bodySmall: 'text-sm font-normal leading-[1.5]',                  // 14px
  
  // Labels and UI text
  label: 'text-sm font-medium leading-[1.5]',                      // 14px
  caption: 'text-xs font-normal leading-[1.5]',                    // 12px
  
  // Numeric displays with tabular figures
  metric: 'text-3xl font-bold leading-[1.2] tabular-nums',         // 48px
  metricLarge: 'text-4xl font-bold leading-[1.2] tabular-nums',    // 64px
  metricMedium: 'text-2xl font-bold leading-[1.2] tabular-nums',   // 32px
  metricSmall: 'text-xl font-semibold leading-[1.2] tabular-nums', // 24px
  
  // Code and monospace
  code: 'font-mono text-sm tabular-nums',                          // 14px
  codeInline: 'font-mono text-sm tabular-nums',                    // 14px
  
  // Responsive headings (mobile-friendly)
  h1Responsive: 'text-3xl md:text-4xl font-bold leading-[1.2] tracking-tight',
  h2Responsive: 'text-2xl md:text-3xl font-bold leading-[1.2] tracking-tight',
  h3Responsive: 'text-xl md:text-2xl font-semibold leading-[1.2] tracking-tight',
} as const;

/**
 * Get font size in rem
 */
export function getFontSize(size: keyof typeof typography.fontSize): string {
  return typography.fontSize[size];
}

/**
 * Get font weight
 */
export function getFontWeight(weight: keyof typeof typography.fontWeight): number {
  return typography.fontWeight[weight];
}

/**
 * Get line height
 */
export function getLineHeight(height: keyof typeof typography.lineHeight): number {
  return typography.lineHeight[height];
}

/**
 * Apply tabular figures to a className string
 */
export function withTabularNums(className: string = ''): string {
  return `${className} tabular-nums`.trim();
}

/**
 * Create a typography style object for inline styles
 */
export function createTypographyStyle(options: {
  size?: keyof typeof typography.fontSize;
  weight?: keyof typeof typography.fontWeight;
  lineHeight?: keyof typeof typography.lineHeight;
  tabularNums?: boolean;
  fontFamily?: 'sans' | 'mono';
}): React.CSSProperties {
  const style: React.CSSProperties = {};
  
  if (options.size) {
    style.fontSize = typography.fontSize[options.size];
  }
  
  if (options.weight) {
    style.fontWeight = typography.fontWeight[options.weight];
  }
  
  if (options.lineHeight) {
    style.lineHeight = typography.lineHeight[options.lineHeight];
  }
  
  if (options.tabularNums) {
    style.fontFeatureSettings = typography.fontFeatureSettings.tabularNums;
    style.fontVariantNumeric = 'tabular-nums';
  }
  
  if (options.fontFamily) {
    style.fontFamily = typography.fontFamily[options.fontFamily];
  }
  
  return style;
}

/**
 * Typography presets for common use cases
 */
export const typographyPresets = {
  // Hero section
  heroHeading: {
    className: typographyClasses.h1Responsive,
    style: createTypographyStyle({ size: '4xl', weight: 'bold', lineHeight: 'heading' }),
  },
  
  // Dashboard metrics
  dashboardMetric: {
    className: typographyClasses.metricLarge,
    style: createTypographyStyle({ size: '4xl', weight: 'bold', lineHeight: 'heading', tabularNums: true }),
  },
  
  // Card titles
  cardTitle: {
    className: typographyClasses.h3,
    style: createTypographyStyle({ size: '2xl', weight: 'semibold', lineHeight: 'heading' }),
  },
  
  // Body content
  bodyContent: {
    className: typographyClasses.body,
    style: createTypographyStyle({ size: 'base', weight: 'normal', lineHeight: 'body' }),
  },
  
  // Form labels
  formLabel: {
    className: typographyClasses.label,
    style: createTypographyStyle({ size: 'sm', weight: 'medium', lineHeight: 'body' }),
  },
  
  // Numeric values
  numericValue: {
    className: typographyClasses.metric,
    style: createTypographyStyle({ size: '3xl', weight: 'bold', lineHeight: 'heading', tabularNums: true }),
  },
} as const;

/**
 * Export all typography utilities
 */
export default {
  classes: typographyClasses,
  getFontSize,
  getFontWeight,
  getLineHeight,
  withTabularNums,
  createTypographyStyle,
  presets: typographyPresets,
};
