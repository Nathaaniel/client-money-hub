/* SCORECARD content (section: Competition). Also drives the Home heatmap.
   Scores are 0–5 per commitment: judgement from public material, not verified benchmarks. */
export const SCORECARD = {
  head: {
    eyebrow: "Competition",
    title: "Competitor scorecard",
    keyMessage: "Infrastructure banks lead on embedding, incumbents on trust. Nobody owns the sector workflow layer.",
    intro: "How close each provider is to the target end state, scored 0–5 on the six commitments. Select a row for detail."
  },

  dims: [
    { key: "trust", label: "Trust & structure", short: "Trust" },
    { key: "embed", label: "Embedded", short: "Embedded" },
    { key: "data", label: "Data & reconciliation", short: "Data" },
    { key: "pay", label: "Payment controls", short: "Payments" },
    { key: "interest", label: "Interest transparency", short: "Interest" },
    { key: "access", label: "Access & onboarding", short: "Access" }
  ],

  /* OUR SCORES: fill from Copilot 365. A number 0–5, or null to show "?".
     When all six are numbers, the bank also appears in the Scorecard ranking. */
  ourScores: { trust: null, embed: null, data: null, pay: null, interest: null, access: null },

  /* How much each commitment matters in each sector (used when weighting by sector). */
  weights: {
    lettings: { trust: 1, embed: 3, data: 2, pay: 2, interest: 0.5, access: 3 },
    conveyancing: { trust: 1, embed: 2, data: 1, pay: 3, interest: 1.5, access: 1 },
    payments: { trust: 2, embed: 3, data: 3, pay: 2, interest: 0.5, access: 2 },
    wealth: { trust: 2, embed: 1.5, data: 2, pay: 1, interest: 3, access: 1 },
    insurance: { trust: 2, embed: 1.5, data: 2, pay: 2, interest: 1, access: 1 },
    other: { trust: 2, embed: 1, data: 1, pay: 1, interest: 1, access: 3 }
  },

  providers: [
    { name: "Griffin", type: "Challenger (fintech bank)", s: { trust: 4, embed: 5, data: 4, pay: 3, interest: 3, access: 3 },
      strength: "Dedicated real accounts per client, with automated KYC/KYB and a ledger API. Explicitly supports CASS, CMP and SRA use.",
      gap: "Scale and trust with large firms. No visible completion-day or panel-treasury layer.",
      learn: "Per-client real accounts and an event-based API are the bar for developer experience." },
    { name: "ClearBank", type: "Infrastructure bank", s: { trust: 4, embed: 5, data: 4, pay: 3, interest: 2, access: 3 },
      strength: "Bank of England-settled real accounts, CASS 7 and safeguarding accounts with acknowledgement letters, up to 6m virtual accounts.",
      gap: "No sector workflows or vendor-facing proposition. Virtual accounts are notional segregation only.",
      learn: "Infrastructure alone doesn't win end customers. The sector layer is open." },
    { name: "Starling Banking Services", type: "Infrastructure (banking as a service)", s: { trust: 4, embed: 5, data: 4, pay: 3, interest: 2, access: 3 },
      strength: "API-first CASS 7 and safeguarding accounts on its own sort code, with virtual accounts and real-time Faster Payments.",
      gap: "Aimed at regulated payment and investment firms, not SME law or lettings.",
      learn: "A strong contender for CASS 15 mandates." },
    { name: "Lloyds / Bank of Scotland", type: "Incumbent", s: { trust: 4, embed: 2, data: 2, pay: 3, interest: 2, access: 2 },
      strength: "Scale across designated and undesignated accounts, deputyship cards, acknowledgement letters on request.",
      gap: "Relationship-led and manual. Large numbers of letting-agent account closures. Limited API.",
      learn: "Trust and scale are real advantages, but the operating model limits them." },
    { name: "NatWest (with PayProp)", type: "Incumbent via platform partner", s: { trust: 4, embed: 4, data: 4, pay: 3, interest: 3, access: 3 },
      strength: "Bank-held funds inside a lettings workflow with daily automated reconciliation and same-day payouts. Published tiered rates.",
      gap: "The bank is invisible behind one vendor, in one sector. Rates are low (0.85%–1.46% AER).",
      learn: "Proof that the partner model works. The question is who owns the customer." },
    { name: "Allica", type: "Challenger", s: { trust: 3, embed: 3, data: 3, pay: 4, interest: 3, access: 4 },
      strength: "Self-serve extra client accounts, multi-level approvals, bulk Faster Payments and CHAPS, daily SFTP files, estate and trustee accounts.",
      gap: "Daily files rather than real-time APIs. No sector software integrations for client accounts.",
      learn: "Self-serve account opening for existing customers is achievable now." },
    { name: "Cynergy", type: "Challenger", s: { trust: 3, embed: 1, data: 2, pay: 2, interest: 5, access: 3 },
      strength: "Published 3.50% AER on £500k–£20m of pooled solicitor money, with a dedicated specialist.",
      gap: "Narrow eligibility (about 20+ staff). No visible API or integration.",
      learn: "A published rate moves law-firm balances, though ILCA could blunt this." }
  ],

  plans: [
    { title: "Incumbents", sub: "Lloyds, NatWest, Barclays, HSBC", steps: ["Put an API and event layer over existing client accounts rather than rebuilding.", "Add a fast lane for pooled accounts where platform data gives transaction-level visibility.", "Certify the top vendors in each priority sector.", "Lead with trust, scale and payment-scheme reach."] },
    { title: "Challengers", sub: "Griffin, Allica, Cynergy", steps: ["Close the trust gap by winning one flagship vendor per sector.", "Publish resilience and safeguarding evidence.", "Ship a conveyancing completion product first.", "Keep rates published and simple."] },
    { title: "Infrastructure banks", sub: "ClearBank, Starling Banking Services", steps: ["Move up the stack with sector templates.", "Offer real designated accounts as an option alongside virtual accounts.", "Build a vendor channel programme.", "Package CASS 15 data and resolution-pack support."] }
  ],
  commonToAll: "Automate acknowledgement letters, register checks and audit evidence, since that's what regulators keep citing. Make vendor integrations the main sales asset.",
  notScored: "Barclays, HSBC UK, Santander, Virgin Money, Metro and Handelsbanken aren't scored because too little was verified about their client money digital capability."
};
