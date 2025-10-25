/**
 * Section Component
 * 
 * Provides consistent vertical spacing between major sections
 * of the application.
 */

import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps {
  /**
   * The content to be rendered inside the section
   */
  children: React.ReactNode;
  
  /**
   * Vertical spacing size
   * @default 'default'
   */
  spacing?: 'none' | 'sm' | 'default' | 'lg' | 'xl';
  
  /**
   * Background color variant
   * @default 'transparent'
   */
  background?: 'transparent' | 'primary' | 'secondary' | 'tertiary';
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * HTML element to render
   * @default 'section'
   */
  as?: 'div' | 'section' | 'article' | 'main' | 'aside';
  
  /**
   * Optional ID for anchor links
   */
  id?: string;
}

const spacingClasses = {
  none: '',
  sm: 'py-8 sm:py-12',        // 32px mobile, 48px tablet+
  default: 'py-12 sm:py-16 lg:py-20', // 48px mobile, 64px tablet, 80px desktop
  lg: 'py-16 sm:py-20 lg:py-24', // 64px mobile, 80px tablet, 96px desktop
  xl: 'py-20 sm:py-24 lg:py-32', // 80px mobile, 96px tablet, 128px desktop
};

const backgroundClasses = {
  transparent: 'bg-transparent',
  primary: 'bg-white',
  secondary: 'bg-slate-50',
  tertiary: 'bg-slate-100',
};

/**
 * Section component with consistent vertical spacing
 */
export const Section: React.FC<SectionProps> = ({
  children,
  spacing = 'default',
  background = 'transparent',
  className,
  as: Component = 'section',
  id,
}) => {
  return (
    <Component
      id={id}
      className={cn(
        'w-full',
        spacingClasses[spacing],
        backgroundClasses[background],
        className
      )}
    >
      {children}
    </Component>
  );
};

Section.displayName = 'Section';

export default Section;
