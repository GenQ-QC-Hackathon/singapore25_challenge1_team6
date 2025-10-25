# Design System Documentation

This directory contains the complete design system for the QHack Quantum Risk Engine frontend.

## Files

### `design-tokens.ts`
Centralized design tokens including colors, typography, spacing, shadows, and component specifications.

### `animations.ts`
Reusable animation configurations and easing functions for Framer Motion and CSS animations.

### `utils.ts`
Utility functions including `cn()` for conditional class names.

### `api.ts`
API client functions for backend communication.

### `data.ts`
Data utilities and mock data.

## Usage

### Using Design Tokens in TypeScript/React

```typescript
import { designTokens, getColor, getSpacing } from '@/lib/design-tokens';

// Access tokens directly
const primaryColor = designTokens.colors.brand.primary; // '#3B82F6'
const spacing = designTokens.spacing[8]; // '2rem'

// Use helper functions
const color = getColor('brand.primary'); // '#3B82F6'
const space = getSpacing(8); // '2rem'
```

### Using Design Tokens with Tailwind CSS

All design tokens are available as Tailwind utility classes via CSS variables defined in `app/globals.css`:

```tsx
// Colors
<div className="bg-blue-500 text-white">Primary</div>
<div className="bg-violet-500 text-white">Secondary</div>
<div className="text-slate-600">Secondary text</div>

// Spacing (8px base unit)
<div className="p-8 m-4 space-y-6">Content</div>

// Shadows
<div className="shadow-md hover:shadow-xl">Card</div>

// Border Radius
<div className="rounded-lg">Rounded</div>

// Typography
<h1 className="text-5xl font-bold">Heading</h1>
<p className="text-base text-slate-600">Body text</p>
```

### Using Animations with Framer Motion

```tsx
import { motion } from 'framer-motion';
import { fadeInUp, cardHover, buttonPress } from '@/lib/animations';

// Page transitions
<motion.div {...fadeInUp}>
  <h1>Welcome</h1>
</motion.div>

// Card with hover effect
<motion.div
  initial="rest"
  whileHover="hover"
  variants={cardHover}
>
  <p>Hover me</p>
</motion.div>

// Button with press effect
<motion.button
  initial="rest"
  whileHover="hover"
  whileTap="press"
  variants={buttonPress}
>
  Click me
</motion.button>
```

### Using Easing Functions

```tsx
import { easings, durations } from '@/lib/animations';

// In Framer Motion
<motion.div
  animate={{ opacity: 1 }}
  transition={{
    duration: durations.normal / 1000,
    ease: [0.16, 1, 0.3, 1], // easeOut
  }}
/>

// In CSS
.element {
  transition: all 200ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

## Design System Principles

### Colors
- **Primary (Blue)**: Classical computing, primary actions
- **Secondary (Violet)**: Quantum computing, secondary actions
- **Accent (Cyan)**: Highlights and special elements
- **Semantic**: Success (emerald), Warning (amber), Error (red), Info (blue)
- **Neutral (Slate)**: Text, backgrounds, borders

### Typography
- **Font Families**: Inter (UI), JetBrains Mono (code)
- **Type Scale**: 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72px
- **Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Line Heights**: 1.2 (tight/headings), 1.5 (normal/body), 1.75 (relaxed)

### Spacing
Based on 8px unit: 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96px

### Shadows
Layered depth system: sm, md, lg, xl, 2xl for progressive elevation

### Border Radius
6px (sm), 8px (default), 12px (md), 16px (lg), 24px (xl), 32px (2xl)

### Animations
- **Duration**: 100ms (fast), 200ms (normal), 300ms (slow)
- **Easing**: easeOut for most interactions
- **Principle**: Purposeful, subtle, fast, consistent

## Component Specifications

### Buttons
- Heights: 32px (sm), 40px (md), 48px (lg), 56px (xl)
- Variants: Primary (gradient), Secondary (outline), Ghost (text)

### Inputs
- Heights: 32px (sm), 40px (md), 48px (lg)
- Focus: 2px blue-500 ring with 2px offset

### Cards
- Padding: 16px (sm), 24px (md), 32px (lg)
- Shadow: md with hover:xl transition
- Border: Optional 4px left accent

### Layout
- Navbar: 64px height
- Footer: 64px height
- Sidebar: 25% width (min 320px, max 400px)
- Container: Max 1400px width

## Accessibility

- **Contrast**: WCAG AAA (7:1 minimum)
- **Touch Targets**: Minimum 44x44px
- **Focus Indicators**: 2px solid outline with 2px offset
- **Reduced Motion**: Respects `prefers-reduced-motion`

## Examples

### Hero Section
```tsx
<section className="h-[80vh] bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50 flex items-center justify-center">
  <div className="text-center space-y-6">
    <h1 className="text-7xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
      QHack
    </h1>
    <p className="text-xl text-slate-600 max-w-2xl">
      Quantum Risk Engine
    </p>
    <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all">
      Get Started
    </button>
  </div>
</section>
```

### Result Card
```tsx
<div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
  <h3 className="text-sm font-medium text-slate-600 uppercase tracking-wide mb-2">
    Classical Monte Carlo
  </h3>
  <p className="text-5xl font-bold text-slate-900">
    $1,234,567
  </p>
  <p className="text-sm text-slate-500 mt-2">
    Potential Future Exposure
  </p>
</div>
```

### Comparison Panel
```tsx
<div className="bg-gradient-to-br from-blue-50/50 to-violet-50/50 p-8 rounded-xl border-2 border-transparent bg-clip-padding shadow-lg">
  <h3 className="text-2xl font-semibold text-slate-900 mb-4">
    Performance Comparison
  </h3>
  <div className="text-center">
    <p className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
      2.5x
    </p>
    <p className="text-slate-600 mt-2">Speedup</p>
  </div>
</div>
```

## Maintenance

When updating the design system:

1. Update `design-tokens.ts` with new token values
2. Update CSS variables in `app/globals.css` to match
3. Update this README with new examples
4. Test all components to ensure consistency
5. Run `npm run build` to verify no errors

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
