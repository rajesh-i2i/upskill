import { forwardRef, useRef, useId, useImperativeHandle } from "react";

/**
 * SearchInput
 * Demonstrates: forwardRef, useRef, useId, useImperativeHandle
 *
 * Exposes an imperative API ({ focus, clear }) via ref so the parent
 * (App.js) can call searchRef.current.focus() on ⌘K.
 */
const SearchInput = forwardRef(function SearchInput({ value, onChange }, ref) {
  const inputRef = useRef(null);

  // useId — generates a stable, unique id for the label↔input association
  const inputId = useId();

  // useImperativeHandle — selectively exposes methods on the forwarded ref
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => onChange(""),
  }));

  return (
    <div style={{ position: "relative", flexGrow: 1, minWidth: 200 }}>
      {/* Visually hidden label for accessibility */}
      <label
        htmlFor={inputId}
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          opacity: 0,
        }}
      >
        Search products
      </label>

      <span
        style={{
          position: "absolute",
          left: 14,
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: 16,
          pointerEvents: "none",
        }}
      >
        🔍
      </span>

      <input
        id={inputId}
        ref={inputRef}
        type="text"
        placeholder="Search products… (⌘K)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "10px 14px 10px 40px",
          borderRadius: 10,
          border: "1.5px solid #e2e0db",
          background: "#faf9f7",
          fontSize: 15,
          outline: "none",
          color: "#2c2a26",
          transition: "border-color 0.2s",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#8b7355")}
        onBlur={(e) => (e.target.style.borderColor = "#e2e0db")}
      />
    </div>
  );
});

export default SearchInput;
