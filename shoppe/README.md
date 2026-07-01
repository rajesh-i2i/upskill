# 🛍 Shoppe — E-commerce React App

A fully structured React e-commerce application demonstrating **every built-in React hook** plus four custom hooks, organised into a production-style folder structure.

---

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm start

# Build for production
npm run build
```

Requires **Node 16+** and **npm 7+**.

---

## Project Structure

```
shoppe/
├── public/
│   └── index.html
├── src/
│   ├── App.js                        # Root component — wires all hooks
│   ├── index.js                      # ReactDOM entry point
│   │
│   ├── context/
│   │   ├── CartContext.js            # useReducer cart + CartProvider
│   │   └── ThemeContext.js           # darkMode context
│   │
│   ├── hooks/                        # Custom hooks
│   │   ├── useLocalStorage.js        # Persist state to localStorage
│   │   ├── useDebounce.js            # Delay value updates
│   │   ├── useWindowSize.js          # Reactive viewport dimensions
│   │   ├── usePrevious.js            # Track previous render value
│   │   └── index.js                  # Barrel export
│   │
│   ├── data/
│   │   └── products.js               # Mock catalogue + constants
│   │
│   ├── utils/
│   │   └── filterProducts.js         # Pure filter/sort + badge helper
│   │
│   ├── styles/
│   │   ├── global.css                # Reset, scrollbar, focus styles
│   │   └── tokens.js                 # Design tokens (light/dark palettes)
│   │
│   └── components/
│       ├── Layout/
│       │   ├── Navbar.jsx            # useMemo (item count), useContext
│       │   └── Hero.jsx              # useContext (theme)
│       │
│       ├── UI/
│       │   ├── SearchInput.jsx       # forwardRef, useRef, useId, useImperativeHandle
│       │   ├── StarRating.jsx        # Pure presentational
│       │   └── HooksLegend.jsx       # Chip list of all hooks in use
│       │
│       ├── Filters/
│       │   └── FilterBar.jsx         # useId, useContext, forwardRef (SearchInput)
│       │
│       ├── Products/
│       │   ├── ProductCard.jsx       # useState, useCallback, useLayoutEffect, useRef, useContext
│       │   └── ProductGrid.jsx       # useCallback, useContext, useWindowSize
│       │
│       └── Cart/
│           ├── CartPanel.jsx         # useRef, useMemo, useLayoutEffect, usePrevious, useContext
│           └── CartItem.jsx          # useContext
│
├── package.json
└── README.md
```

---

## React Hooks Coverage

### Built-in (all 13)

| Hook | Location | Purpose |
|---|---|---|
| `useState` | `App.js`, `ProductCard` | Query, category, sort, flash state |
| `useEffect` | `App.js`, `useDebounce` | ⌘K shortcut, debounce timer |
| `useContext` | All components | Cart + Theme access via `useCart` / `useTheme` |
| `useReducer` | `CartContext.js` | Cart state machine (add / remove / qty / clear) |
| `useCallback` | `ProductGrid`, `ProductCard`, `useLocalStorage` | Stable function references |
| `useMemo` | `App.js`, `Navbar`, `CartPanel` | Filtered list, item count, total |
| `useRef` | `SearchInput`, `ProductCard`, `CartPanel` | DOM refs for animation |
| `useLayoutEffect` | `ProductCard`, `CartPanel`, `useWindowSize` | Synchronous post-DOM animations |
| `useImperativeHandle` | `SearchInput` | Exposes `.focus()` / `.clear()` |
| `useId` | `SearchInput`, `FilterBar` | Accessible label/input IDs |
| `useTransition` | `App.js` | Non-urgent category switching |
| `useDeferredValue` | `App.js` | Defers search query during render |
| `useDebugValue` | `useLocalStorage`, `useDebounce` | DevTools labelling |

### Custom (4)

| Hook | File | Demonstrates |
|---|---|---|
| `useLocalStorage` | `hooks/useLocalStorage.js` | `useState`, `useCallback`, `useDebugValue` |
| `useDebounce` | `hooks/useDebounce.js` | `useState`, `useEffect`, `useDebugValue` |
| `useWindowSize` | `hooks/useWindowSize.js` | `useState`, `useLayoutEffect` |
| `usePrevious` | `hooks/usePrevious.js` | `useRef`, `useEffect` |

---

## Features

- 🛒 Full cart — add, remove, increment, decrement, clear
- 🔍 Live search with 280ms debounce
- 🗂 Category filtering via `useTransition` (non-blocking)
- ↕️ Sort by price or rating
- 🌙 Dark mode, persisted to `localStorage`
- 📐 Responsive 1–4 column grid via `useWindowSize`
- ♿ Accessible labels, keyboard navigation, focus styles
- 🎞 Micro-animations: card hover, button pulse, panel slide-in
