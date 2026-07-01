import { useTheme } from "../../context/ThemeContext";
import { getTokens } from "../../styles/tokens";

/**
 * Hero — page headline section.
 */
export default function Hero() {
  const { darkMode } = useTheme();
  const t = getTokens(darkMode);

  return (
    <div style={{ textAlign: "center", padding: "48px 24px 36px" }}>
      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: t.accent,
          textTransform: "uppercase",
          letterSpacing: 2,
          marginBottom: 12,
        }}
      >
        Curated goods for everyday life
      </div>

      <h1
        style={{
          margin: 0,
          fontSize: "clamp(32px, 6vw, 56px)",
          fontWeight: 900,
          letterSpacing: -1.5,
          color: t.text,
          lineHeight: 1.1,
        }}
      >
        Things worth
        <br />
        owning well.
      </h1>

      <p
        style={{
          color: t.textSub,
          marginTop: 16,
          fontSize: 16,
          maxWidth: 400,
          margin: "16px auto 0",
        }}
      >
        Thoughtfully chosen objects that age gracefully and earn their place.
      </p>
    </div>
  );
}
