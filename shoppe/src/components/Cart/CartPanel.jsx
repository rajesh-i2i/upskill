import { useRef, useMemo, useLayoutEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";
import { getTokens } from "../../styles/tokens";
import { usePrevious } from "../../hooks";
import CartItem from "./CartItem";

/**
 * CartPanel
 * Slide-in side panel listing cart items with a checkout footer.
 *
 * Demonstrates:
 *  - useRef            — panel DOM node for animation
 *  - useMemo           — total price calculation
 *  - useLayoutEffect   — slide-in animation before first paint
 *  - usePrevious       — shows "Was $X → now $Y" delta (custom hook)
 *  - useContext        — via useCart / useTheme
 */
export default function CartPanel({ onClose }) {
  const { cart, dispatch } = useCart();
  const { darkMode } = useTheme();
  const t = getTokens(darkMode);

  // useRef — direct reference to the panel element
  const panelRef = useRef(null);

  // useMemo — recalculated only when cart changes
  const total = useMemo(
    () => cart.reduce((sum, i) => sum + i.price * i.qty, 0),
    [cart]
  );

  // usePrevious (custom) — captures total from previous render
  const prevTotal = usePrevious(total);

  // useLayoutEffect — animate panel in before paint (no flash)
  useLayoutEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateX(30px)";
    requestAnimationFrame(() => {
      if (el) {
        el.style.transition = "opacity 0.25s, transform 0.25s";
        el.style.opacity = "1";
        el.style.transform = "translateX(0)";
      }
    });
  }, []);

  return (
    /* Backdrop */
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.35)",
        zIndex: 100,
        display: "flex",
        justifyContent: "flex-end",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Panel */}
      <div
        ref={panelRef}
        style={{
          background: t.surfaceAlt,
          width: "min(420px, 100vw)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-8px 0 40px rgba(0,0,0,0.12)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "24px 24px 16px",
            borderBottom: `1.5px solid ${t.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontWeight: 800, fontSize: 20, color: t.text }}>
              Your Cart
            </div>
            <div style={{ fontSize: 13, color: t.textMuted, marginTop: 2 }}>
              {cart.length} item{cart.length !== 1 ? "s" : ""}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            style={{
              background: "none",
              border: "none",
              fontSize: 22,
              cursor: "pointer",
              color: t.textSub,
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        {/* Item list */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {cart.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                color: t.textMuted,
                marginTop: 60,
              }}
            >
              <div style={{ fontSize: 48 }}>🛒</div>
              <div style={{ marginTop: 12, fontWeight: 600 }}>
                Your cart is empty
              </div>
              <div style={{ fontSize: 13, marginTop: 4 }}>
                Add something beautiful
              </div>
            </div>
          ) : (
            cart.map((item) => <CartItem key={item.id} item={item} />)
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ padding: "16px 24px 24px", borderTop: `1.5px solid ${t.border}` }}>
            {/* usePrevious delta */}
            {prevTotal !== undefined && prevTotal !== total && (
              <div
                style={{
                  fontSize: 12,
                  color: t.accent,
                  marginBottom: 6,
                  textAlign: "right",
                }}
              >
                Was ${prevTotal} → now ${total}
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 14,
              }}
            >
              <span style={{ fontWeight: 600, color: t.textSub }}>Total</span>
              <span style={{ fontWeight: 800, fontSize: 24, color: t.text }}>
                ${total}
              </span>
            </div>

            <button
              style={{
                width: "100%",
                padding: 14,
                borderRadius: 12,
                border: "none",
                background: "#2c2a26",
                color: "#fff",
                fontWeight: 800,
                fontSize: 16,
                cursor: "pointer",
                marginBottom: 8,
              }}
              onClick={() => {
                dispatch({ type: "CLEAR" });
                onClose();
              }}
            >
              Checkout — ${total}
            </button>

            <button
              onClick={() => dispatch({ type: "CLEAR" })}
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 12,
                border: `1.5px solid ${t.border}`,
                background: "transparent",
                color: t.textSub,
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
