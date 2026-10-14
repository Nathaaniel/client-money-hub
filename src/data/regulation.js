/* REGULATION page content (section: The case).
   tone sets the colour of a status label: "ok" (green), "brand" (blue), "warn" (amber), "bad" (red). */
export const REGULATION = {
  head: {
    eyebrow: "The case",
    title: "Regulation and account types",
    keyMessage: "Regulation will reshape this market more than product design over 2026–2027.",
    intro: "Strictly, CASS covers FCA firms only. Law firms follow the SRA or CLC rules, accountants follow ICAEW or ACCA, and letting agents follow CMP scheme rules. The proposition treats “CASS-grade” as the common standard."
  },

  // [driver, status, tone, what it means for the proposition]
  whyNow: [
    ["FCA CASS 15 safeguarding regime", "In force 7 May 2026", "ok", "Payment and e-money firms need daily reconciliation data, monthly returns and resolution-pack support from their bank."],
    ["SRA accounts-rule reforms", "From Jan / Apr 2027", "brand", "Accountants' reports must be submitted to the SRA, and compliance roles must be separated. Firms will want automated evidence and bank confirmations."],
    ["Interest on Lawyers' Client Accounts (ILCA) levy", "Proposed", "warn", "The MoJ proposes taking 75% of pooled and 50% of designated interest. That weakens interest as the main pitch to law firms."],
    ["Council enforcement of CMP cover", "In force 27 Dec 2025", "ok", "Letting agents can't afford to lose a client account, so access and continuity become selling points."],
    ["Onboarding enforcement (Barclays / WealthTek)", "Fined Jul 2025", "ok", "Automated register checks become a requirement, not a nice-to-have."]
  ],

  // Newest first
  timeline: [
    { when: "Apr 2027", status: "Upcoming", tone: "brand", what: "SRA accountants' report changes apply", impact: "Reports must be submitted to the SRA, with fixed penalties." },
    { when: "Jan 2027", status: "Upcoming", tone: "brand", what: "SRA compliance-role separation begins", impact: "COLP and COFA roles separated; client money threshold raised to £2m." },
    { when: "Late 2026 onward", status: "Proposed", tone: "warn", what: "SRA consultation on firms whose risk profile changes; draft government proposals on letting-agent AML", impact: "More data-sharing expectations." },
    { when: "31 Jul 2026", status: "Confirmed", tone: "ok", what: "Legal Services Board approves the SRA changes", impact: "Per secondary sources. Confirms the 2027 timetable." },
    { when: "30 Jun 2026", status: "In force", tone: "ok", what: "Money Laundering Regulations amended: pooled client accounts move to a risk-based regime", impact: "For pooled accounts opened from this date, the bank must understand each account's purpose and intended use and assess its money laundering risk, instead of relying on simplified due diligence (SI 2026/621)." },
    { when: "2 Jun 2026", status: "Confirmed", tone: "ok", what: "SRA confirms reforms, including annual declarations", impact: "Banks may see more confirmation requests." },
    { when: "7 May 2026", status: "In force", tone: "ok", what: "FCA CASS 15 safeguarding regime", impact: "Daily reconciliation, monthly returns, annual audit above £100k, resolution pack." },
    { when: "1 May 2026", status: "In force", tone: "ok", what: "Renters' Rights Act phase 1", impact: "Deposit rules unchanged." },
    { when: "28 Apr 2026", status: "In force", tone: "ok", what: "Account closure rules tightened", impact: "Payment accounts opened from this date need at least 90 days' notice, with reasons, before the provider closes them." },
    { when: "7 Jan – 9 Mar 2026", status: "Proposed", tone: "warn", what: "MoJ ILCA consultation", impact: "75% of pooled and 50% of designated interest to the MoJ. No response as of September 2026." },
    { when: "27 Dec 2025", status: "In force", tone: "ok", what: "Councils' enhanced enforcement powers, including CMP checks", impact: "Letting agents need stable client accounts." },
    { when: "1 Dec 2025", status: "In force", tone: "ok", what: "FSCS limit rises to £120k; temporary high balance cover to £1.4m", impact: "Larger balances protected per beneficial owner." }
  ],

  fscs: [
    "The limit is £120,000 per person per banking licence. Temporary high balance cover is £1.4m for six months.",
    "Cover looks through to the beneficial owner. A client's share of a pooled account is added to their own deposits at the same banking licence.",
    "Payouts can take up to three months where beneficial ownership isn't obvious.",
    "Large companies are generally ineligible.",
    "Firms need client consent to share details with the FSCS.",
    "E-money and payment firms' customer funds have no FSCS protection. The FCA reported average shortfalls of 65% in payment firms that failed between 2018 and 2023."
  ],
  fscsOpportunity: "Banks that can produce FSCS-ready beneficiary data for client accounts, and help firms spread large balances across banking licences, have a real selling point.",

  // [topic, resolution]
  corrections: [
    ["Griffin eligibility", "Corrected. Griffin offers client money accounts for CASS, CMP and SRA use, not CASS only."],
    ["FSCS limits", "Updated to £120k and £1.4m from 1 Dec 2025."],
    ["Pooled-account AML changes", "Confirmed: in force 30 June 2026 for new pooled accounts (SI 2026/621)."],
    ["Account closure notice", "The “2 months' notice” evidence predates new rules: 90 days, with reasons, for payment accounts opened from 28 April 2026."],
    ["E-money statutory trust", "Not yet in force. It belongs to a later, paused stage of the FCA reforms."]
  ],

  accountTypesIntro: "Every type is a variation on one idea: money held on trust for someone else, kept separate from the firm's own money, which the bank acknowledges it can't use against the firm's debts.",
  // [account type, main users, governing rules, key features]
  accountTypes: [
    ["General (pooled) client account", "Solicitors, accountants, letting agents, insurance brokers", "SRA Accounts Rules; ICAEW; CMP scheme rules; CASS 7 and 5", "Many clients in one account; firm keeps the client ledger; bank acknowledges trust status and waives set-off"],
    ["Designated client account", "Solicitors (large or long-held sums), deputies, IPs", "SRA Accounts Rules; CASS 7", "One client per account; interest attributable to that client; admin-heavy at scale"],
    ["Notice or fixed-term client deposit", "CASS firms, law firms with large balances", "CASS 7 limits on unbreakable deposits; SRA fair sum", "Higher rates for less liquidity"],
    ["CASS 7 client bank account", "Investment firms, wealth managers, platforms", "CASS 7.13 and 7.18", "No money in until a countersigned acknowledgement letter is held; daily reconciliations"],
    ["CASS 5 insurance client money account", "Insurance intermediaries", "CASS 5", "Statutory trust by default; non-statutory trust allows credit to insureds"],
    ["Safeguarding account", "E-money and payment institutions", "Payment and e-money regulations plus CASS 15", "Segregated from own funds; acknowledgement letters; monthly returns, audit, resolution pack"],
    ["Estate account", "Insolvency practitioners", "Insolvency rules; professional body", "One account per estate"],
    ["Rent and deposit client account", "Letting agents", "CMP rules; tenancy deposit schemes", "Client account needed before CMP cover"],
    ["Deputyship account", "Professional deputies and attorneys", "OPG guidance", "Designated account, often with card access"],
    ["TPMA, escrow or paying agent", "Law firms, conveyancers, M&A", "SRA Accounts Rule 2.5; CLC approval; payments authorisation", "Provider holds the funds; the firm is not “holding” client money"],
    ["Virtual accounts or sub-ledgers", "Platforms, EMIs, CASS firms, property software", "Provider controls", "An identifier on a real account for matching; not separately protected"]
  ],

  registerIntro: "The onboarding system looks up regulatory status automatically, stores the result as evidence and re-checks it when things change. The stop rule: an application for a client money account from a firm without client money permission stops.",
  // [register, what to check, how it can be automated]
  registerChecks: [
    ["FCA Financial Services Register", "Authorisation, permissions, restrictions such as “may not hold client money”, approved individuals", "FCA register API"],
    ["SRA register", "Firm authorised; no intervention, closure or conditions", "Published register; confirm what data access the SRA offers organisations"],
    ["CMP, redress schemes, Propertymark", "CMP cover, TPO or PRS membership, Propertymark membership", "Likely no public API; member lists or data-sharing agreements (semi-automated)"],
    ["HMRC AML supervised business register", "Registration where required", "GOV.UK checker"],
    ["Companies House", "Directors, people with significant control, filings", "Companies House API"],
    ["CLC, ICAEW/ACCA, IP register", "Authorisation or licence", "Public directories"]
  ],
  registerNote: "Registers can lag behind reality, and a clean entry shows a firm's status, not its conduct.",

  axiom: {
    intro: "The main reason the SRA is tightening client money oversight.",
    happened: [
      ["Apr–Jul 2023", "Axiom DWFM buys Ince Gordon Dadds, then Plexus Legal, out of administration."],
      ["Jul 2023", "A large client account shortfall is found after an SRA visit."],
      ["3 Oct 2023", "The SRA intervenes and closes the firm. About 1,400 jobs affected and about £64m of client money missing."],
      ["Dec 2024", "The SFO charges five men, including the CEO and CFO."],
      ["Late 2024", "An LSB-commissioned review finds the SRA's handling inadequate. Failing to ringfence the account after July 2023 allowed about £36m more to be lost."],
      ["15 Feb 2027", "Criminal trial due to start. The charges are unproven."]
    ],
    matters: [
      "It sits directly behind the SRA's 2027 reforms: mandatory report submission, separate compliance roles, and scrutiny of acquisitive firms.",
      "It fuels the TPMA debate: if firms don't hold client money, it can't be misused.",
      "Banks see client account flows in real time. Alerts on unusual outflows, and balance confirmations sent directly to the reporting accountant or regulator, are where a bank can add protection.",
      "The Compensation Fund had paid £37.2m in grants by October 2025. Nothing in the public record suggests the banks involved were at fault."
    ]
  }
};
