import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Generate random data for charts
export const generateRandomData = (points: number, min: number, max: number) => {
  return Array.from({ length: points }, () =>
    Math.floor(Math.random() * (max - min + 1)) + min
  );
};

// Format large numbers
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2) + 'K';
  }
  return num.toFixed(2);
};

// Format currency
export const formatCurrency = (num: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};

// Format percentage
export const formatPercentage = (num: number): string => {
  return (num * 100).toFixed(2) + '%';
};

// Simulate quantum computation delay
export const simulateQuantumDelay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
