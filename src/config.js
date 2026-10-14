/* ============================================================================
   SETTINGS: the first place to edit.
   ============================================================================ */
export const CONFIG = {
  bankName: "[Bank]",
  productName: "Client Money Hub",
  decision: "[Approve discovery for sectors 1–3]", // Home page: decision sought
  decisionOwner: "[Owner]",
  decisionDate: "[Date]",
  defaultSector: "lettings", // sector shown when the page opens (a key from SECTORS)
  classification: "", // your company's data classification label, e.g. "Internal". Empty hides it.
  showChangeHistory: true, // set to false before sharing with people who didn't see earlier versions
  footer: "Prototype v4 · October 2026 · Illustrative data, not legal advice."
};

/* SECTORS: the one sector vocabulary used everywhere.
   All sector-specific data in src/data uses these keys. */
export const SECTORS = [
  { key: "lettings", label: "Lettings" },
  { key: "conveyancing", label: "Conveyancing" },
  { key: "payments", label: "Payments & e-money" },
  { key: "wealth", label: "Wealth & SIPP" },
  { key: "insurance", label: "Insurance broking" },
  { key: "other", label: "Other professional firms" }
];

/* STRUCTURE: the five sections and the pages in each.
   Each page id must have a component in src/pages/index.js. */
export const STRUCTURE = [
  { key: "home", label: "Home", pages: [{ id: "home", title: "Home" }] },
  {
    key: "case",
    label: "The case",
    pages: [
      { id: "market", title: "Market" },
      { id: "segments", title: "Segments" },
      { id: "regulation", title: "Regulation" }
    ]
  },
  {
    key: "proposition",
    label: "The proposition",
    pages: [
      { id: "journey", title: "Journey" },
      { id: "selector", title: "Selector" },
      { id: "console", title: "Console" },
      { id: "integrations", title: "Integrations" },
      { id: "assurance", title: "Assurance" }
    ]
  },
  { key: "competition", label: "Competition", pages: [{ id: "scorecard", title: "Scorecard" }] },
  { key: "evidence", label: "Evidence", pages: [{ id: "sources", title: "Sources" }] }
];

export const PAGE_IDS = STRUCTURE.flatMap(group => group.pages.map(page => page.id));

export const sectorLabel = key => SECTORS.find(s => s.key === key)?.label ?? key;
