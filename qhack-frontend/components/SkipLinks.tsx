'use client';

import React from 'react';

/**
 * Skip Links Component
 * Provides keyboard navigation shortcuts to main content areas
 * Meets WCAG 2.1 Level A requirement for bypass blocks
 */
export default function SkipLinks() {
  return (
    <div className="skip-links">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <a href="#navigation" className="skip-link">
        Skip to navigation
      </a>
      <a href="#footer" className="skip-link">
        Skip to footer
      </a>
    </div>
  );
}
