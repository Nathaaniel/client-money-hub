/* MARKET page content (section: The case). */
const CLAIM = { tone: "", label: "Company claim" };
const PUBLISHED = { tone: "ok", label: "Published" };

export const MARKET = {
  head: {
    eyebrow: "The case",
    title: "Market landscape",
    keyMessage: "Banks hold most client money, but they're losing the best segments on service, not product.",
    intro: "Every bank offers the same pooled and designated accounts. The difference is how fast they open, what they pay, and whether the data reaches the firm's software."
  },

  headlines: [
    { figure: "1–3 months", text: "to open a letting agent's client account, against 2 months' notice to close one. Accounts opened since 28 April 2026 get 90 days' notice, with reasons.", evidence: { tone: "warn", label: "Trade press" } },
    { figure: "3.50% vs 1.46%", text: "Cynergy's published solicitor rate against NatWest's top client deposit tier (AER)", evidence: { tone: "ok", label: "Published" } },
    { figure: "1,130", text: "letting-agent accounts closed by Lloyds, cited in evidence to the Treasury Committee (March 2024)", evidence: { tone: "ok", label: "Parliament" } }
  ],

  // [capability, best current example, evidence]
  capabilities: [
    ["Real accounts settled at the Bank of England, API account opening, CASS 7 accounts with acknowledgement letters", "ClearBank", CLAIM],
    ["A dedicated real account per client, automated KYC/KYB, ledger API for reconciliation", "Griffin", CLAIM],
    ["Virtual accounts at scale on a client money or safeguarding account", "ClearBank (up to 6m per real account); Starling Banking Services", CLAIM],
    ["Published, high client account rate", "Cynergy: 3.50% AER on £500k–£20m pooled solicitor money", PUBLISHED],
    ["Self-serve extra client accounts, multi-level approvals, daily SFTP data files", "Allica", PUBLISHED],
    ["Scale in designated and pooled accounts for professional firms; deputyship cards", "Lloyds / Bank of Scotland", PUBLISHED],
    ["Lettings workflow on bank-held funds with daily automated reconciliation and same-day landlord payouts", "PayProp (Reapit), with NatWest integrated", CLAIM],
    ["TPMA or escrow as an alternative to holding client money", "Shieldpay (claims 3–5 day setup); PEXA (first CLC-approved TPMA)", CLAIM],
    ["Relationship management satisfaction", "Handelsbanken, 86% (CMA, business current accounts)", { tone: "ok", label: "CMA survey" }]
  ],

  // [provider, group, client money offer, target, notable]
  providers: [
    ["Barclays", "High street", "Clients Premium Account", "FCA client money firms, IPs, accountants, solicitors, property and letting agents", "Fined £42m by the FCA (Jul 2025), partly for opening a client money account for WealthTek, which was barred from holding client money"],
    ["NatWest / RBS", "High street", "Client Deposit Manager; Clients' Monies Service", "Regulated businesses holding third-party funds", "0.85%–1.46% AER tiered; no monthly fee; PayProp integration"],
    ["Lloyds / Bank of Scotland", "High street", "Designated, undesignated and Corporate Client Accounts", "Firms permitted to hold client money", "Deputyship cards; acknowledgement letters on request; corporate multi-currency"],
    ["HSBC UK", "High street", "Clients Deposit; Currency Client; Innovation Banking Client Monies (CASS)", "FCA firms, professional-body firms, some regulated real-estate firms", "Tiered interest; transaction fees"],
    ["Virgin Money", "High street", "Professional Firms Client Account", "Professional-body firms; letting agents with extra requirements", "£500 opening deposit; standing orders and direct debits generally not allowed"],
    ["Cynergy Bank", "Challenger", "Solicitor's Client Account (Jan 2026)", "SRA firms with about 20+ staff and £1m+ turnover", "3.50% AER on £500k–£20m; published rate; dedicated specialist"],
    ["Allica Bank", "Challenger", "Pooled and designated client deposit; estate; pension trustee", "Professional firms with 5–250 staff", "Self-serve extra accounts; bulk Faster Payments and CHAPS; daily SFTP files"],
    ["Metro Bank", "Challenger", "Client Premium Deposit Account", "Existing business customers", "No set-up or monthly fee; charges for CHAPS and auditor certificates"],
    ["Starling Banking Services", "Fintech / infrastructure", "CASS 7 client money and safeguarding accounts", "Regulated payment firms, investment firms, platforms", "API-first; own sort code; virtual accounts"],
    ["ClearBank", "Fintech / infrastructure", "Safeguarding, CASS 7 and segregated accounts", "EMIs, PIs, platforms", "Bank of England settlement; up to 6m virtual accounts; acknowledgement letters"],
    ["Griffin", "Fintech / infrastructure", "Dedicated or pooled safeguarding and client money accounts for CASS, CMP and SRA use", "Property, wealth and legal platforms", "Full UK bank since Mar 2024; real account numbers; automated KYC/KYB; ledger API"],
    ["Shieldpay", "TPMA", "TPMA, escrow, paying agent", "Law firms (used by KPMG Law)", "Monthly firm fee plus per-payment fee, often passed to the client as a disbursement"],
    ["PEXA", "TPMA", "Digital property exchange with TPMA", "Conveyancers", "First CLC-approved TPMA (Amity Law, Aug 2025)"],
    ["PayProp (Reapit)", "Platform", "Bank-integrated client accounting", "Letting agents", "Daily automated reconciliation; same-day landlord payouts"]
  ],
  notVerified: "Not verified in the research: Santander, Investec, Close Brothers, Arbuthnot, Hampden, Paragon, Shawbrook, OakNorth, Triodos, Unity Trust, Monzo Business, Tide, Modulr, Banking Circle, Railsr, Form3, Goodlord, Juno/Legalito. Their absence doesn't mean they lack a product.",

  // [gap, evidence]
  gaps: [
    ["Access and onboarding", "Banks gave letting agents 2 months' notice to close but took 1–3 months or more to open. New rules require 90 days' notice, with reasons, for payment accounts opened from 28 April 2026. Evidence to the Treasury Committee (Mar 2024) cited 1,130 Lloyds and 320 Santander letting-agent account closures. CMP needs a client account, and banks sometimes want CMP or Propertymark membership first."],
    ["Acknowledgement letters", "The FCA restricted CFS Management partly for missing or altered letters. The FCA's insurance broker review found missing letters and commission withdrawn before the calculation."],
    ["Interest", "High-street instant access pays up to about 1.5% AER against Cynergy's 3.50%. The FCA found platforms retain about half of cash interest on average. ILCA would take most law-firm interest."],
    ["Completion day", "CHAPS pressure and payment diversion fraud. Mandatory APP fraud reimbursement covers consumers, micro-enterprises and charities up to £85,000, so larger firms and completion-sized losses often fall outside it."],
    ["Data and integration", "High-street banks mostly provide statements, not APIs. Some providers offer payment APIs but not account creation or reconciliation APIs."],
    ["Onboarding checks", "Barclays opened a client money account for WealthTek, which its FS Register entry barred from holding client money."],
    ["Oversight of outflows", "At Axiom Ince, large transfers out of client accounts to fund acquisitions went undetected. About £64m is missing. (See Regulation.)"]
  ],

  // CMA overall service quality, % (business current accounts, published Aug 2026)
  cma: [
    ["Monzo", 85], ["Starling", 83], ["Mettle", 82], ["Handelsbanken", 78],
    ["Tide", 69], ["Barclays", 56], ["TSB", 56], ["Santander", 48]
  ],
  cmaNote: "CMA business current account survey, overall service quality (published Aug 2026). Measures current accounts, not client accounts.",

  marketGaps: [
    "Pooled client accounts with sub-ledgers and digital onboarding for letting agents and property managers.",
    "Real-time API access to client accounts for small and mid-size law firms at high-street banks.",
    "Multi-bank sweeping to maximise FSCS cover for law firms, with matter-level interest pass-through.",
    "Published client money rates at most big banks.",
    "Completion-day orchestration that joins case management, payee checks and release.",
    "Compliance evidence as a product: acknowledgement letters, reconciliation, accountant and regulator confirmations."
  ]
};
