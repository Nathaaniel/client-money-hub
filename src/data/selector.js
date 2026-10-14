/* SELECTOR page content (section: The proposition).
   The recommendation logic is in src/logic/selector.js. */
export const SELECTOR = {
  head: {
    eyebrow: "The proposition · customer view",
    title: "Account selector",
    keyMessage: "A firm answers nine questions and gets the right structure, what to provide, and how both sides stay compliant."
  },

  fields: [
    { id: "regime", label: "Which rules govern the money you hold?", hint: "Unsure is treated as the strictest case.", options: [
      ["cmp", "CMP scheme (letting agent or property manager)"], ["sra", "SRA or CLC (law firm or conveyancer)"], ["icaew", "ICAEW or ACCA (accountant)"],
      ["cass7", "FCA CASS 7 (investment or wealth)"], ["cass5", "FCA CASS 5 (insurance intermediary)"], ["cass15", "FCA CASS 15 (payment or e-money firm)"],
      ["none", "None of these"], ["unsure", "Not sure"]] },
    { id: "register", label: "Register status (the bank checks this automatically)", hint: "Shown here to illustrate the stop rule.", options: [
      ["clean", "Found, no restrictions"], ["restricted", "Restriction on holding client money"], ["notfound", "Not found on the register"]] },
    { id: "clients", label: "Clients or matters with money held at once", options: [
      ["few", "Fewer than 20"], ["mid", "20 to 500"], ["many", "More than 500"]] },
    { id: "hold", label: "How long you usually hold money", options: [
      ["short", "Days"], ["mid", "Weeks to 3 months"], ["long", "More than 3 months"]] },
    { id: "interest", label: "Is interest owed to individual clients?", options: [
      ["no", "No"], ["yes", "Yes"]] },
    { id: "fscs", label: "Does any client's balance exceed £120,000?", hint: "The FSCS limit per person per banking licence.", options: [
      ["no", "No"], ["sometimes", "Sometimes"], ["often", "Often"]] },
    { id: "data", label: "Can you give the bank underlying client data on request?", options: [
      ["yes", "Yes, from our software"], ["no", "No"]] },
    { id: "aml", label: "Your firm-wide AML risk assessment", options: [
      ["low", "Low"], ["medium", "Medium"], ["high", "High"], ["none", "Not done"]] },
    { id: "fraud", label: "High-value one-off payments with diversion risk?", hint: "For example, completions or settlements.", options: [
      ["no", "No"], ["yes", "Yes"]] }
  ],

  /* Starting answers for each sector (a key from SECTORS in src/config.js). */
  presets: {
    lettings: { regime: "cmp", register: "clean", clients: "mid", hold: "mid", interest: "no", fscs: "no", data: "yes", aml: "medium", fraud: "no" },
    conveyancing: { regime: "sra", register: "clean", clients: "mid", hold: "mid", interest: "no", fscs: "sometimes", data: "yes", aml: "medium", fraud: "yes" },
    payments: { regime: "cass15", register: "clean", clients: "many", hold: "short", interest: "no", fscs: "no", data: "yes", aml: "medium", fraud: "no" },
    wealth: { regime: "cass7", register: "clean", clients: "many", hold: "long", interest: "yes", fscs: "sometimes", data: "yes", aml: "low", fraud: "no" },
    insurance: { regime: "cass5", register: "clean", clients: "mid", hold: "mid", interest: "no", fscs: "no", data: "yes", aml: "low", fraud: "no" },
    other: { regime: "icaew", register: "clean", clients: "few", hold: "mid", interest: "no", fscs: "no", data: "yes", aml: "low", fraud: "no" }
  },

  /* The 2×2 grid: rd = real designated, rp = real pooled, vd = virtual designated, vp = virtual pooled. */
  cells: {
    rd: ["Real · Designated", "One real account per client. Interest and FSCS attribution per client."],
    rp: ["Real · Pooled", "One real client account for many clients. The firm keeps the client ledger."],
    vd: ["Virtual · Designated", "Not offered. A virtual number doesn't create a separate trust account."],
    vp: ["Virtual · Pooled", "Virtual account numbers on a pooled real account, used to match receipts to clients. Not separately protected."]
  },

  receiveCommon: [
    "An eligibility decision with reasons, recorded as evidence",
    "Account details, plus virtual account numbers where recommended",
    "An acknowledgement letter in the required wording, e-signed on day one",
    "A statement or API feed for reconciliation in your software",
    "A record of the register check made at onboarding"
  ],
  bankCommon: [
    "Register check at onboarding and ongoing monitoring",
    "Customer due diligence on the firm and its beneficial owners, proportionate to the AML risk"
  ],
  pooledProvide: "How the pooled account will be used, and underlying client data on request",
  pooledBank: "For a pooled account: understand its purpose and intended use, and assess its money laundering risk (risk-based rules for pooled accounts opened from 30 June 2026)",
  registerExplainer: "The bank looks the firm up on the relevant register (FCA, SRA, CLC, CMP scheme, HMRC, Companies House) before any account is offered, stores the result as evidence, and monitors it afterwards.",

  regimes: {
    cass7: { name: "FCA CASS 7",
      provide: ["FCA firm reference number. We check permissions and restrictions on the FS Register.", "Client money arrangements: designated or general, expected balances", "Signatories and approval rules"],
      biz: ["Don't receive client money until the countersigned acknowledgement letter is held", "Reconcile internally every business day and externally regularly", "Carry out bank due diligence and observe diversification limits", "Keep a CASS resolution pack, file client money returns and get an annual CASS audit"],
      bank: ["Countersign the letter without amendment before funds arrive", "No set-off or lien over client money", "Provide statement and balance data for reconciliation and audit", "Respond to auditor confirmations promptly"] },
    cass5: { name: "FCA CASS 5",
      provide: ["FCA firm reference number", "Statutory or non-statutory trust choice, with capital evidence for non-statutory", "Currencies and the insurer or binder list, for virtual accounts"],
      biz: ["Segregate client money and hold acknowledgement letters", "Run the client money calculation before withdrawing commission", "Reconcile and get an annual audit", "Track which insurer agreements transfer risk"],
      bank: ["Issue an acknowledgement letter that matches the trust type", "No set-off over client money", "Provide multi-currency statements and matching data"] },
    cass15: { name: "FCA CASS 15 safeguarding",
      provide: ["FCA firm reference number and permissions", "Safeguarding method (segregation, insurance or guarantee)", "Expected flows, customer volumes and operational account details"],
      biz: ["Segregate funds by the end of the business day after receipt", "Reconcile daily and file monthly safeguarding returns", "Get an annual audit if holding £100k or more", "Keep a resolution pack and carry out due diligence on the bank"],
      bank: ["Issue a safeguarding acknowledgement letter", "No set-off over safeguarded funds", "Provide real-time balance and transaction data", "Provide resolution-pack data on request"] },
    sra: { name: "SRA / CLC",
      provide: ["SRA or CLC number. We check the register for interventions or conditions.", "COFA (or CLC equivalent) contact details", "Expected flows: completions, settlements, typical values"],
      biz: ["Title the account in the firm's name with the word “client”", "Reconcile at least every five weeks", "Pay a fair sum of interest and return residual balances promptly", "Submit the accountant's report to the SRA from April 2027 unless exempt"],
      bank: ["Title the account correctly and confirm no set-off", "Provide confirmations to reporting accountants", "Apply payee checks to completion payments", "Alert on unusual outflows from client accounts"] },
    icaew: { name: "ICAEW / ACCA",
      provide: ["Firm registration or practising certificate number", "The account title you need"],
      biz: ["Hold client money in a correctly titled client account", "Get the bank's written acknowledgement, or move the money", "Keep records, reconcile, and pay interest above thresholds"],
      bank: ["Give written acknowledgement of trust status", "No set-off over client money"] },
    cmp: { name: "CMP scheme",
      provide: ["CMP scheme certificate and redress scheme membership (TPO or PRS)", "HMRC AML registration if letting at €10,000 or more a month", "Property software used, and landlord data on request"],
      biz: ["Keep CMP cover and redress membership current", "Protect tenancy deposits in an approved scheme within 30 days", "Reconcile client money; Propertymark members need an annual accountant's report", "Display the CMP certificate"],
      bank: ["Issue a CMP-ready trust acknowledgement and no set-off letter", "Monitor for lapses in CMP cover", "Gain transaction visibility through the platform partner"] }
  }
};
