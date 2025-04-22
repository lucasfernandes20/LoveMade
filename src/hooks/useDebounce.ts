import { useState, useEffect } from 'react';

/**
 * Hook for debounce values
 * Useful to limit the number of API calls during typing
 */
export function useDebounce<T>(value: T, delay: number): [T, boolean] {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [isDebouncing, setIsDebouncing] = useState(false);

  useEffect(() => {
    // Update the debounced value after the delay
    setIsDebouncing(true);
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      setIsDebouncing(false);
    }, delay);

    // Cancel the timer if the value changes (or the component is unmounted)
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return [debouncedValue, isDebouncing];
} 