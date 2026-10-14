/* ============================================================================
   SETTINGS: the first place to edit.
   ============================================================================ */
export const CONFIG = {
  bankName: "[Bank]",
  productName: "Account selector",
  defaultSector: "lettings", // example firm shown when the page opens (a key from SECTORS)
  classification: "", // your company's data classification label, e.g. "Internal". Empty hides it.
  footer: "Prototype · October 2026 · Illustrative logic, not legal advice."
};

/* SECTORS: the example firms the prototype controls can fill in.
   Sector data in src/data/selector.js uses these keys. */
export const SECTORS = [
  { key: "lettings", label: "Lettings" },
  { key: "conveyancing", label: "Conveyancing" },
  { key: "payments", label: "Payments & e-money" },
  { key: "wealth", label: "Wealth & SIPP" },
  { key: "insurance", label: "Insurance broking" },
  { key: "other", label: "Other professional firms" }
];

export const sectorLabel = key => SECTORS.find(s => s.key === key)?.label ?? key;
