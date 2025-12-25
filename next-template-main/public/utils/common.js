export function commas(value, decimal = 0) {
  if (value === null || value === undefined) return "";

  return Number(value).toLocaleString("en-US", {
    minimumFractionDigits: decimal,
    maximumFractionDigits: decimal,
  });
}