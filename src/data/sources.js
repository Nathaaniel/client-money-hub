/* SOURCES page content (section: Evidence). Internal details are in src/data/internal.js. */
export const SOURCES_HEAD = {
  eyebrow: "Evidence",
  title: "Sources, caveats and validation",
  keyMessage: "Most market evidence is public and recent, but provider figures are their own claims and the scores are judgement.",
  intro: "What this is built on, how reliable it is, and what to check against internal data before wider use."
};

/* Change history. Hidden when CONFIG.showChangeHistory is false. */
export const CHANGES = [
  { title: "Version 4 · rebuild", items: [
    "Rebuilt as a Node.js and React project that builds to the same single offline HTML file.",
    "Content moved into data files, with tests that check every sector's data and ledger maths.",
    "Settings added for a data classification label and for hiding this change history."
  ] },
  { title: "Version 3 · structure", items: [
    "Ten tabs regrouped into five sections: Home, The case, The proposition, Competition, Evidence.",
    "One sector selector in the header drives the segment profile, journey, selector preset, console, integrations, assurance and scorecard weighting.",
    "New Home page with the decision sought, where to play and a competitor heatmap.",
    "New Journey page: a service blueprint across the eight stages.",
    "One sector vocabulary: the eight segments group under six sectors, adding “Other professional firms”.",
    "Each page opens with a key message; long Market tables are collapsed.",
    "Confirmed the pooled-account AML changes (in force 30 June 2026) and added the 90-day account closure rule (28 April 2026)."
  ] },
  { title: "Version 2 · content", items: [
    "Payment and e-money firms (CASS 15) added as a sector.",
    "Third-party managed accounts (Shieldpay, PEXA) added as competitor and partner.",
    "Cynergy, Allica and Starling Banking Services added to the scorecard.",
    "Selector gained a register-check stop rule, the ICAEW and CASS 15 regimes, a TPMA route, new FSCS limits and an ILCA note.",
    "Corrections: Griffin eligibility and FSCS limits."
  ] }
];

export const CAVEATS = [
  "Rates are as published around 2026 and change often. Barclays, HSBC, Lloyds and Metro rates weren't captured.",
  "Vendor and provider figures (ClearBank, Griffin, Shieldpay, PayProp) are unaudited company claims.",
  "Much letting-agent evidence comes from vendors with a commercial interest in showing banks are failing.",
  "CMA satisfaction scores measure business current accounts, not client accounts.",
  "ILCA is a proposal; rates and scope may change.",
  "SRA and LSB details come partly from secondary reporting (Legal Futures and others).",
  "Scorecard scores, vendor roles and integration points are judgements, not confirmed capabilities.",
  "Segment needs and journeys are hypotheses. Test with 8–12 customer interviews per segment.",
  "Axiom Ince criminal charges are unproven; the trial is due in February 2027.",
  "Selector logic is illustrative and not legal advice."
];

// [type, sources]
export const SOURCE_LIST = [
  ["Regulators and government", "FCA PS25/12 and press release (Aug 2025); FCA Final Notice, Barclays (Jul 2025); FCA CASS sourcebook (CASS 5, 7, 15); Money Laundering and Terrorist Financing (Amendment) Regulations 2026 (SI 2026/621); Payment Services and Payment Accounts (Contract Termination) (Amendment) Regulations 2025; SRA Accounts Rules and 2026 reform decision; MoJ ILCA consultation (CP 1472); FSCS deposit limit announcement; CMA business banking service quality survey (Aug 2026); Treasury Committee evidence (Mar 2024); Westminster Hall debate (Oct 2023)"],
  ["Professional bodies", "Law Society practice note on client money and FSCS (2025); Law Society statements on ILCA and TPMAs; Propertymark; ICAEW Clients' Money Regulations"],
  ["Providers", "Product pages for Barclays, NatWest, Lloyds / Bank of Scotland, HSBC UK, Virgin Money, Metro, Cynergy, Allica, Starling, ClearBank, Griffin, Shieldpay, PEXA, PayProp"],
  ["Trade press and analysis", "Legal Futures; Law Gazette; Today's Conveyancer; Property Industry Eye; Letting Agent Today; Crowe law firm benchmarking (Nov 2024); Calmony survey (2022, vendor source)"]
];
