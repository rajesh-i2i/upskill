import { useState, useCallback, useLayoutEffect, useRef } from "react";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";
import { getTokens } from "../../styles/tokens";
import { getBadgeColor } from "../../utils/filterProducts";
import StarRating from "../UI/StarRating";

/**
 * ProductCard
 * Demonstrates: useState (added flash), useCallback (stable handler),
 * useLayoutEffect (button pulse animation), useRef (button DOM node),
 * useContext (via useCart / useTheme)
 */
export default function ProductCard({ product, onAdd }) {
  const { cart } = useCart();
  const { darkMode } = useTheme();
  const t = getTokens(darkMode);

  const inCart = cart.find((i) => i.id === product.id);

  // useState — tracks "just added" flash state
  const [added, setAdded] = useState(false);

  // useRef — direct reference to the button DOM node for animation
  const btnRef = useRef(null);

  // useCallback — stable reference, avoids re-creating on every render
  const handleAdd = useCallback(() => {
    onAdd(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }, [product, onAdd]);

  // useLayoutEffect — fires synchronously after DOM update, before paint,
  // so the scale-down is visible even for very fast state changes.
  useLayoutEffect(() => {
    if (!added || !btnRef.current) return;
    btnRef.current.style.transform = "scale(0.95)";
    const t = setTimeout(() => {
      if (btnRef.current) btnRef.current.style.transform = "scale(1)";
    }, 150);
    return () => clearTimeout(t);
  }, [added]);

  return (
    <div
      style={{
        background: t.surface,
        borderRadius: 16,
        border: `1.5px solid ${t.border}`,
        padding: "22px 20px 18px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        position: "relative",
        transition: "box-shadow 0.2s, transform 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(60,40,10,0.10)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "none";
      }}
    >
      {/* Badge */}
      {product.badge && (
        <span
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            background: getBadgeColor(product.badge),
            color: "#fff",
            fontSize: 11,
            fontWeight: 700,
            borderRadius: 6,
            padding: "2px 8px",
            letterSpacing: 0.5,
            textTransform: "uppercase",
          }}
        >
          {product.badge}
        </span>
      )}

      {/* Emoji icon */}
      <div
        style={{
          fontSize: 44,
          lineHeight: 1.1,
          textAlign: "center",
          marginBottom: 4,
        }}
      >
        {product.emoji}
      </div>

      {/* Name & category */}
      <div>
        <div
          style={{
            fontSize: 11,
            color: t.textMuted,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: 2,
          }}
        >
          {product.category}
        </div>
        <div
          style={{
            fontWeight: 700,
            fontSize: 16,
            color: t.text,
            lineHeight: 1.25,
          }}
        >
          {product.name}
        </div>
      </div>

      {/* Description */}
      <div style={{ fontSize: 13, color: t.textSub, lineHeight: 1.5 }}>
        {product.desc}
      </div>

      {/* Rating */}
      <div
        style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}
      >
        <StarRating rating={product.rating} />
        <span style={{ fontSize: 12, color: t.textMuted }}>
          {product.rating} ({product.reviews})
        </span>
      </div>

      {/* Price + Add button */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 6,
        }}
      >
        <span
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: t.text,
            letterSpacing: -0.5,
          }}
        >
          ${product.price}
        </span>

        <button
          ref={btnRef}
          onClick={handleAdd}
          style={{
            padding: "8px 18px",
            borderRadius: 10,
            border: "none",
            background: added ? "#3a7d44" : inCart ? t.chipBg : "#2c2a26",
            color: added ? "#fff" : inCart ? t.accent : "#fff",
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
            transition: "background 0.25s, transform 0.15s",
          }}
        >
          {added ? "✓ Added!" : inCart ? `In cart (${inCart.qty})` : "Add to cart"}
        </button>
      </div>
    </div>
  );
}
