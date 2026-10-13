// Formats a numeric value into an Egyptian Pound currency string.
export function formatEGP(value?: number): string {
  return `${(value ?? 0).toLocaleString("en-US")} EGP`
}
