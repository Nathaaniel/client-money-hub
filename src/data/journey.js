/* JOURNEY page content (section: The proposition). */
export const JOURNEY_HEAD = {
  eyebrow: "The proposition",
  title: "The customer journey",
  keyMessage: "Eight stages from first look to exit. The firm stays in its own software; the bank handles the money, the controls and the evidence.",
  intro: "A service blueprint showing who does what at each stage and which rule it meets. Select a stage for detail, or open the screen that shows it."
};

/* The six commitments behind the target end state. */
export const COMMITMENTS = [
  { k: "Trust by design", title: "Right structure, letters on day one", text: "The right account structure for the regime, with acknowledgement letters issued in the prescribed wording at account opening. Regulatory registers are checked automatically at onboarding and monitored afterwards." },
  { k: "Embedded", title: "Inside the customer's software", text: "Accounts, ledgers and payments are available by API and events, so firms use them from their practice, property or platform software. Integrations with the main vendors in each sector are certified." },
  { k: "One truth", title: "Continuous reconciliation", text: "Bank and vendor ledgers reconcile continuously. Audit, accountant and regulator evidence is generated from the same data." },
  { k: "Controlled movement", title: "Money moves only when it should", text: "Payee checks, approval rules by value and role, and release on events from the customer's software. Trust-money guardrails block overdrafts and set-off." },
  { k: "Fair-value interest", title: "Published and passed through", text: "Published tiered rates, per-client pass-through and multi-bank options. Interest rules are designed so they can adapt to the outcome of the ILCA levy." },
  { k: "Access and resilience", title: "Open fast, stay open", text: "Published eligibility, onboarding measured in days, and risk-based pooled accounts through platform partners. Exit notice periods match realistic re-banking times. Resolution-pack and FSCS data are available on request." }
];

/* The eight stages. page = which page "See it" opens (an id from STRUCTURE in src/config.js).
   software and rules have one entry per stage, for each sector. */
export const JOURNEY = {
  stages: [
    { name: "Check eligibility", page: "selector", screen: "Selector", good: "Published criteria and a clear list of what's needed, answered in minutes." },
    { name: "Apply once", page: "selector", screen: "Selector", good: "Data pre-filled from Companies House and the regulator's register, so the firm only confirms it." },
    { name: "Verify", page: "regulation", screen: "Register checks", good: "A named contact, a status tracker and a target in days. Register checks run automatically, with a stop rule." },
    { name: "Trust letter", page: "selector", screen: "Selector output", good: "The acknowledgement letter in the required wording, e-signed on day one." },
    { name: "Go live", page: "integrations", screen: "Integrations", good: "Accounts, virtual accounts, users and payment authorities set up together, by API from the firm's software." },
    { name: "Run", page: "console", screen: "Console", good: "Receipts match automatically. Payments are released on events from the firm's software, after payee checks and approval rules." },
    { name: "Evidence", page: "assurance", screen: "Assurance", good: "Reconciliation, audit and regulator evidence on demand, from bank and software data together." },
    { name: "Review or exit", page: "assurance", screen: "Assurance", good: "Reviews reuse data the bank already holds. Exit notice matches realistic re-banking times." }
  ],
  firm: ["Answers a few questions about the money it holds", "Confirms pre-filled firm data", "Tracks application status", "E-signs the acknowledgement letter", "Sets users and approval limits", "Works in its own software; approves payments", "Downloads evidence for auditors and accountants", "Answers fewer review questions"],
  bank: ["Publishes criteria; recommends a structure", "Pre-fills from Companies House and the regulator's register", "Automated register checks with a stop rule", "Issues the letter in the required wording on day one", "Opens accounts and virtual accounts by API", "Matches receipts, checks payees, blocks overdrafts", "Evidence packs and an auditor portal", "Monitors registers; exit notice matches re-banking time"],
  software: {
    lettings: ["None", "Shares firm data with consent", "None", "None", "Property software creates a virtual account per tenancy", "Rent allocated, statements run, landlords paid", "Landlord ledgers and deposit records", "None"],
    conveyancing: ["None", "Case system shares firm data with consent", "None", "None", "Case system creates a matter account", "Thirdfort verifies the payer; case system triggers release", "Matter ledgers and bills", "None"],
    payments: ["None", "Firm shares volumes and flows", "None", "None", "Ledger connected by API; virtual IBANs issued", "Top-ups and payouts by API; daily sweep", "Reconciliation and return data", "None"],
    wealth: ["None", "Platform shares firm data", "None", "None", "Platform opens client accounts by API", "Contributions matched; interest passed through", "Cash ledgers for the CASS audit", "None"],
    insurance: ["None", "Broking system shares firm data", "None", "None", "Virtual account per insurer or binder", "Premiums matched; settlements paid", "Calculations and reconciliations", "None"],
    other: ["None", "Practice software shares firm data", "None", "None", "Accounts opened in app; per estate or per person for IPs and deputies", "Occasional payments approved in app", "Records for professional body monitoring", "None"]
  },
  rules: {
    lettings: ["Bank risk appetite; CMP membership", "MLR customer due diligence", "CMP, redress and HMRC registers", "CMP trust acknowledgement; no set-off", "Client money kept apart from office money", "Deposits protected within 30 days; reconcile", "Propertymark accountant's report; CMP evidence", "Ongoing due diligence; CMP cover monitored"],
    conveyancing: ["Bank risk appetite", "MLR customer due diligence", "SRA or CLC register (the WealthTek lesson)", "Account title includes “client”; no set-off", "SRA bill rule for client-to-office transfers", "Reconcile every five weeks; return residuals promptly", "Accountant's report submitted to the SRA from April 2027", "Ongoing due diligence"],
    payments: ["Published risk appetite", "MLR customer due diligence", "FS Register permissions", "Safeguarding acknowledgement letter", "Segregate by end of next business day", "Daily reconciliation (CASS 15)", "Monthly safeguarding return; audit; resolution pack", "Bank due diligence by the firm"],
    wealth: ["Bank risk appetite", "MLR customer due diligence", "FS Register: client money permission", "CASS 7.18 letter before any money arrives", "Diversification limits", "Daily internal reconciliation", "CASS audit; client money return; resolution pack", "Bank due diligence by the firm"],
    insurance: ["Bank risk appetite", "MLR customer due diligence", "FS Register: client money permission", "Letter matches statutory or non-statutory trust", "Client money segregated", "Calculation before commission withdrawal", "CASS 5 audit", "Ongoing due diligence"],
    other: ["Professional body supervision", "MLR customer due diligence", "ICAEW, ACCA, IP or SRA register", "Bank acknowledgement (ICAEW: move money if refused)", "Correct account title; per-estate accounts", "Reconcile; pay interest above thresholds", "Professional body monitoring; OPG reports", "Ongoing due diligence"]
  }
};
