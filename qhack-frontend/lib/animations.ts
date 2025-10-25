/**
 * Animation Configurations and Easing Functions
 * 
 * This file contains reusable animation configurations for Framer Motion
 * and standard CSS animations. All animations follow the design system
 * principles: purposeful, subtle, fast, and consistent.
 */

// ============================================================================
// EASING FUNCTIONS
// ============================================================================

export const easings = {
  // Smooth deceleration - best for most UI interactions
  easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
  
  // Smooth acceleration - for elements entering
  easeIn: 'cubic-bezier(0.7, 0, 0.84, 0)',
  
  // Smooth both directions - for complex animations
  easeInOut: 'cubic-bezier(0.87, 0, 0.13, 1)',
  
  // Bouncy spring effect - for playful interactions
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  
  // Sharp - for instant feedback
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
} as const;

// ============================================================================
// DURATION CONSTANTS
// ============================================================================

export const durations = {
  instant: 0,
  fast: 100,
  normal: 200,
  slow: 300,
  slower: 500,
  slowest: 1000,
} as const;

// ============================================================================
// FRAMER MOTION VARIANTS
// ============================================================================

/**
 * Page transition animations
 */
export const pageTransition = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: durations.slow / 1000,
      ease: [0.16, 1, 0.3, 1], // easeOut
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: durations.normal / 1000,
      ease: [0.7, 0, 0.84, 0], // easeIn
    }
  },
} as const;

/**
 * Fade in animation
 */
export const fadeIn = {
  initial: { 
    opacity: 0 
  },
  animate: { 
    opacity: 1,
    transition: {
      duration: durations.slow / 1000,
      ease: [0.16, 1, 0.3, 1],
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: durations.normal / 1000,
    }
  },
} as const;

/**
 * Fade in with upward motion
 */
export const fadeInUp = {
  initial: { 
    opacity: 0, 
    y: 40 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: durations.slow / 1000,
      ease: [0.16, 1, 0.3, 1],
    }
  },
} as const;

/**
 * Fade in with downward motion
 */
export const fadeInDown = {
  initial: { 
    opacity: 0, 
    y: -40 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: durations.slow / 1000,
      ease: [0.16, 1, 0.3, 1],
    }
  },
} as const;

/**
 * Scale in animation
 */
export const scaleIn = {
  initial: { 
    opacity: 0, 
    scale: 0.9 
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: durations.slow / 1000,
      ease: [0.16, 1, 0.3, 1],
    }
  },
} as const;

/**
 * Card hover animation
 */
export const cardHover = {
  rest: { 
    y: 0, 
    scale: 1,
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  },
  hover: { 
    y: -8, 
    scale: 1.01,
    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    transition: {
      duration: durations.normal / 1000,
      ease: [0.16, 1, 0.3, 1],
    }
  },
} as const;

/**
 * Button press animation
 */
export const buttonPress = {
  rest: { 
    scale: 1 
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: durations.normal / 1000,
      ease: [0.16, 1, 0.3, 1],
    }
  },
  press: { 
    scale: 0.98,
    transition: {
      duration: durations.fast / 1000,
    }
  },
} as const;

/**
 * Stagger children animation container
 */
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
} as const;

/**
 * Stagger item (child of staggerContainer)
 */
export const staggerItem = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: durations.slow / 1000,
      ease: [0.16, 1, 0.3, 1],
    }
  },
} as const;

/**
 * Slide in from left
 */
export const slideInLeft = {
  initial: { 
    opacity: 0, 
    x: -100 
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: durations.slow / 1000,
      ease: [0.16, 1, 0.3, 1],
    }
  },
} as const;

/**
 * Slide in from right
 */
export const slideInRight = {
  initial: { 
    opacity: 0, 
    x: 100 
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: durations.slow / 1000,
      ease: [0.16, 1, 0.3, 1],
    }
  },
} as const;

/**
 * Modal/Dialog animation
 */
export const modalAnimation = {
  initial: { 
    opacity: 0, 
    scale: 0.95,
    y: 20,
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      duration: durations.slow / 1000,
      ease: [0.16, 1, 0.3, 1],
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    y: 20,
    transition: {
      duration: durations.normal / 1000,
      ease: [0.7, 0, 0.84, 0],
    }
  },
} as const;

/**
 * Backdrop animation
 */
export const backdropAnimation = {
  initial: { 
    opacity: 0 
  },
  animate: { 
    opacity: 1,
    transition: {
      duration: durations.normal / 1000,
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: durations.normal / 1000,
    }
  },
} as const;

/**
 * Drawer animation (from bottom)
 */
