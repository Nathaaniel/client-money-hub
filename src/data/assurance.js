/* ASSURANCE page content (section: The proposition). All figures are fictional.

   controls: [label, data source, healthy?, detail, fix button label]
   pack:     contents of the evidence pack
   vendors:  [vendor, provides, bank adds back] */
export const ASSURANCE_HEAD = {
  eyebrow: "The proposition · customer view",
  title: "Compliance assurance",
  keyMessage: "Joining the bank's money data with the vendor's workflow data turns compliance into a dashboard rather than an annual scramble.",
  intro: "This goes beyond typical banking. All figures are fictional."
};

export const BOUNDARY = "The bank supplies data, tooling and evidence. The firm stays responsible for its own compliance. That boundary needs stating in terms and in the product, to manage the bank's own risk.";

export const ASSURANCE = {
  lettings: {
    controls: [
      ["Unallocated receipts", "Bank + vendor", false, "2 receipts, £1,840 total, over 3 days old", "Allocate in property software"],
      ["Landlords in negative balance", "Vendor", false, "1 landlord, −£212", "Fund from office account"],
      ["Daily reconciliation, bank vs ledger", "Bank + vendor", true, "Matched at 06:00", ""],
      ["Acknowledgement letter matches account title", "Bank", true, "Countersigned, version 3", ""],
      ["Deposits protected within 30 days", "Vendor", true, "All 214 deposits protected", ""],
      ["CMP cover current", "Bank (register monitor)", true, "Certificate valid to Mar 2027", ""]
    ],
    pack: ["Client account list and acknowledgement letters", "Daily reconciliation history (12 months)", "Landlord ledger balances at period end", "Deposit protection evidence", "CMP and redress certificates", "Open exceptions with ageing"],
    vendors: [["Reapit / PayProp, Arthur, Alto, Street", "Tenancy, landlord and fee ledgers; statement runs", "Matched receipts, payment status, daily reconciliation"], ["Fixflo", "Approved contractor invoices", "Payee check results and payment confirmation"], ["Deposit schemes", "Protection certificates", "Evidence that transfers were made within 30 days"]]
  },
  conveyancing: {
    controls: [
      ["Residual balances after completion", "Vendor", false, "3 matters over 4 weeks, £1,064 total", "Return to clients"],
      ["Client-to-office transfers matched to bills", "Bank + vendor", false, "1 transfer without a bill reference", "Attach bill"],
      ["Clients above £120k FSCS limit at this bank", "Bank", false, "4 clients; 2 outside a temporary high balance window", "Notify and spread"],
      ["Five-weekly reconciliation signed off", "Bank + vendor", true, "Signed by COFA on 3 Oct", ""],
      ["Payee checks on completion payments", "Bank", true, "100% of 46 completions this month", ""],
      ["Unusual outflow monitoring", "Bank", true, "No large transfers to non-client payees", ""]
    ],
    pack: ["Client account list and bank confirmations", "Five-weekly reconciliation sign-offs", "Residual balance report", "Client-to-office transfers with bill references", "Payee check log for completions", "Data for the accountant's report (submission from April 2027)"],
    vendors: [["Access Legal, IRIS, LEAP, Clio, Osprey, Actionstep, Proclaim", "Matter ledgers, bills, completion dates", "Matched receipts, payment tracking, residual alerts"], ["Thirdfort, Legl", "ID and source-of-funds results", "Verified paying account linked to the matter"], ["PEXA, Shieldpay", "TPMA instructions and status", "Safeguarded balances held at the bank"]]
  },
  payments: {
    controls: [
      ["Daily reconciliation break", "Bank + vendor", false, "£4,300 shortfall from a chargeback", "Top up from own funds"],
      ["Resolution pack refreshed", "Bank + vendor", false, "Last refreshed 9 days ago", "Refresh"],
      ["Funds safeguarded by end of next business day", "Bank + vendor", true, "100% this month", ""],
      ["Monthly safeguarding return data ready", "Bank", true, "September data available", ""],
      ["Safeguarding acknowledgement letters", "Bank", true, "All accounts", ""]
    ],
    pack: ["Safeguarding acknowledgement letters", "Daily reconciliations and breaks", "Monthly safeguarding return data", "Resolution pack data", "Bank due diligence evidence", "Audit confirmations (if holding £100k or more)"],
    vendors: [["In-house ledger", "Customer balances and transactions", "Real-time events, safeguarded balances"], ["Reconciliation software", "Matching rules and breaks", "API statements and balances"]]
  },
  wealth: {
    controls: [
      ["Panel concentration", "Bank", false, "62% at one bank against a 50% policy limit", "Rebalance"],
      ["Withdrawals paid within one business day", "Bank + vendor", false, "98.6%; 7 exceptions this month", "Review exceptions"],
      ["Daily internal reconciliation", "Bank + vendor", true, "Matched at cut-off", ""],
      ["Acknowledgement letters unedited", "Bank", true, "All 12 accounts", ""],
      ["Interest retained matches published disclosure", "Bank + vendor", true, "Within tolerance", ""]
    ],
    pack: ["Acknowledgement letters for all client bank accounts", "Daily internal and external reconciliations", "Bank due diligence and diversification evidence", "Interest pass-through and retention report (Consumer Duty)", "CASS resolution pack data"],
    vendors: [["FNZ, Bravura, Seccl, Iress, Avaloq", "Client cash ledgers and instructions", "Cut-off balances, matched receipts, per-client interest"], ["Intelliflo", "Adviser and client records", "Payment status for advisers"]]
  },
  insurance: {
    controls: [
      ["Client money calculation before commission withdrawal", "Bank + vendor", false, "1 withdrawal made before the calculation", "Reverse withdrawal"],
      ["Multi-currency reconciliation", "Bank + vendor", false, "3 unmatched EUR receipts", "Match receipts"],
      ["Acknowledgement letters match trust type", "Bank", true, "Statutory trust, all accounts", ""],
      ["Risk-transfer agreements flagged", "Vendor", true, "14 insurers flagged", ""]
    ],
    pack: ["Acknowledgement letters", "Client money calculations and commission withdrawals", "Multi-currency reconciliations", "Risk-transfer agreement register", "Audit confirmations"],
    vendors: [["Applied Epic, Acturis, Open GI, SSP", "Policies, binders, insurer settlements", "Matched premiums, settlement status, calculation gating"]]
  },
  other: {
    controls: [
      ["Client-to-office transfers matched to bills", "Bank + vendor", false, "1 transfer without a bill reference", "Attach bill"],
      ["Money held longer than needed", "Vendor", false, "2 clients with balances over 6 months", "Return to clients"],
      ["Bank acknowledgement held for every client account", "Bank", true, "All 3 accounts", ""],
      ["Monthly reconciliation completed", "Bank + vendor", true, "September done", ""]
    ],
    pack: ["Client account list and bank acknowledgements", "Reconciliations", "Bills and client-to-office transfers", "Interest paid above thresholds", "Records for professional body monitoring"],
    vendors: [["Practice software", "Client ledgers and bills", "Matched receipts, payment status"], ["Insolvency or deputyship case software", "Estates and deputyships", "Per-estate accounts, balance confirmations"]]
  }
};

/* Beyond banking: [capability, what it does] */
export const BEYOND = [
  ["Evidence packs", "One-click auditor, accountant or regulator packs from bank and vendor data."],
  ["Auditor portal", "Read-only access for auditors and reporting accountants, with direct balance confirmations."],
  ["Register monitoring", "Alerts when an FCA restriction, SRA intervention or CMP lapse appears. The WealthTek lesson."],
  ["Unusual outflow alerts", "Large transfers from client accounts to non-client payees flagged to compliance officers. The Axiom Ince lesson."],
  ["FSCS beneficiary data", "Single customer view support, and suggestions for spreading large balances across banking licences."],
  ["Exception analytics", "Ageing, trends and root causes of reconciliation breaks."],
  ["Rule-change tracker", "Maps new rules (CASS 15, SRA 2027, ILCA) to the controls they affect."],
  ["Officer attestations", "Workflow for COFA, CASS oversight officer or CMP sign-offs, with an audit trail."],
  ["Peer benchmarking", "Anonymised comparison of exceptions and reconciliation speed against similar firms."]
];
