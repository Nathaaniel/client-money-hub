/* CONSOLE page content (section: The proposition).
   For each sector: a starting client ledger and a scripted sequence of events.

   Event fields:
     src     "Bank" (event from the bank) or "Vendor" (event from the firm's software)
     t       what happened, shown in the event log
     ch      changes to client ledger rows, e.g. { patel: 1450 }
     sus     change to unallocated money
     bank    a bank-only movement not yet in the ledger (creates a reconciliation break)
     blocked true when a control stopped the payment (no money moves)
     info    true when no money moves

   `extra` is one sector-specific compliance check: a label, and a check that
   receives the current ledger state and returns true when healthy.
   The ledger maths is in src/logic/ledger.js; `npm test` checks every sector balances. */
export const CONSOLE_HEAD = {
  eyebrow: "The proposition · customer view",
  title: "Client money console",
  keyMessage: "Money moves on events from the firm's software, and the ledger, reconciliation and controls update as it happens.",
  intro: "Step through events from the bank and from the firm's software. All names and figures are fictional."
};

export const CONSOLE = {
  lettings: {
    firm: "Example Lettings Ltd · pooled client account with a virtual account per tenancy · property software integrated",
    rows: [{ id: "patel", name: "A. Patel, 12 Elm Street", bal: 2350 }, { id: "okafor", name: "B. Okafor, 4 Mill Lane", bal: 4100 }, { id: "hughes", name: "C. Hughes, Flat 3, 9 Quay Road", bal: 1200 }],
    extra: { label: "Tenancy deposits protected in an approved scheme within 30 days", check: () => true },
    events: [
      { src: "Bank", t: "Rent of £1,450 arrives on the virtual account for 12 Elm Street and is matched automatically.", ch: { patel: 1450 } },
      { src: "Bank", t: "Rent of £950 arrives with no usable reference. Held as unallocated.", sus: 950 },
      { src: "Vendor", t: "Agent allocates the £950 to Flat 3, 9 Quay Road in the property software. The bank ledger updates.", sus: -950, ch: { hughes: 950 } },
      { src: "Vendor", t: "Contractor invoice of £320 approved in the maintenance app and paid after a Confirmation of Payee match.", ch: { okafor: -320 } },
      { src: "Vendor", t: "Landlord statements issued. Management fees of £385 swept to the office account.", ch: { patel: -145, okafor: -145, hughes: -95 } },
      { src: "Vendor", t: "Landlord payout of £3,655 to A. Patel by Faster Payments.", ch: { patel: -3655 } },
      { src: "Vendor", t: "A £4,000 payout request for B. Okafor would overdraw the landlord's ledger (£3,635). The bank blocks it.", blocked: true }
    ]
  },
  conveyancing: {
    firm: "Example Law LLP · matter-level virtual accounts on a pooled client account · case management integrated",
    rows: [{ id: "m1041", name: "Matter 1041, Smith purchase", bal: 45000 }, { id: "m1042", name: "Matter 1042, Jones sale", bal: 0 }, { id: "m1038", name: "Matter 1038, completed 6 weeks ago", bal: 212 }],
    extra: { label: "No residual balances on completed matters", check: state => state.rows.find(r => r.id === "m1038").bal === 0 },
    events: [
      { src: "Bank", t: "Mortgage advance of £280,000 arrives by CHAPS on the matter account for 1041.", ch: { m1041: 280000 } },
      { src: "Vendor", t: "Buyer pays the £12,500 balance by pay-by-bank from an account verified in the ID check, linked to the source-of-funds report.", ch: { m1041: 12500 } },
      { src: "Vendor", t: "An email gives new bank details for the seller's solicitor. The payee check fails and payment is held for call-back verification.", blocked: true },
      { src: "Vendor", t: "Case system marks 1041 ready to complete. £337,500 released by CHAPS after payee check and dual approval. Tracking reference sent to the case file.", ch: { m1041: -337500 } },
      { src: "Bank", t: "Sale proceeds of £410,000 arrive for 1042. The client is above the £120k FSCS limit at this bank; temporary high balance cover applies.", ch: { m1042: 410000 } },
      { src: "Vendor", t: "Mortgage redemption of £250,000 paid to the lender.", ch: { m1042: -250000 } },
      { src: "Vendor", t: "Bill issued. Costs of £1,850 moved to the office account with the bill reference.", ch: { m1042: -1850 } },
      { src: "Vendor", t: "Residual £212 on matter 1038 returned to the client.", ch: { m1038: -212 } }
    ]
  },
  payments: {
    firm: "Example Pay Ltd (EMI) · pooled safeguarding account with virtual IBAN per customer · API integrated",
    rows: [{ id: "wallets", name: "Customer funds (e-money issued)", bal: 2450000 }],
    extra: { label: "Funds safeguarded by the end of the next business day", check: () => true },
    events: [
      { src: "Bank", t: "Customer top-ups of £185,000 received and moved into the safeguarding account by the end of the next business day.", ch: { wallets: 185000 } },
      { src: "Vendor", t: "Customer payouts of £92,000 sent by API over Faster Payments.", ch: { wallets: -92000 } },
      { src: "Bank", t: "A £4,300 card chargeback is debited from the safeguarding account. Daily reconciliation shows a shortfall.", bank: -4300 },
      { src: "Vendor", t: "Firm tops up £4,300 from its own funds the same day. Shortfall cleared.", bank: 4300 },
      { src: "Bank", t: "Monthly safeguarding return data generated from the bank ledger.", info: true },
      { src: "Bank", t: "Resolution pack refreshed and retrievable on request.", info: true }
    ]
  },
  wealth: {
    firm: "Example Wealth Platform · CASS 7 general client bank account with per-client ledger · platform integrated",
    rows: [{ id: "a", name: "Client A, SIPP cash", bal: 85000 }, { id: "b", name: "Client B, ISA cash", bal: 140000 }, { id: "c", name: "Client C, general account cash", bal: 22000 }],
    extra: { label: "Interest passed through at the published rate", check: () => true },
    events: [
      { src: "Vendor", t: "Contribution of £20,000 for Client C paid by pay-by-bank and matched.", ch: { c: 20000 } },
      { src: "Bank", t: "Unreferenced receipt of £5,000. Held as unallocated.", sus: 5000 },
      { src: "Vendor", t: "Platform allocates the £5,000 to Client B.", sus: -5000, ch: { b: 5000 } },
      { src: "Bank", t: "Monthly interest of £412 credited at the published pass-through rate, split by client.", ch: { a: 150, b: 220, c: 42 } },
      { src: "Vendor", t: "Client A withdraws £15,000. Paid the same day.", ch: { a: -15000 } },
      { src: "Vendor", t: "A transfer of Client B's cash to the firm's own account without an instruction is blocked. Client money can only go to the client or another client account.", blocked: true }
    ]
  },
  insurance: {
    firm: "Example Brokers Ltd · CASS 5 statutory trust account with virtual account per binder · broking system integrated",
    rows: [{ id: "insA", name: "Premiums due, Insurer A (binder)", bal: 18400 }, { id: "insB", name: "Premiums due, Insurer B", bal: 9200 }, { id: "comm", name: "Commission awaiting calculation", bal: 2100 }, { id: "claims", name: "Claims and refunds due to clients", bal: 0 }],
    extra: { label: "Commission withdrawn only after the client money calculation", check: () => true },
    events: [
      { src: "Bank", t: "Premium of £2,400 arrives on the virtual account for binder A. £2,040 due to the insurer, £360 commission awaiting calculation.", ch: { insA: 2040, comm: 360 } },
      { src: "Vendor", t: "A request to withdraw £2,460 commission before the client money calculation is blocked.", blocked: true },
      { src: "Vendor", t: "Client money calculation run. Commission of £2,460 confirmed as firm money and withdrawn.", ch: { comm: -2460 } },
      { src: "Bank", t: "Claim payment of £1,200 received from Insurer B for a client.", ch: { claims: 1200 } },
      { src: "Vendor", t: "Claim of £1,200 paid to the client.", ch: { claims: -1200 } },
      { src: "Vendor", t: "Bordereau settled: £15,000 paid to Insurer A.", ch: { insA: -15000 } }
    ]
  },
  other: {
    firm: "Example Accountants LLP · client account opened in the app alongside the office account",
    rows: [{ id: "d", name: "Client D, tax refund", bal: 0 }, { id: "e", name: "Client E, money on account", bal: 3000 }, { id: "f", name: "Client F, money on account", bal: 650 }],
    extra: { label: "Bank acknowledgement held for the client account", check: () => true },
    events: [
      { src: "Bank", t: "HMRC tax refund of £4,210 arrives for Client D and is matched by reference.", ch: { d: 4210 } },
      { src: "Vendor", t: "Bill issued. Fee of £350 moved to the office account with the bill reference.", ch: { d: -350 } },
      { src: "Vendor", t: "Balance of £3,860 paid to Client D.", ch: { d: -3860 } },
      { src: "Bank", t: "£500 arrives with no reference. Held as unallocated.", sus: 500 },
      { src: "Vendor", t: "Practice software allocates the £500 to Client E as money on account.", sus: -500, ch: { e: 500 } },
      { src: "Vendor", t: "A £3,500 transfer to the office account without a bill is blocked.", blocked: true }
    ]
  }
};
