import { createContext, useContext } from "react";

/**
 * ThemeContext — provides darkMode toggle across the tree.
 * Consumed via useTheme().
 */
export const ThemeContext = createContext(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
