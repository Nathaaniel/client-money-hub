/* Formats an amount in pounds, e.g. 1450 → "£1,450" and -212 → "−£212". */
export const gbp = n => (n < 0 ? "−£" : "£") + Math.abs(Math.round(n)).toLocaleString("en-GB");

/* Placeholders still to fill are written in [square brackets]. */
export const isPlaceholder = value => typeof value === "string" && value.startsWith("[");
