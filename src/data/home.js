/* HOME page content. The decision sought is in src/config.js. */
export const HOME = {
  head: {
    eyebrow: "Home",
    title: "Client money: target end state",
    keyMessage: "Become the regulated client money layer that firms run inside their own software. Start with lettings, conveyancing and payment firms."
  },
  ambition: "We are the default regulated client money layer for UK firms that hold other people's money. Firms run it inside their own software, so compliance becomes a by-product of the workflow rather than a separate burden.",
  whyNow: [
    { title: "CASS 15 safeguarding", status: "Live 7 May 2026", tone: "ok", text: "Payment and e-money firms are choosing safeguarding banks now." },
    { title: "SRA accounts reforms", status: "Jan / Apr 2027", tone: "brand", text: "Law firms will need automated evidence and bank confirmations." },
    { title: "ILCA levy", status: "Proposed", tone: "warn", text: "Would take most of the interest law firms earn on client money." }
  ],
  whereToPlayIntro: "Ordered by pain, timing and fit with the platform. Open a sector to see the proposition for it.",
  strategicChoice: "Become the bank behind the software vendors, or compete with them for the customer interface. The recommendation is to partner: the vendor owns the workflow, the bank owns the money and the evidence.",
  heatmapNote: "Equal weights. Judgement from public material. Nobody scores highly on both access and embedded, which is where the opening is.",
  deepDives: [
    { title: "Market evidence", text: "14 providers, best capabilities, reported gaps, sentiment.", page: "market" },
    { title: "Segment playbook", text: "8 segments: compliance duties, needs, journeys, payments.", page: "segments" },
    { title: "See the product", text: "Journey, selector, console, integrations and assurance.", page: "journey" },
    { title: "Sources and caveats", text: "What this rests on and what to validate internally.", page: "sources" }
  ]
};

/* Where to play, in priority order. sector = a key from SECTORS in src/config.js. */
export const PRIORITIES = [
  { sector: "lettings", why: "A structural access gap after years of account closures. Councils now check CMP cover.", wedge: "Pooled account with a virtual account per tenancy, through independent property software.", risk: "Reapit/PayProp is entrenched; perceived AML risk." },
  { sector: "conveyancing", why: "Highest value per transaction, completion-day fraud and the SRA's 2027 reforms.", wedge: "Completion orchestration, plus a TPMA partnership so deposits stay with the bank.", risk: "ILCA cuts interest economics." },
  { sector: "payments", why: "CASS 15 is live and firms are reviewing their safeguarding banks now.", wedge: "Real-time ledger, virtual IBANs and CASS 15 return data.", risk: "High fraud and AML exposure." },
  { sector: "wealth", why: "Strong deposit economics; FCA scrutiny of retained interest.", wedge: "Transparent pass-through, panel treasury, unedited letters at opening.", risk: "Rate competition." },
  { sector: "insurance", why: "A follow-on that reuses the same engine.", wedge: "Multi-currency, a virtual account per binder, commission gated by calculation.", risk: "Broking platform integration effort." }
];
