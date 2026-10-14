/* INTEGRATIONS page content (section: The proposition).
   Vendor names are indicative and need validating with each vendor. */
export const INTEGRATIONS_HEAD = {
  eyebrow: "The proposition · internal view",
  title: "Vendor integration points",
  keyMessage: "The vendor owns the workflow and the screen; the bank owns the money and the evidence.",
  intro: "Vendor events trigger bank actions, and bank events update vendor ledgers. Vendor names are indicative and need validating with each vendor."
};

export const PATTERN = {
  software: { title: "Specialist software", text: "Practice management, property management, wealth platforms, broking systems. Owns clients, matters, tenancies and approvals." },
  arrows: ["Events: open, release, pay", "Events: received, paid, matched"],
  bankText: "Accounts and virtual accounts, payments, payee checks, reconciliation data, acknowledgement letters, evidence."
};

/* For each sector: example vendors, then trigger points as
   [trigger, direction, where, what happens, priority ("High" or "Medium")]. */
export const INTEGRATIONS = {
  lettings: { vendors: "Reapit / PayProp (incumbent), Arthur Online, Alto, Street, Goodlord, Re-Leased, Fixflo, Xero; deposit schemes; CMP schemes",
    points: [
      ["New tenancy or landlord set up", "Vendor → Bank", "Property software", "Create a virtual account per tenancy (or a designated account) and return the details to the tenancy record", "High"],
      ["Rent received", "Bank → Vendor", "Property software", "Event with the virtual account reference; the vendor allocates to the tenancy and landlord ledgers", "High"],
      ["Statement run", "Vendor → Bank", "Property software", "Bulk landlord payouts net of fees; fee sweep to office account only after statements are issued", "High"],
      ["Maintenance invoice approved", "Vendor → Bank", "Fixflo and similar", "Pay contractor after a payee check; status back to the job", "Medium"],
      ["Deposit taken", "Vendor → Bank", "Deposit schemes", "Transfer to the scheme within 30 days; evidence back", "Medium"],
      ["Compliance evidence", "Bank → Scheme", "CMP schemes, Propertymark", "Read-only reconciliation evidence and balance confirmations, with the agent's consent", "Medium"]
    ] },
  conveyancing: { vendors: "Case and accounts: Access Legal, IRIS, LEAP, Clio, Osprey Approach, Actionstep, Proclaim. Adjacent: Thirdfort, Legl, InfoTrack. TPMA: PEXA, Shieldpay",
    points: [
      ["Matter opened", "Vendor → Bank", "Case management", "Create a matter virtual account; send the client verified payment instructions", "High"],
      ["ID and source of funds checked", "Vendor → Bank", "Thirdfort, Legl", "Pay-by-bank deposit from the verified account; name match; link to the source-of-funds report", "High"],
      ["Lender advance received", "Bank → Vendor", "Case management", "CHAPS receipt matched to the matter; completion readiness updated", "High"],
      ["Ready to complete", "Vendor → Bank", "Case management", "Release with payee check and account verification, dual approval by value, CHAPS tracking back to the file", "High"],
      ["High-risk or high-value matter", "Vendor → Partner", "PEXA, Shieldpay", "Route to a TPMA partner; the bank holds the TPMA's safeguarded funds so deposits stay on balance sheet", "Medium"],
      ["Post-completion", "Vendor → Bank", "InfoTrack", "Pay SDLT and Land Registry fees", "Medium"],
      ["Bill issued", "Vendor → Bank", "Case management", "Client-to-office transfer allowed only with a bill reference", "Medium"],
      ["Residual balance ageing", "Bank → Vendor", "Case management", "Alert to the COFA when a completed matter still holds money", "Medium"]
    ] },
  payments: { vendors: "Mostly in-house ledgers. Payments infrastructure (for example Form3) and reconciliation software (for example Duco, Gresham) to verify",
    points: [
      ["Customer top-up", "Bank → Vendor", "Firm's ledger", "Real-time webhook; virtual IBAN per customer", "High"],
      ["Safeguarding sweep", "Vendor → Bank", "Firm's ledger", "Move funds into safeguarding by the end of the next business day; confirmation back", "High"],
      ["Daily reconciliation", "Bank → Vendor", "Reconciliation software", "API ledger and statements; break alerts", "High"],
      ["Monthly safeguarding return", "Bank → Vendor", "Firm's regulatory reporting", "Pre-filled data extract", "High"],
      ["Resolution pack request", "Bank → Firm", "Firm's ledger", "Account and balance data on request", "Medium"],
      ["Second safeguarding bank", "Bank ↔ Bank", "Standard formats", "Common data formats so a firm can run two banks", "Medium"]
    ] },
  wealth: { vendors: "Platforms: FNZ, Bravura, Seccl, Iress, Avaloq. Adviser software: Intelliflo. Cash deposit platforms (to verify)",
    points: [
      ["Client onboarded", "Vendor → Bank", "Platform", "Open designated or pooled client accounts; acknowledgement letters countersigned at opening", "High"],
      ["Contribution received", "Bank → Vendor", "Platform", "Event matched to the client's cash ledger", "High"],
      ["Daily reconciliation", "Bank → Vendor", "Platform", "Cut-off balances and ISO 20022 statements by API", "High"],
      ["Interest paid", "Bank → Vendor", "Platform", "Per-client interest data at the published rate, for pass-through and Consumer Duty evidence", "High"],
      ["Treasury instruction", "Vendor → Bank", "Platform", "Place in notice or term deposits within CASS limits, across panel banks", "Medium"],
      ["CASS audit", "Bank → Auditor", "Auditor portal", "Direct balance confirmations and account evidence", "Medium"]
    ] },
  insurance: { vendors: "Applied Epic, Acturis, Open GI, SSP; market settlement systems",
    points: [
      ["Policy bound", "Vendor → Bank", "Broking system", "Virtual account per insurer or binder", "High"],
      ["Premium received", "Bank → Vendor", "Broking system", "Multi-currency receipt matched to the policy", "High"],
      ["Client money calculation", "Vendor → Bank", "Broking system", "Commission release gated until the calculation is complete", "High"],
      ["Bordereau due", "Vendor → Bank", "Broking system", "Bulk settlement to insurers", "Medium"],
      ["Claim or refund", "Vendor → Bank", "Broking system", "Pay the client; status back to the claim record", "Medium"]
    ] },
  other: { vendors: "Accountants' practice software (for example IRIS, CCH, Xero Practice Manager, TaxCalc); insolvency and deputyship case software (to verify)",
    points: [
      ["Client account requested", "Vendor → Bank", "Practice software", "Open a client account in the app alongside the office account; acknowledgement issued automatically", "High"],
      ["New estate or deputyship", "Vendor → Bank", "Case software", "Open per-estate or per-person accounts in bulk", "High"],
      ["Money received", "Bank → Vendor", "Practice software", "Receipt matched to the client by reference", "Medium"],
      ["Bill issued", "Vendor → Bank", "Practice software", "Client-to-office transfer allowed with the bill reference", "Medium"],
      ["Annual monitoring", "Bank → Firm", "Portal", "Balance confirmations for professional body monitoring or OPG reports", "Medium"]
    ] }
};

