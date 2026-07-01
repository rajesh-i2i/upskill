import { useId } from "react";
import SearchInput from "../UI/SearchInput";
import { CATEGORIES, SORT_OPTIONS } from "../../data/products";
import { useTheme } from "../../context/ThemeContext";
import { getTokens } from "../../styles/tokens";

/**
 * FilterBar
 * Demonstrates: useId (accessible label ids), useTransition (passed as prop),
 * useContext (via useTheme), forwardRef on SearchInput
 *
 * @param {object}   props
 * @param {string}   props.query         Current search string
 * @param {Function} props.onQueryChange
 * @param {string}   props.category      Active category
 * @param {Function} props.onCategoryChange
 * @param {string}   props.sort          Active sort key
 * @param {Function} props.onSortChange
 * @param {boolean}  props.isPending     useTransition pending state
 * @param {boolean}  props.isDebouncing  Whether debounce is in flight
 * @param {number}   props.resultCount   Number of filtered products
 * @param {object}   props.searchRef     Forwarded ref for SearchInput
 */
export default function FilterBar({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  sort,
  onSortChange,
  isPending,
  isDebouncing,
  resultCount,
  searchRef,
}) {
  const { darkMode } = useTheme();
  const t = getTokens(darkMode);

  // useId — stable unique IDs for accessible label/input pairs
  const catId = useId();
  const sortId = useId();

  const selectStyle = {
    padding: "9px 14px",
    borderRadius: 10,
    border: `1.5px solid ${t.border}`,
    background: t.surfaceAlt,
    color: t.text,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    outline: "none",
  };

  const srOnly = {
    position: "absolute",
    width: 1,
    height: 1,
    overflow: "hidden",
    opacity: 0,
  };

  return (
    <div
      style={{
        maxWidth: 1240,
        margin: "0 auto",
        padding: "0 clamp(16px, 4vw, 40px) 24px",
      }}
    >
      {/* Controls row */}
      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {/* Search — SearchInput uses forwardRef + useImperativeHandle */}
        <SearchInput ref={searchRef} value={query} onChange={onQueryChange} />

        {/* Category — change triggers useTransition in parent */}
        <div>
          <label htmlFor={catId} style={srOnly}>
            Category
          </label>
          <select
            id={catId}
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            style={selectStyle}
          >
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div>
          <label htmlFor={sortId} style={srOnly}>
            Sort by
          </label>
          <select
            id={sortId}
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            style={selectStyle}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear */}
        {(query || category !== "All") && (
          <button
            onClick={() => {
              onQueryChange("");
              onCategoryChange("All");
              searchRef.current?.focus();
            }}
            style={{
              background: "none",
              border: `1.5px solid ${t.border}`,
              borderRadius: 8,
              padding: "9px 14px",
              cursor: "pointer",
              fontSize: 13,
              color: t.textMuted,
              fontWeight: 600,
            }}
          >
            Clear ✕
          </button>
        )}
      </div>

      {/* Results count */}
      <div
        style={{
          marginTop: 16,
          fontSize: 13,
          color: t.textMuted,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span>
          {isPending
            ? "Filtering…"
            : `${resultCount} product${resultCount !== 1 ? "s" : ""}`}
        </span>
        {isDebouncing && (
          <span style={{ fontSize: 11, color: "#c9913a" }}>⏱ debouncing…</span>
        )}
      </div>
    </div>
  );
}
