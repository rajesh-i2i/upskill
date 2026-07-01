import { useCallback } from "react";
import ProductCard from "./ProductCard";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";
import { getTokens } from "../../styles/tokens";
import { useWindowSize } from "../../hooks";

/**
 * ProductGrid
 * Demonstrates: useCallback (stable dispatch wrapper), useContext (via useCart),
 * useWindowSize custom hook (responsive columns)
 */
export default function ProductGrid({ products, isPending }) {
  const { dispatch } = useCart();
  const { darkMode } = useTheme();
  const t = getTokens(darkMode);

  // useWindowSize (custom) — drives responsive column count
  const { w } = useWindowSize();
  const cols = w > 1100 ? 4 : w > 720 ? 3 : w > 480 ? 2 : 1;

  // useCallback — stable add handler passed to each ProductCard
  const handleAdd = useCallback(
    (product) => dispatch({ type: "ADD", product }),
    [dispatch]
  );

  return (
    <div
      style={{
        maxWidth: 1240,
        margin: "0 auto",
        padding: "8px clamp(16px, 4vw, 40px) 60px",
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: 20,
        opacity: isPending ? 0.6 : 1,
        transition: "opacity 0.2s",
      }}
    >
      {products.length === 0 ? (
        <div
          style={{
            gridColumn: "1 / -1",
            textAlign: "center",
            padding: "60px 0",
            color: t.textMuted,
          }}
        >
          <div style={{ fontSize: 40 }}>🔍</div>
          <div style={{ fontWeight: 700, marginTop: 12 }}>No products found</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>
            Try a different search or category
          </div>
        </div>
      ) : (
        products.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={handleAdd} />
        ))
      )}
    </div>
  );
}