/* Vendor map across all sectors: [sector, category, example vendors, integration value] */
export const VENDOR_MAP = [
  ["Lettings", "Property management and accounting", "Reapit / PayProp, Arthur Online, Alto, Street, Re-Leased", "Very high"],
  ["Lettings", "Lettings workflow and maintenance", "Goodlord, Fixflo", "High"],
  ["Conveyancing", "Case and practice management", "Access Legal, IRIS, LEAP, Clio, Osprey Approach, Actionstep, Proclaim", "Very high"],
  ["Conveyancing", "ID, AML and source of funds", "Thirdfort, Legl", "High"],
  ["Conveyancing", "Searches and post-completion", "InfoTrack", "Medium"],
  ["Conveyancing", "TPMA and digital exchange", "PEXA, Shieldpay", "High (partner or competitor)"],
  ["Payments & e-money", "Ledgers and reconciliation", "In-house; Form3, Duco, Gresham (to verify)", "High"],
  ["Wealth & SIPP", "Platforms and administration", "FNZ, Bravura, Seccl, Iress, Avaloq", "High"],
  ["Wealth & SIPP", "Adviser software", "Intelliflo", "Medium"],
  ["Insurance broking", "Broking systems", "Applied Epic, Acturis, Open GI, SSP", "High"],
  ["Other professional firms", "Accountants' practice software", "IRIS, CCH, Xero Practice Manager, TaxCalc (to verify)", "Medium"],
  ["Other professional firms", "Insolvency and deputyship case software", "To identify", "Medium"]
];
