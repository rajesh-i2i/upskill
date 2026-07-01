import { useState, useLayoutEffect } from "react";

/**
 * useWindowSize
 * Custom hook — tracks the current viewport width & height and updates
 * synchronously after layout (before paint) to prevent a flash of
 * wrong column count on first render.
 * Demonstrates: useState, useLayoutEffect
 */
export function useWindowSize() {
  const [size, setSize] = useState({
    w: window.innerWidth,
    h: window.innerHeight,
  });

  // useLayoutEffect fires synchronously after DOM mutations, before paint —
  // important here so the grid column count is already correct on first render.
  useLayoutEffect(() => {
    function onResize() {
      setSize({ w: window.innerWidth, h: window.innerHeight });
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return size;
}
