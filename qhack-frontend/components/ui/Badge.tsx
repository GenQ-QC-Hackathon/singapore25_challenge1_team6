'use client';

import React from 'react';

export type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
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
    const baseStyles = 'inline-flex items-center gap-1.5 font-medium rounded-full transition-colors duration-200';

    // Variant styles
    const variantStyles = {
      default: 'bg-slate-100 text-slate-700 border border-slate-200',
      primary: 'bg-blue-100 text-blue-700 border border-blue-200',
      secondary: 'bg-violet-100 text-violet-700 border border-violet-200',
      success: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
      warning: 'bg-amber-100 text-amber-700 border border-amber-200',
      error: 'bg-red-100 text-red-700 border border-red-200',
      info: 'bg-cyan-100 text-cyan-700 border border-cyan-200',
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
      warning: 'bg-amber-500',
      error: 'bg-red-500',
      info: 'bg-cyan-500',
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
