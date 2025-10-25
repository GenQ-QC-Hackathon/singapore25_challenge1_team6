'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { buttonPress } from '@/lib/animations';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      icon,
      children,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    // Base styles
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    // Variant styles with enhanced shadow transitions
    const variantStyles = {
      primary: 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg hover:shadow-xl hover:brightness-110 transition-all duration-200 ease-out focus-visible:ring-blue-500',
      secondary: 'bg-white text-slate-900 border-2 border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all duration-200 ease-out focus-visible:ring-slate-500',
      ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all duration-200 ease-out focus-visible:ring-slate-500',
    };

    // Size styles
    const sizeStyles = {
      sm: 'h-8 px-4 text-sm',
      md: 'h-10 px-6 text-base',
      lg: 'h-12 px-8 text-base',
      xl: 'h-14 px-10 text-lg',
    };

    // Width styles
    const widthStyles = fullWidth ? 'w-full' : '';

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`;

    return (
      <motion.div
        initial="rest"
        whileHover={!isDisabled ? "hover" : undefined}
        whileTap={!isDisabled ? "press" : undefined}
        variants={buttonPress}
        style={{ display: 'inline-block', width: fullWidth ? '100%' : 'auto' }}
      >
        <button
          ref={ref}
          className={combinedClassName}
          disabled={isDisabled}
          aria-busy={loading}
          aria-disabled={isDisabled}
          {...props}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
              <span>Loading...</span>
            </>
          ) : (
            <>
              {icon && <span aria-hidden="true">{icon}</span>}
              {children}
            </>
          )}
        </button>
      </motion.div>
    );
  }
);

Button.displayName = 'Button';

export default Button;
