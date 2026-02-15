const invertHexColor = (hex: string) => {
  const h = hex.replace("#", "");
  if (h.length !== 6) return hex; // fallback
  const r = 255 - parseInt(h.slice(0, 2), 16);
  const g = 255 - parseInt(h.slice(2, 4), 16);
  const b = 255 - parseInt(h.slice(4, 6), 16);
  return "#" + [r, g, b].map(v => v.toString(16).padStart(2, "0")).join("");
};
export default invertHexColor;