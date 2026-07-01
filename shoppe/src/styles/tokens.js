/**
 * Design tokens — single source of truth for colours, typography,
 * spacing and radius values used across the app.
 */

export const LIGHT = {
  bg: "#f7f5f0",
  surface: "#ffffff",
  surfaceAlt: "#faf9f7",
  border: "#ede9e2",
  borderInput: "#e2e0db",
  text: "#2c2a26",
  textMuted: "#a09888",
  textSub: "#7a7060",
  accent: "#8b7355",
  accentGold: "#c9913a",
  accentGoldBg: "#fdf3e3",
  accentGoldBorder: "#c9913a44",
  success: "#3a7d44",
  danger: "#e05c45",
  chipBg: "#f4f1ea",
  navBg: "#f7f5f0ee",
  cartItemBg: "#ffffff",
  dark: "#2c2a26",
};

export const DARK = {
  bg: "#1a1917",
  surface: "#25231f",
  surfaceAlt: "#25231f",
  border: "#3a3730",
  borderInput: "#3a3730",
  text: "#e8e4dc",
  textMuted: "#7a7060",
  textSub: "#7a7060",
  accent: "#8b7355",
  accentGold: "#c9913a",
  accentGoldBg: "#3a3020",
  accentGoldBorder: "#c9913a44",
  success: "#3a7d44",
  danger: "#e05c45",
  chipBg: "#2e2c28",
  navBg: "#1a1917ee",
  cartItemBg: "#2e2c28",
  dark: "#2c2a26",
};

export const getTokens = (darkMode) => (darkMode ? DARK : LIGHT);

export const RADIUS = {
  sm: 7,
  md: 10,
  lg: 12,
  xl: 16,
};

export const FONT_SIZE = {
  xs: 11,
  sm: 12,
  base: 13,
  md: 14,
  lg: 15,
  xl: 16,
  "2xl": 20,
  "3xl": 22,
};