export const drawerAnimation = {
  initial: { 
    y: '100%' 
  },
  animate: { 
    y: 0,
    transition: {
      duration: durations.slow / 1000,
      ease: [0.16, 1, 0.3, 1],
    }
  },
  exit: { 
    y: '100%',
    transition: {
      duration: durations.normal / 1000,
      ease: [0.7, 0, 0.84, 0],
    }
  },
} as const;

/**
 * Collapse/Expand animation
 */
export const collapseAnimation = {
  collapsed: { 
    height: 0,
    opacity: 0,
    transition: {
      duration: durations.normal / 1000,
      ease: [0.7, 0, 0.84, 0],
    }
  },
  expanded: { 
    height: 'auto',
    opacity: 1,
    transition: {
      duration: durations.slow / 1000,
      ease: [0.16, 1, 0.3, 1],
    }
  },
} as const;

// ============================================================================
// NUMBER COUNTER ANIMATION CONFIG
// ============================================================================

/**
 * Configuration for animated number counters
 */
export const numberCounterConfig = {
  duration: durations.slowest / 1000, // 1 second
  easing: easings.easeOut,
  useGrouping: true,
  separator: ',',
  decimal: '.',
  prefix: '',
  suffix: '',
} as const;

// ============================================================================
// LOADING ANIMATIONS
// ============================================================================

/**
 * Pulse animation for loading states
 */
export const pulseAnimation = {
  animate: {
    opacity: [1, 0.5, 1],
    transition: {
      duration: durations.slower / 1000,
      repeat: Infinity,
      ease: [0.87, 0, 0.13, 1],
    }
  },
} as const;

/**
 * Spin animation for spinners
 */
export const spinAnimation = {
  animate: {
    rotate: 360,
    transition: {
      duration: durations.slowest / 1000,
      repeat: Infinity,
      ease: 'linear',
    }
  },
} as const;

/**
 * Bounce animation
 */
export const bounceAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: durations.slower / 1000,
      repeat: Infinity,
      ease: [0.34, 1.56, 0.64, 1],
    }
  },
} as const;

// ============================================================================
// GESTURE ANIMATIONS
// ============================================================================

/**
 * Tap animation for interactive elements
 */
export const tapAnimation = {
  whileTap: { 
    scale: 0.98,
    transition: {
      duration: durations.fast / 1000,
    }
  },
} as const;

/**
 * Hover lift animation
 */
export const hoverLift = {
  whileHover: { 
    y: -4,
    transition: {
      duration: durations.normal / 1000,
      ease: [0.16, 1, 0.3, 1],
    }
  },
} as const;

/**
 * Hover scale animation
 */
export const hoverScale = {
  whileHover: { 
    scale: 1.05,
    transition: {
      duration: durations.normal / 1000,
      ease: [0.16, 1, 0.3, 1],
    }
  },
} as const;

// ============================================================================
// SPRING CONFIGURATIONS
// ============================================================================

/**
 * Spring configurations for physics-based animations
 */
export const springs = {
  // Gentle spring
  gentle: {
    type: 'spring' as const,
    stiffness: 100,
    damping: 15,
  },
  
  // Bouncy spring
  bouncy: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 20,
  },
  
  // Stiff spring
  stiff: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 30,
  },
  
  // Slow spring
  slow: {
    type: 'spring' as const,
    stiffness: 50,
    damping: 20,
  },
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Create a custom transition with specified duration and easing
 */
export function createTransition(
  duration: number = durations.normal,
  easing: string = easings.easeOut
) {
  return {
    duration: duration / 1000,
    ease: easing.match(/cubic-bezier\((.*)\)/)?.[1].split(',').map(Number) || [0.16, 1, 0.3, 1],
  };
}

/**
 * Create a stagger animation with custom delay
 */
export function createStagger(
  staggerDelay: number = 0.1,
  childDelay: number = 0.2
) {
  return {
    animate: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: childDelay,
      },
    },
  };
}

/**
 * Export all animations as a single object
 */
export const animations = {
  easings,
  durations,
  pageTransition,
  fadeIn,
  fadeInUp,
  fadeInDown,
  scaleIn,
  cardHover,
  buttonPress,
  staggerContainer,
  staggerItem,
  slideInLeft,
  slideInRight,
  modalAnimation,
  backdropAnimation,
  drawerAnimation,
  collapseAnimation,
  numberCounterConfig,
  pulseAnimation,
  spinAnimation,
  bounceAnimation,
  tapAnimation,
  hoverLift,
  hoverScale,
  springs,
} as const;

export default animations;
