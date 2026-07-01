import { useState, useCallback, useDebugValue } from "react";

/**
 * useLocalStorage
 * Custom hook — persists state to localStorage automatically.
 * Demonstrates: useState, useCallback, useDebugValue
 *
 * @param {string} key   localStorage key
 * @param {*}      initial  Default value when nothing is stored yet
 */
export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initial;
    } catch {
      return initial;
    }
  });

  // useDebugValue — surfaces the stored value in React DevTools
  useDebugValue(value, (v) => `localStorage["${key}"] = ${JSON.stringify(v)}`);

  const set = useCallback(
    (next) => {
      const resolved = typeof next === "function" ? next(value) : next;
      setValue(resolved);
      try {
        localStorage.setItem(key, JSON.stringify(resolved));
      } catch {
        console.warn(`useLocalStorage: could not save key "${key}"`);
      }
    },
    [key, value]
  );

  return [value, set];
}
