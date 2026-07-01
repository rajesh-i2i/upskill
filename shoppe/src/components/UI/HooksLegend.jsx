import { HOOKS_LEGEND } from "../../data/products";
import { useTheme } from "../../context/ThemeContext";
import { getTokens } from "../../styles/tokens";

/**
 * HooksLegend
 * Displays a labelled chip for every React hook used in the app.
 * Custom hooks are highlighted in amber; built-in hooks in neutral.
 */
export default function HooksLegend() {
  const { darkMode } = useTheme();
  const t = getTokens(darkMode);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto 32px", padding: "0 24px" }}>
      <div
        style={{
          background: t.surface,
          border: `1.5px solid ${t.border}`,
          borderRadius: 14,
          padding: "18px 20px",
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: 13,
            color: t.accent,
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: 12,
          }}
        >
          React Hooks in use
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {HOOKS_LEGEND.map(({ name, tip, custom }) => (
            <span
              key={name}
              title={tip}
              style={{
                background: custom ? t.accentGoldBg : t.chipBg,
                color: custom ? t.accentGold : t.textMuted,
                border: `1px solid ${custom ? t.accentGoldBorder : t.border}`,
                borderRadius: 7,
                padding: "3px 10px",
                fontSize: 12,
                fontWeight: 600,
                cursor: "help",
              }}
            >
              {name}
            </span>
          ))}
        </div>

        <div style={{ fontSize: 11, color: t.textMuted, marginTop: 10 }}>
          ✦ Custom hooks · Hover a tag to see where it is used
        </div>
      </div>
    </div>
  );
}
