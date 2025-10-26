'use client';

import React from 'react';

export type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'error';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'md',
      dot = false,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = 'inline-flex items-center gap-1.5 font-medium rounded-full transition-all duration-200 hover:scale-105';

    // Variant styles - Using neutral backgrounds with colored borders for better contrast
    const variantStyles = {
      default: 'bg-white text-slate-700 border border-slate-300',
      primary: 'bg-white text-blue-700 border border-blue-500',
      secondary: 'bg-white text-violet-700 border border-violet-500',
      success: 'bg-white text-emerald-700 border border-emerald-500',
      error: 'bg-white text-red-700 border border-red-500',
    };

    // Size styles
    const sizeStyles = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
      lg: 'px-3 py-1.5 text-base',
    };

    // Dot styles (status indicator)
    const dotStyles = {
      default: 'bg-slate-500',
      primary: 'bg-blue-500',
      secondary: 'bg-violet-500',
      success: 'bg-emerald-500',
      error: 'bg-red-500',
    };

    const dotSizeStyles = {
      sm: 'w-1.5 h-1.5',
      md: 'w-2 h-2',
      lg: 'w-2.5 h-2.5',
    };

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    return (
      <span
        ref={ref}
        className={combinedClassName}
        role="status"
        {...props}
      >
        {dot && (
          <span
            className={`rounded-full ${dotStyles[variant]} ${dotSizeStyles[size]}`}
            aria-hidden="true"
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
