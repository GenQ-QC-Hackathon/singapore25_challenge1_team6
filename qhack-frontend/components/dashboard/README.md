# Dashboard Components

This directory contains specialized components for the dashboard page.

## ResultCard

The `ResultCard` component displays simulation results in a polished, professional format with animated metrics and collapsible details.

### Features

- **Side-by-side layout** on desktop, stacked on mobile (responsive)
- **White background** with shadow-md and rounded-xl styling
- **4px colored left border** (blue for classical, violet for quantum)
- **Top 3 metrics** displayed prominently with 48px font size and animated counters
- **Collapsible "View Details"** section for additional metrics
- **Smooth animations** using Framer Motion
- **Accessible** with proper ARIA labels and semantic HTML

### Usage

```tsx
import ResultCard from '@/components/dashboard/ResultCard';
import { ClassicalResult, QuantumResult } from '@/lib/api';

// Classical result
const classicalResult: ClassicalResult = {
  expected_exposure: 45.23,
  pfe: 78.91,
  alpha: 0.95,
  sample_mean: 42.15,
  sample_std: 12.34,
  runtime_ms: 125.5,
  samples_used: 10000,
  variance_reduction: 'Antithetic',
};

<ResultCard type="classical" result={classicalResult} />

// Quantum result
const quantumResult: QuantumResult = {
  pfe: 79.45,
  expected_exposure: 45.67,
  alpha: 0.95,
  num_qubits: 5,
  ae_iterations: 6,
  backend: 'aer_simulator',
  discretization_bins: 32,
  runtime_ms: 89.2,
  circuit_depth: 124,
};

<ResultCard type="quantum" result={quantumResult} />
```

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `type` | `'classical' \| 'quantum'` | Yes | Determines the color scheme and icon |
| `result` | `ClassicalResult \| QuantumResult` | Yes | The simulation result data to display |
| `className` | `string` | No | Additional CSS classes to apply |

### Layout

The component uses a responsive grid layout:
- **Desktop (≥640px)**: 3-column grid for primary metrics
- **Mobile (<640px)**: Single column stacked layout

### Spacing

- **Card padding**: 32px (2rem)
- **Gap between cards**: 24px (1.5rem) - handled by parent container
- **Internal spacing**: Consistent with design system

### Color Schemes

**Classical (Blue)**:
- Border: `border-blue-500`
- Icon: `text-blue-500`
- Badge: `bg-blue-50 border-blue-200 text-blue-600`
- Metrics: `text-blue-600`

**Quantum (Violet)**:
- Border: `border-violet-500`
- Icon: `text-violet-500`
- Badge: `bg-violet-50 border-violet-200 text-violet-600`
- Metrics: `text-violet-600`

### Animations

- **Entry animation**: Fade in with upward motion (300ms)
- **Exit animation**: Fade out with downward motion (300ms)
- **Number counters**: 1000ms duration with easeOut easing
- **Details collapse**: 200ms smooth height transition

### Accessibility

- Semantic HTML with `<article>` element
- Proper ARIA labels for screen readers
- Keyboard navigation support for collapsible section
- `aria-expanded` and `aria-controls` for details toggle
- High contrast ratios for text

### Example in Dashboard

```tsx
<div className="space-y-6">
  {classicalResult && (
    <ResultCard type="classical" result={classicalResult} />
  )}
  
  {quantumResult && (
    <ResultCard type="quantum" result={quantumResult} />
  )}
</div>
```

### Requirements Satisfied

This component satisfies the following requirements from the spec:

- **2.2**: Side-by-side layout on desktop, stacked on mobile
- **5.1**: Display only top 3 metrics prominently
- **5.2**: Collapsible "View Details" section for additional metrics
- **5.3**: Large font sizes for primary metrics (48px)
- **8.1**: Visual separation with colored borders
- **11.4**: Clean, card-based layout with generous whitespace
