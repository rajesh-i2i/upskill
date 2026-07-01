import {
  useState,
  useEffect,
  useMemo,
  useRef,
  useTransition,
  useDeferredValue,
} from "react";

// Context
import { ThemeContext } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";

// Layout
import Navbar from "./components/Layout/Navbar";
import Hero from "./components/Layout/Hero";

// UI
import HooksLegend from "./components/UI/HooksLegend";

// Filters
import FilterBar from "./components/Filters/FilterBar";

// Products
import ProductGrid from "./components/Products/ProductGrid";

// Cart
import CartPanel from "./components/Cart/CartPanel";

// Data & utils
import { ALL_PRODUCTS } from "./data/products";
import { filterProducts } from "./utils/filterProducts";

// Custom hooks
import { useLocalStorage, useDebounce } from "./hooks";

/**
 * App — root component.
 *
 * Built-in hooks used here:
 *  useState        — query, category, sort, showCart
 *  useEffect       — ⌘K keyboard shortcut, page title
 *  useMemo         — filtered product list
 *  useRef          — imperative search focus
 *  useTransition   — non-urgent category switching
 *  useDeferredValue — defers search query during render
 *
 * Custom hooks used here:
 *  useLocalStorage — persist dark mode
 *  useDebounce     — 280ms search delay
 *
 * (useReducer lives in CartContext; useContext/useCallback/useLayoutEffect/
 *  useImperativeHandle/useId/useRef/useDebugValue live in child components)
 */
export default function App() {
  // ── Filter state ──────────────────────────────────────────────────────────
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  // ── Cart panel visibility ─────────────────────────────────────────────────
  const [showCart, setShowCart] = useState(false);

  // ── Custom: persist dark mode to localStorage ─────────────────────────────
  const [darkMode, setDarkMode] = useLocalStorage("shoppe_darkmode", false);

  // ── Custom: debounce search query (280ms) ─────────────────────────────────
  const debouncedQuery = useDebounce(query, 280);

  // ── useDeferredValue — defer heavy filter during concurrent renders ────────
  const deferredQuery = useDeferredValue(debouncedQuery);

  // ── useTransition — marks category change as non-urgent ──────────────────
  const [isPending, startTransition] = useTransition();

  // ── useRef — imperative handle for SearchInput (forwardRef) ───────────────
  const searchRef = useRef(null);

  // ── useMemo — filter + sort only when deps change ────────────────────────
  const filteredProducts = useMemo(
    () => filterProducts(ALL_PRODUCTS, deferredQuery, category, sort),
    [deferredQuery, category, sort]
  );

  // ── useEffect — global keyboard shortcut ⌘K / Ctrl+K ─────────────────────
  useEffect(() => {
    function onKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // ── useEffect — dynamic page title reflects cart badge ────────────────────
  // (cart item count is read from CartContext inside Navbar; we rely on the
  //  document title being updated by a child via a separate effect in Navbar)

  // ── Category change via useTransition ─────────────────────────────────────
  function handleCategoryChange(val) {
    startTransition(() => setCategory(val));
  }

  return (
    // ThemeContext — provides darkMode + setter to entire tree
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {/* CartProvider — owns useReducer cart state */}
      <CartProvider>
        <div
          style={{
            minHeight: "100vh",
            background: darkMode ? "#1a1917" : "#f7f5f0",
            color: darkMode ? "#e8e4dc" : "#2c2a26",
            transition: "background 0.3s",
          }}
        >
          <Navbar onOpenCart={() => setShowCart(true)} />

          <Hero />

          {/* <HooksLegend /> */}

          <FilterBar
            query={query}
            onQueryChange={setQuery}
            category={category}
            onCategoryChange={handleCategoryChange}
            sort={sort}
            onSortChange={setSort}
            isPending={isPending}
            isDebouncing={debouncedQuery !== query}
            resultCount={filteredProducts.length}
            searchRef={searchRef}
          />

          <ProductGrid products={filteredProducts} isPending={isPending} />

          {showCart && <CartPanel onClose={() => setShowCart(false)} />}
        </div>
      </CartProvider>
    </ThemeContext.Provider>
  );
}
