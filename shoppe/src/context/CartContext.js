import { createContext, useContext, useReducer } from "react";

/**
 * CartContext — global cart state via useReducer.
 * Provides { cart, dispatch } to any consumer via useCart().
 */
export const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const existing = state.find((i) => i.id === action.product.id);
      if (existing) {
        return state.map((i) =>
          i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...state, { ...action.product, qty: 1 }];
    }
    case "REMOVE":
      return state.filter((i) => i.id !== action.id);
    case "INCREMENT":
      return state.map((i) =>
        i.id === action.id ? { ...i, qty: i.qty + 1 } : i
      );
    case "DECREMENT":
      return state
        .map((i) => (i.id === action.id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

/**
 * CartProvider wraps the app and owns the cart useReducer.
 */
export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
