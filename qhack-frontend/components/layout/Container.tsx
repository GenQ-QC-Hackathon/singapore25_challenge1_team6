/**
 * Container Component
 * 
 * Provides consistent max-width constraints and responsive padding
 * for content throughout the application.
 */

import React from 'react';
import { cn } from '@/lib/utils';

export interface ContainerProps {
  /**
   * The content to be rendered inside the container
   */
  children: React.ReactNode;
  
  /**
   * Maximum width variant
   * @default '2xl'
   */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  
  /**
   * Padding size variant
   * @default 'default'
   */
  padding?: 'none' | 'sm' | 'default' | 'lg';
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * HTML element to render
   * @default 'div'
   */
  as?: 'div' | 'section' | 'article' | 'main' | 'aside';
}

const maxWidthClasses = {
  sm: 'max-w-screen-sm',      // 640px
  md: 'max-w-screen-md',      // 768px
  lg: 'max-w-screen-lg',      // 1024px
  xl: 'max-w-screen-xl',      // 1280px
  '2xl': 'max-w-[1400px]',    // 1400px (optimal readability)
  full: 'max-w-full',
};

const paddingClasses = {
  none: '',
  sm: 'px-4 sm:px-6',         // 16px mobile, 24px tablet+
  default: 'px-4 sm:px-6 lg:px-8', // 16px mobile, 24px tablet, 32px desktop
  lg: 'px-6 sm:px-8 lg:px-12', // 24px mobile, 32px tablet, 48px desktop
};

/**
 * Container component with max-width constraints and responsive padding
 */
export const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = '2xl',
  padding = 'default',
  className,
  as: Component = 'div',
}) => {
  return (
    <Component
      className={cn(
        'mx-auto w-full',
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </Component>
  );
};

Container.displayName = 'Container';

export default Container;
