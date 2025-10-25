'use client';

import React, { useEffect, useRef, useState } from 'react';
import { durations, easings } from '@/lib/animations';

export interface AnimatedNumberProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  decimalSeparator?: string;
  useGrouping?: boolean;
  animateOnMount?: boolean;
}

const AnimatedNumber = React.forwardRef<HTMLSpanElement, AnimatedNumberProps>(
  (
    {
      value,
      duration = durations.slowest,
      decimals = 0,
      prefix = '',
      suffix = '',
      separator = ',',
      decimalSeparator = '.',
      useGrouping = true,
      animateOnMount = true,
      className = '',
      ...props
    },
    ref
  ) => {
    const [displayValue, setDisplayValue] = useState(animateOnMount ? 0 : value);
    const animationFrameRef = useRef<number>();
    const startTimeRef = useRef<number>();
    const startValueRef = useRef<number>(displayValue);

    // Easing function (easeOut)
    const easeOut = (t: number): number => {
      return 1 - Math.pow(1 - t, 3);
    };

    // Format number with separators
    const formatNumber = (num: number): string => {
      const fixedNum = num.toFixed(decimals);
      const [integerPart, decimalPart] = fixedNum.split('.');

      let formattedInteger = integerPart;
      if (useGrouping) {
        formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
      }

      if (decimals > 0 && decimalPart) {
        return `${formattedInteger}${decimalSeparator}${decimalPart}`;
      }

      return formattedInteger;
    };

    // Animation function
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOut(progress);

      const currentValue = startValueRef.current + (value - startValueRef.current) * easedProgress;
      setDisplayValue(currentValue);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    useEffect(() => {
      // Cancel any ongoing animation
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Reset start time and start value
      startTimeRef.current = undefined;
      startValueRef.current = displayValue;

      // Start animation
      animationFrameRef.current = requestAnimationFrame(animate);

      // Cleanup
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [value, duration]);

    return (
      <span
        ref={ref}
        className={className}
        aria-live="polite"
        aria-atomic="true"
        {...props}
      >
        {prefix}
        {formatNumber(displayValue)}
        {suffix}
      </span>
    );
  }
);

AnimatedNumber.displayName = 'AnimatedNumber';

export default AnimatedNumber;
