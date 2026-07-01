import { useMemo } from "react";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";
import { getTokens } from "../../styles/tokens";

/**
 * Navbar
 * Demonstrates: useMemo (cart item count), useContext (via useCart/useTheme)
 */
export default function Navbar({ onOpenCart }) {
  const { cart, dispatch } = useCart();
  const { darkMode, setDarkMode } = useTheme();
  const t = getTokens(darkMode);

  // useMemo — recomputed only when cart changes
  const totalItems = useMemo(
    () => cart.reduce((sum, i) => sum + i.qty, 0),
    [cart]
  );

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: t.navBg,
        backdropFilter: "blur(14px)",
        borderBottom: `1.5px solid ${t.border}`,
        padding: "0 clamp(16px, 5vw, 60px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 62,
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontWeight: 900,
          fontSize: 22,
          letterSpacing: -0.5,
          color: t.text,
        }}
      >
        🛍 Shoppe
      </div>

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Dark mode toggle */}
        <button
          onClick={() => setDarkMode((d) => !d)}
          title="Toggle theme"
          style={{
            background: "none",
            border: `1.5px solid ${t.border}`,
            borderRadius: 8,
            padding: "6px 10px",
            cursor: "pointer",
            fontSize: 16,
            color: t.text,
          }}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {/* Cart button */}
        <button
          onClick={onOpenCart}
          style={{
            background: "#2c2a26",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: "8px 18px",
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          🛒 Cart
          {totalItems > 0 && (
            <span
              style={{
                background: "#c9913a",
                color: "#fff",
                borderRadius: "50%",
                width: 20,
                height: 20,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 800,
              }}
            >
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
