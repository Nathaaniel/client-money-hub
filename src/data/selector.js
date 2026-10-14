/* SELECTOR content: the questions, rules text and data for all three versions.
   The recommendation logic is in src/logic/selector.js. */
export const SELECTOR = {
  head: {
    title: "Account selector"
  },

  /* The three versions of the selector, one per channel. */
  channels: [
    { key: "public", label: "Public website", who: "A firm that doesn't bank with us yet",
      keyMessage: "A firm new to the bank answers eight short questions and gets a suggested account in plain English, with no sign-in." },
    { key: "online", label: "Online banking", who: "An existing business customer, signed in",
      keyMessage: "An existing customer only answers what the bank doesn't already know. Their firm, regulator and register check are filled in for them." },
    { key: "manager", label: "Relationship manager", who: "Bank staff, with or for a client",
      keyMessage: "A relationship manager sees every question at once, the bank's own data, the full structure and a rationale ready for the file." }
  ],

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
     staffLabel: the question as the relationship manager version shows it.
     short: the field's name in "What would change this".
     fixed: a fact about the firm, so left out of "What would change this".
     demo: something the bank checks itself (not asked); prototype controls can change it. */
  fields: [
    { id: "regime", staffLabel: "Client money regime", group: "rules", fixed: true, label: "Which rules govern the money you hold?", hint: "Not sure is fine. We'll confirm it with you", options: [
      ["cmp", "CMP scheme", "Letting agents and property managers"], ["sra", "SRA or CLC", "Law firms and conveyancers"], ["icaew", "ICAEW or ACCA", "Accountants"],
      ["cass7", "FCA CASS 7", "Investment and wealth firms"], ["cass5", "FCA CASS 5", "Insurance intermediaries"], ["cass15", "FCA CASS 15", "Payment and e-money firms"],
      ["none", "None of these", "No client money regime"], ["unsure", "Not sure", "We'll confirm it with you"]],
      say: { before: "Our client money falls under", after: ".", prompt: "which rules?", phrases: {
        cmp: "a CMP scheme", sra: "the SRA or CLC rules", icaew: "ICAEW or ACCA rules", cass7: "FCA CASS 7", cass5: "FCA CASS 5",
        cass15: "FCA CASS 15 safeguarding", none: "none of these regimes", unsure: "rules we still need to confirm" } } },
    { id: "register", group: "rules", fixed: true, demo: true, label: "Register check result", options: [
      ["clean", "Clear"], ["restricted", "Restricted"], ["notfound", "Not found"]] },
    { id: "clients", staffLabel: "Clients or matters with money held at once", group: "money", short: "Clients", label: "How many clients or matters have money with you at once?", options: [
      ["few", "Under 20"], ["mid", "20 to 500"], ["many", "Over 500"]],
      say: { before: "We hold money for", after: " at a time,", prompt: "how many clients?", phrases: {
        few: "fewer than 20 clients", mid: "20 to 500 clients", many: "more than 500 clients" } } },
    { id: "hold", staffLabel: "Usual holding period", group: "money", short: "Holding period", label: "How long do you usually hold it?", hint: "Money held for months suits its own account, as interest and protection are tracked per client", options: [
      ["short", "Days"], ["mid", "Up to 3 months"], ["long", "Over 3 months"]],
      say: { before: "usually for", after: ".", prompt: "how long?", phrases: {
        short: "a few days", mid: "up to 3 months", long: "more than 3 months" } } },
    { id: "interest", staffLabel: "Interest owed to individual clients", group: "money", short: "Interest owed", label: "Is interest owed to individual clients?", options: [
      ["no", "No"], ["yes", "Yes"]],
      say: { before: "Interest", after: " to individual clients,", prompt: "owed or not?", phrases: {
        no: "isn't owed", yes: "is owed" } } },
    { id: "fscs", staffLabel: "Any client balance over £120,000 (FSCS limit)", group: "money", short: "Balances over £120k", label: "Does any client's balance go over £120,000?", hint: "The FSCS limit per person per banking licence", options: [
      ["no", "No"], ["sometimes", "Sometimes"], ["often", "Often"], ["unsure", "Not sure"]],
      say: { before: "and balances", after: " go over £120,000.", prompt: "how often?", phrases: {
        no: "never", sometimes: "sometimes", often: "often", unsure: "might sometimes" } } },
    { id: "data", staffLabel: "Can supply underlying client data on request", group: "risk", short: "Client data", label: "Can you give the bank underlying client data on request?", hint: "For example, a list of whose money is in the account, exported from your software", options: [
      ["yes", "Yes"], ["no", "No"]],
      say: { before: "We", after: " give the bank client data on request,", prompt: "can or can't?", phrases: {
        yes: "can", no: "can't" } } },
    { id: "aml", staffLabel: "Firm's own AML risk assessment", group: "risk", short: "AML risk", label: "What risk level does your own firm-wide AML risk assessment give?", hint: "It helps us suggest the right account, and we'll talk it through with you", options: [
      ["low", "Low"], ["medium", "Medium"], ["high", "High"], ["none", "Not done yet"], ["unsure", "Not sure"]],
      say: { before: "our AML risk assessment", after: ",", prompt: "rates us how?", phrases: {
        low: "rates us low risk", medium: "rates us medium risk", high: "rates us high risk", none: "isn't done yet", unsure: "is something we need to check" } } },
    { id: "fraud", staffLabel: "Makes large one-off payments (completions, settlements)", group: "risk", short: "Large one-off payments", label: "Do you make large one-off payments, such as completions or settlements?", hint: "Fraudsters target large payments, so we add extra checks to them", options: [
      ["no", "No"], ["yes", "Yes"]],
      say: { before: "and we", after: " large one-off payments.", prompt: "do or don't make?", phrases: {
        no: "don't make", yes: "make" } } }
  ],

  /* The example answers for each sector (a key from SECTORS in src/config.js),
     filled in from the prototype controls. */
  presets: {
    lettings: { regime: "cmp", register: "clean", clients: "mid", hold: "mid", interest: "no", fscs: "no", data: "yes", aml: "medium", fraud: "no" },
    conveyancing: { regime: "sra", register: "clean", clients: "mid", hold: "mid", interest: "no", fscs: "sometimes", data: "yes", aml: "medium", fraud: "yes" },
    payments: { regime: "cass15", register: "clean", clients: "many", hold: "short", interest: "no", fscs: "no", data: "yes", aml: "medium", fraud: "no" },
    wealth: { regime: "cass7", register: "clean", clients: "many", hold: "long", interest: "yes", fscs: "sometimes", data: "yes", aml: "low", fraud: "no" },
    insurance: { regime: "cass5", register: "clean", clients: "mid", hold: "mid", interest: "no", fscs: "no", data: "yes", aml: "low", fraud: "no" },
    other: { regime: "icaew", register: "clean", clients: "few", hold: "mid", interest: "no", fscs: "no", data: "yes", aml: "low", fraud: "no" }
  },

  /* What the bank already holds about an existing customer in each sector (online banking and
     relationship manager versions). Fictional firms.
     regime: filled in from the register, so not asked. bankRisk: the bank's own customer risk rating,
     shown to staff only. Bracketed values are placeholders. */
  known: {
    lettings: { firm: "Example Lettings Ltd", number: "Companies House [00000000]", regime: "cmp", register: "CMP scheme register", registerRef: "[Scheme] member [00000]",
      products: ["Business current account"], since: "[2019]", bankRisk: "medium", rm: "[RM name]" },
    conveyancing: { firm: "Example Law LLP", number: "Companies House [OC000000]", regime: "sra", register: "SRA register", registerRef: "SRA number [000000]",
      products: ["Business current account", "Office account"], since: "[2016]", bankRisk: "medium", rm: "[RM name]" },
    payments: { firm: "Example Pay Ltd", number: "Companies House [00000000]", regime: "cass15", register: "FCA register", registerRef: "FRN [900000]",
      products: ["Business current account", "FX account"], since: "[2022]", bankRisk: "high", rm: "[RM name]" },
    wealth: { firm: "Example Wealth Platform Ltd", number: "Companies House [00000000]", regime: "cass7", register: "FCA register", registerRef: "FRN [500000]",
      products: ["Business current account", "Treasury deposit"], since: "[2014]", bankRisk: "low", rm: "[RM name]" },
    insurance: { firm: "Example Brokers Ltd", number: "Companies House [00000000]", regime: "cass5", register: "FCA register", registerRef: "FRN [300000]",
      products: ["Business current account"], since: "[2018]", bankRisk: "low", rm: "[RM name]" },
    other: { firm: "Example Accountants LLP", number: "Companies House [OC000000]", regime: "icaew", register: "ICAEW register", registerRef: "Firm number [C000000]",
      products: ["Business current account"], since: "[2020]", bankRisk: "low", rm: "[RM name]" }
  },

  /* Plain-English names for each recommended structure (keys are the recommended cells, joined),
     used on the customer versions. */
  plain: {
    "rd": "One account per client",
    "rp": "One client account for all your clients",
    "rp,vp": "One client account, with a reference number for each client",
    "rp,vp,rd": "One shared client account, plus separate accounts for large or long-held sums"
  },
  plainCass15: "One safeguarding account, with a reference number for each customer",

  /* When the firm can't be offered an account: what the customer sees, and what staff see. */
  stops: {
    restricted: {
      customer: ["We need to talk to you before going further", "We can't open a client money account online for your firm. Your relationship team will be in touch to talk it through."],
      staff: ["Stop: the bank can't open a client money account", "The register shows a restriction on holding client money. Onboarding stops and the case goes to financial crime and the relationship team. This is the check that would have prevented the WealthTek account."]
    },
    notfound: {
      customer: ["We couldn't confirm your registration", "We need to find your firm on its regulator's register before we can hold client money for you. Check the number in your profile, or talk to us."],
      staff: ["Hold: firm not found on the register", "Confirm the regime and registration number before continuing. The bank won't hold client money for a firm it can't verify."]
    },
    noregime: {
      customer: ["A client account may not be right for you", "Client accounts are for firms whose regulator or scheme requires them. An escrow or third-party managed account might suit you better, or you may need to register with a scheme first. We can help you work out which."],
      staff: ["Not eligible for a client account", "Firms without a client money regime are routed to a regulated escrow or TPMA provider, or asked to register first (for example, property sourcing usually counts as estate agency work)."]
    }
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
