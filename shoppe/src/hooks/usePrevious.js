import { useRef, useEffect } from "react";

/**
 * usePrevious
 * Custom hook — captures the value from the previous render.
 * Used in CartPanel to show a "Was $X → now $Y" total delta.
 * Demonstrates: useRef, useEffect
 *
 * @param {*} value  Any value to track across renders
 * @returns The value from the previous render (undefined on first render)
 */
export function usePrevious(value) {
  const ref = useRef();

  // Runs after render — stores current value for next render's read
  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
