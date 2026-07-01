import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";
import { getTokens } from "../../styles/tokens";

const qtyBtnBase = {
  width: 28,
  height: 28,
  borderRadius: 7,
  border: "1.5px solid #e2e0db",
  background: "#f4f1ea",
  color: "#2c2a26",
  fontWeight: 700,
  fontSize: 14,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  lineHeight: 1,
};

/**
 * CartItem
 * Single line-item inside the CartPanel.
 * Demonstrates: useContext (via useCart / useTheme)
 */
export default function CartItem({ item }) {
  const { dispatch } = useCart();
  const { darkMode } = useTheme();
  const t = getTokens(darkMode);

  return (
    <div
      style={{
        background: t.cartItemBg,
        borderRadius: 12,
        border: `1.5px solid ${t.border}`,
        padding: "14px 16px",
        display: "flex",
        gap: 14,
        alignItems: "center",
      }}
    >
      <span style={{ fontSize: 30 }}>{item.emoji}</span>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontWeight: 700,
            fontSize: 14,
            color: t.text,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.name}
        </div>
        <div style={{ fontSize: 13, color: t.textMuted, marginTop: 1 }}>
          ${item.price} × {item.qty} ={" "}
          <strong style={{ color: t.text }}>${item.price * item.qty}</strong>
        </div>

        {/* Quantity controls */}
        <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
          <button
            style={qtyBtnBase}
            onClick={() => dispatch({ type: "DECREMENT", id: item.id })}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span
            style={{
              minWidth: 24,
              textAlign: "center",
              fontWeight: 700,
              fontSize: 14,
              color: t.text,
              lineHeight: "28px",
            }}
          >
            {item.qty}
          </span>
          <button
            style={qtyBtnBase}
            onClick={() => dispatch({ type: "INCREMENT", id: item.id })}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Remove */}
      <button
        onClick={() => dispatch({ type: "REMOVE", id: item.id })}
        aria-label={`Remove ${item.name}`}
        style={{
          background: "none",
          border: "none",
          color: "#c9816a",
          fontSize: 18,
          cursor: "pointer",
          padding: 4,
        }}
      >
        🗑
      </button>
    </div>
  );
}
