/* SELECTOR page content (section: The proposition).
   The recommendation logic is in src/logic/selector.js. */
export const SELECTOR = {
  head: {
    eyebrow: "The proposition · customer view",
    title: "Account selector",
    keyMessage: "A firm answers eight questions about itself and gets the right structure, what to provide, and how both sides stay compliant."
  },

  /* Progress is shown in these groups. */
  groups: [
    { id: "rules", title: "Your rules" },
    { id: "money", title: "Your money" },
    { id: "risk", title: "Data and risk" }
  ],

  /* The questions, asked in this order.
     options: [value, label, detail]. detail is optional.
     say: how the answer reads in the sentence about the firm:
       before + phrase + after, with prompt standing in for the phrase while it's being asked.
     short: the field's name in "What would change this".
     fixed: a fact about the firm, so left out of "What would change this".
     demo: something the bank checks itself, shown only to illustrate the stop rule (not asked). */
  fields: [
    { id: "regime", group: "rules", fixed: true, label: "Which rules govern the money you hold?", hint: "Not sure is treated as the strictest case", options: [
      ["cmp", "CMP scheme", "Letting agents and property managers"], ["sra", "SRA or CLC", "Law firms and conveyancers"], ["icaew", "ICAEW or ACCA", "Accountants"],
      ["cass7", "FCA CASS 7", "Investment and wealth firms"], ["cass5", "FCA CASS 5", "Insurance intermediaries"], ["cass15", "FCA CASS 15", "Payment and e-money firms"],
      ["none", "None of these", "No client money regime"], ["unsure", "Not sure", "We'll confirm it with you"]],
      say: { before: "Our client money falls under", after: ".", prompt: "which rules?", phrases: {
        cmp: "a CMP scheme", sra: "the SRA or CLC rules", icaew: "ICAEW or ACCA rules", cass7: "FCA CASS 7", cass5: "FCA CASS 5",
        cass15: "FCA CASS 15 safeguarding", none: "none of these regimes", unsure: "rules we're not sure of" } } },
    { id: "register", group: "rules", fixed: true, demo: true, label: "Register check (run by the bank, demo)", options: [
      ["clean", "Clear"], ["restricted", "Restricted"], ["notfound", "Not found"]] },
    { id: "clients", group: "money", short: "Clients", label: "How many clients or matters have money with you at once?", options: [
      ["few", "Under 20"], ["mid", "20 to 500"], ["many", "Over 500"]],
      say: { before: "We hold money for", after: " at a time,", prompt: "how many clients?", phrases: {
        few: "fewer than 20 clients", mid: "20 to 500 clients", many: "more than 500 clients" } } },
    { id: "hold", group: "money", short: "Holding period", label: "How long do you usually hold it?", hint: "Money held for months suits its own account, as interest and protection are tracked per client", options: [
      ["short", "Days"], ["mid", "Up to 3 months"], ["long", "Over 3 months"]],
      say: { before: "usually for", after: ".", prompt: "how long?", phrases: {
        short: "a few days", mid: "up to 3 months", long: "more than 3 months" } } },
    { id: "interest", group: "money", short: "Interest owed", label: "Is interest owed to individual clients?", options: [
      ["no", "No"], ["yes", "Yes"]],
      say: { before: "Interest", after: " to individual clients,", prompt: "owed or not?", phrases: {
        no: "isn't owed", yes: "is owed" } } },
    { id: "fscs", group: "money", short: "Balances over £120k", label: "Does any client's balance go over £120,000?", hint: "The FSCS limit per person per banking licence", options: [
      ["no", "No"], ["sometimes", "Sometimes"], ["often", "Often"]],
      say: { before: "and balances", after: " go over £120,000.", prompt: "how often?", phrases: {
        no: "never", sometimes: "sometimes", often: "often" } } },
    { id: "data", group: "risk", short: "Client data", label: "Can you give the bank underlying client data on request?", hint: "A pooled account depends on the bank seeing whose money it is", options: [
      ["yes", "Yes"], ["no", "No"]],
      say: { before: "We", after: " give the bank client data on request,", prompt: "can or can't?", phrases: {
        yes: "can", no: "can't" } } },
    { id: "aml", group: "risk", short: "AML risk", label: "What does your firm-wide AML risk assessment say?", hint: "This sets how much due diligence the bank applies", options: [
      ["low", "Low"], ["medium", "Medium"], ["high", "High"], ["none", "Not done"]],
      say: { before: "our AML risk assessment", after: ",", prompt: "says what?", phrases: {
        low: "says low", medium: "says medium", high: "says high", none: "hasn't been done" } } },
    { id: "fraud", group: "risk", short: "High-value payments", label: "Do you make high-value one-off payments that could be diverted?", hint: "For example, completions or settlements", options: [
      ["no", "No"], ["yes", "Yes"]],
      say: { before: "and we", after: " high-value one-off payments that could be diverted.", prompt: "do or don't?", phrases: {
        no: "don't make", yes: "make" } } }
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
    rd: ["Real designated", "One real account per client. Interest and FSCS attribution per client."],
    rp: ["Real pooled", "One real client account for many clients. The firm keeps the client ledger."],
    vd: ["Virtual designated", "Not offered. A virtual number doesn't create a separate trust account."],
    vp: ["Virtual pooled", "Virtual account numbers on a pooled real account, used to match receipts to clients. Not separately protected."]
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
