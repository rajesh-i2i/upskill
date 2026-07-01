/**
 * StarRating
 * Renders a row of gold stars based on a numeric rating.
 */
export default function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;

  return (
    <span
      aria-label={`${rating} out of 5 stars`}
      style={{ color: "#c9913a", fontSize: 13, letterSpacing: 1 }}
    >
      {"★".repeat(full)}
      {half ? "½" : ""}
      {"☆".repeat(5 - full - (half ? 1 : 0))}
    </span>
  );
}
