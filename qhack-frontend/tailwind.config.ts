import type { Config } from 'tailwindcss';

/**
 * Tailwind CSS v4 Configuration
 * 
 * Note: Tailwind v4 uses CSS-based configuration via @theme in globals.css.
 * This file is primarily for plugins and additional customizations.
 * 
 * Design tokens are defined in:
 * - lib/design-tokens.ts (TypeScript constants)
 * - app/globals.css (CSS variables for Tailwind)
 */

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Additional customizations can go here
      // Most theme configuration is in globals.css via @theme
    },
  },
  plugins: [
    // Add Tailwind plugins here if needed
  ],
};

export default config;
