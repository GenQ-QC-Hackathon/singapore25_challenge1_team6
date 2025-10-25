/**
 * Design Tokens - Centralized Design System
 * 
 * This file contains all design tokens for the QHack Quantum Risk Engine.
 * These tokens ensure consistency across the application and make it easy
 * to maintain and update the design system.
 */

// ============================================================================
// COLOR PALETTE
// ============================================================================

export const colors = {
  // Backgrounds
  background: {
    primary: '#FFFFFF',
    secondary: '#F8FAFC',    // slate-50
    tertiary: '#F1F5F9',     // slate-100
  },
  
  // Text Colors
  text: {
    primary: '#0F172A',      // slate-900
    secondary: '#475569',    // slate-600
    tertiary: '#94A3B8',     // slate-400
    inverse: '#FFFFFF',      // white
  },
  
  // Brand Colors (Quantum Theme)
  brand: {
    primary: '#3B82F6',      // blue-500 (Classical)
    primaryDark: '#2563EB',  // blue-600
    primaryLight: '#60A5FA', // blue-400
    secondary: '#8B5CF6',    // violet-500 (Quantum)
    secondaryDark: '#7C3AED',// violet-600
    secondaryLight: '#A78BFA',// violet-400
    accent: '#06B6D4',       // cyan-500 (Highlights)
    accentDark: '#0891B2',   // cyan-600
    accentLight: '#22D3EE',  // cyan-400
  },
  
  // Semantic Colors
  semantic: {
    success: '#10B981',      // emerald-500
    successDark: '#059669',  // emerald-600
    successLight: '#34D399', // emerald-400
    warning: '#F59E0B',      // amber-500
    warningDark: '#D97706',  // amber-600
    warningLight: '#FBBF24', // amber-400
    error: '#EF4444',        // red-500
    errorDark: '#DC2626',    // red-600
    errorLight: '#F87171',   // red-400
    info: '#3B82F6',         // blue-500
    infoDark: '#2563EB',     // blue-600
    infoLight: '#60A5FA',    // blue-400
  },
  
  // Borders & Dividers
  border: {
    light: '#F1F5F9',        // slate-100
    default: '#E2E8F0',      // slate-200
    medium: '#CBD5E1',       // slate-300
    strong: '#94A3B8',       // slate-400
  },
  
  // Slate Scale (for reference)
  slate: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
    950: '#020617',
  },
  
  // Blue Scale
  blue: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
    950: '#172554',
  },
  
  // Violet Scale
  violet: {
    50: '#F5F3FF',
    100: '#EDE9FE',
    200: '#DDD6FE',
    300: '#C4B5FD',
    400: '#A78BFA',
    500: '#8B5CF6',
    600: '#7C3AED',
    700: '#6D28D9',
    800: '#5B21B6',
    900: '#4C1D95',
    950: '#2E1065',
  },
} as const;

// ============================================================================
// TYPOGRAPHY SYSTEM
// ============================================================================

export const typography = {
  // Font Families
  fontFamily: {
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },
  
  // Type Scale (based on design document)
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
    '7xl': '4.5rem',    // 72px
  },
  
  // Font Weights
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
  
  // Letter Spacing
  letterSpacing: {
    tighter: '-0.02em',
    tight: '-0.01em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

// ============================================================================
// SPACING SYSTEM (8px Base Unit)
// ============================================================================

export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  14: '3.5rem',   // 56px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
  40: '10rem',    // 160px
  48: '12rem',    // 192px
  56: '14rem',    // 224px
  64: '16rem',    // 256px
} as const;

// ============================================================================
// SHADOW SYSTEM (Layered Depth)
// ============================================================================

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  default: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: 'none',
} as const;

// ============================================================================
// BORDER RADIUS SYSTEM
// ============================================================================

export const borderRadius = {
  none: '0',
  sm: '0.375rem',   // 6px
  default: '0.5rem', // 8px
  md: '0.75rem',    // 12px
  lg: '1rem',       // 16px
  xl: '1.5rem',     // 24px
  '2xl': '2rem',    // 32px
  full: '9999px',
} as const;

// ============================================================================
// Z-INDEX SCALE
// ============================================================================

export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;

// ============================================================================
// BREAKPOINTS
// ============================================================================

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ============================================================================
// CONTAINER WIDTHS
// ============================================================================

export const containerWidths = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1400px',  // Max width for optimal readability
} as const;

// ============================================================================
// TRANSITION DURATIONS
// ============================================================================

export const transitionDuration = {
  fast: '100ms',
  normal: '200ms',
  slow: '300ms',
  slower: '500ms',
} as const;

// ============================================================================
// GRADIENT DEFINITIONS
// ============================================================================

export const gradients = {
  // Brand Gradients
  primary: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
  secondary: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
  quantum: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
  
  // Background Gradients
  heroBackground: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 50%, #F5F3FF 100%)',
  cardBackground: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
  
  // Text Gradients
  textPrimary: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
  textSecondary: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)',
} as const;

// ============================================================================
// COMPONENT-SPECIFIC TOKENS
// ============================================================================

export const components = {
  // Button Sizes
  button: {
    height: {
      sm: '2rem',      // 32px
      md: '2.5rem',    // 40px
      lg: '3rem',      // 48px
      xl: '3.5rem',    // 56px
    },
    padding: {
      sm: '0.5rem 1rem',
      md: '0.75rem 1.5rem',
      lg: '1rem 2rem',
      xl: '1.25rem 2.5rem',
    },
  },
  
  // Input Sizes
  input: {
    height: {
      sm: '2rem',      // 32px
      md: '2.5rem',    // 40px
      lg: '3rem',      // 48px
    },
    padding: {
      sm: '0.5rem 0.75rem',
      md: '0.75rem 1rem',
      lg: '1rem 1.25rem',
    },
  },
  
  // Card Padding
  card: {
    padding: {
      sm: '1rem',      // 16px
      md: '1.5rem',    // 24px
      lg: '2rem',      // 32px
    },
  },
  
  // Navbar
  navbar: {
    height: '4rem',    // 64px
  },
  
  // Footer
  footer: {
    height: '4rem',    // 64px
  },
  
  // Sidebar
  sidebar: {
    width: {
      min: '20rem',    // 320px
      default: '25%',
      max: '25rem',    // 400px
    },
  },
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get a color value from the design tokens
 */
export function getColor(path: string): string {
  const keys = path.split('.');
  let value: any = colors;
  
  for (const key of keys) {
    value = value[key];
    if (value === undefined) {
      console.warn(`Color token not found: ${path}`);
      return '#000000';
    }
  }
  
  return value;
}

/**
 * Get a spacing value from the design tokens
 */
export function getSpacing(key: keyof typeof spacing): string {
  return spacing[key] || spacing[0];
}

/**
 * Get a shadow value from the design tokens
 */
export function getShadow(key: keyof typeof shadows): string {
  return shadows[key] || shadows.none;
}

/**
 * Export all tokens as a single object for convenience
 */
export const designTokens = {
  colors,
  typography,
  spacing,
  shadows,
  borderRadius,
  zIndex,
  breakpoints,
  containerWidths,
  transitionDuration,
  gradients,
  components,
} as const;

export default designTokens;
