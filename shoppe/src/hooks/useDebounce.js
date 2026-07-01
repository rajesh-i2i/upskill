import { useState, useEffect, useDebugValue } from "react";

/**
 * useDebounce
 * Custom hook — delays updating the returned value until `delay` ms
 * after the last change. Prevents excessive filtering on every keystroke.
 * Demonstrates: useState, useEffect, useDebugValue
 *
 * @param {*}      value  The value to debounce
 * @param {number} delay  Milliseconds to wait (default 300)
 */
export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer); // cleanup on each change
  }, [value, delay]);

  // useDebugValue — shows current debounced value in React DevTools
  useDebugValue(debounced, (v) => `debounced: "${v}"`);

  return debounced;
}
