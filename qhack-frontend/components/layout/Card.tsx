/**
 * Card Component
 * 
 * Provides a polished card container with shadow system,
 * hover effects, and multiple variants.
 */

import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps {
  /**
   * The content to be rendered inside the card
   */
  children: React.ReactNode;
  
  /**
   * Card variant style
   * @default 'default'
   */
  variant?: 'default' | 'bordered' | 'elevated' | 'flat' | 'gradient';
  
  /**
   * Padding size
   * @default 'default'
   */
  padding?: 'none' | 'sm' | 'default' | 'lg';
  
  /**
   * Enable hover effects
   * @default false
   */
  hoverable?: boolean;
  
  /**
   * Enable clickable cursor
   * @default false
   */
  clickable?: boolean;
  
  /**
   * Border accent color (left border)
   */
  accentColor?: 'none' | 'blue' | 'violet' | 'cyan' | 'emerald';
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * HTML element to render
   * @default 'div'
   */
  as?: 'div' | 'article' | 'section';
  
  /**
   * Click handler
   */
  onClick?: () => void;
}

const variantClasses = {
  default: 'bg-white border border-slate-200 shadow-md',
  bordered: 'bg-white border-2 border-slate-200',
  elevated: 'bg-white shadow-lg',
  flat: 'bg-slate-50 border border-slate-100',
  gradient: 'bg-gradient-to-br from-white to-slate-50 border border-slate-200 shadow-md',
};

const paddingClasses = {
  none: '',
  sm: 'p-4',          // 16px
  default: 'p-6',     // 24px
  lg: 'p-8',          // 32px
};

const hoverClasses = {
  default: 'transition-all duration-200 hover:shadow-xl hover:-translate-y-1',
  bordered: 'transition-all duration-200 hover:border-slate-300 hover:-translate-y-1',
  elevated: 'transition-all duration-200 hover:shadow-2xl hover:-translate-y-1',
  flat: 'transition-all duration-200 hover:bg-slate-100 hover:-translate-y-1',
  gradient: 'transition-all duration-200 hover:shadow-xl hover:-translate-y-1',
};

const accentColorClasses = {
  none: '',
  blue: 'border-l-4 border-l-blue-500',
  violet: 'border-l-4 border-l-violet-500',
  cyan: 'border-l-4 border-l-cyan-500',
  emerald: 'border-l-4 border-l-emerald-500',
};

/**
 * Card component with shadow system, hover effects, and variants
 */
export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'default',
  hoverable = false,
  clickable = false,
  accentColor = 'none',
  className,
  as: Component = 'div',
  onClick,
}) => {
  return (
    <Component
      onClick={onClick}
      className={cn(
        'rounded-xl',
        variantClasses[variant],
        paddingClasses[padding],
        hoverable && hoverClasses[variant],
        clickable && 'cursor-pointer',
        accentColorClasses[accentColor],
        className
      )}
    >
      {children}
    </Component>
  );
};

Card.displayName = 'Card';

export default Card;
