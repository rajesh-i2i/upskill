/**
 * filterProducts
 * Pure utility — filters and sorts the product list.
 * Extracted to keep useMemo in App.js readable and to enable unit testing.
 *
 * @param {Array}  products  Full product list
 * @param {string} query     Search string
 * @param {string} category  Active category ("All" = no filter)
 * @param {string} sort      Sort key: "default" | "price-asc" | "price-desc" | "rating"
 */
export function filterProducts(products, query, category, sort) {
  let list = products.filter((p) => {
    const matchCat = category === "All" || p.category === category;
    const q = query.toLowerCase();
    const matchQ =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  if (sort === "price-asc") return [...list].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") return [...list].sort((a, b) => b.price - a.price);
  if (sort === "rating") return [...list].sort((a, b) => b.rating - a.rating);
  return list;
}

/**
 * getBadgeColor — maps badge label to a background colour token.
 */
export function getBadgeColor(badge) {
  if (badge === "Sale") return "#e05c45";
  if (badge === "Top Rated") return "#3a7d44";
  return "#8b7355";
}
