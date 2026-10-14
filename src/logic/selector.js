/* Account selector logic: answers in, recommendation out.
   Illustrative only, not legal advice. Tested in test/logic.test.js.

   Returns:
     stop     [title, text] when the firm can't be offered an account
     regime   the regime key used (unsure → cass7, the strictest case)
     rec      recommended cells of the 2×2 grid: rd, rp, vp (vd is never offered)
     verdict, reasons, also, flags   text for the result
     pooled   true when a pooled real account is recommended */
export function decide(v) {
  const o = { stop: null, rec: [], verdict: "", reasons: [], also: [], flags: [], pooled: false };

  if (v.register === "restricted") {
    o.stop = ["Stop: the bank can't open a client money account", "The register shows a restriction on holding client money. Onboarding stops and the case goes to financial crime and the relationship team. This is the check that would have prevented the WealthTek account."];
    return o;
  }
  if (v.register === "notfound") {
    o.stop = ["Hold: firm not found on the register", "Confirm the regime and registration number before continuing. The bank won't hold client money for a firm it can't verify."];
    return o;
  }
  if (v.regime === "none") {
    o.stop = ["Not eligible for a client account", "Firms without a client money regime are routed to a regulated escrow or TPMA provider, or asked to register first (for example, property sourcing usually counts as estate agency work)."];
    return o;
  }

  const regime = v.regime === "unsure" ? "cass7" : v.regime;
  if (v.regime === "unsure") o.flags.push("Regime unclear: treated as the strictest case (CASS 7) until confirmed.");
  o.regime = regime;

  if (regime === "cass15") {
    o.rec = ["rp", "vp"];
    o.verdict = "Real pooled safeguarding account, with a virtual IBAN per customer for matching";
    o.reasons.push("Safeguarding is pooled by design. Customer funds are segregated from the firm's own money in one or more safeguarding accounts.");
    o.reasons.push("Virtual IBANs match top-ups to customers in real time. They're identifiers, not separate protection.");
    o.also.push("Consider a second safeguarding bank to reduce dependency on one provider.");
    if (v.aml === "high" || v.aml === "none") o.flags.push("High or unassessed AML risk: the bank makes an appetite decision and applies enhanced due diligence before a full application.");
    return o;
  }

  const forceDesignated = v.data === "no" || v.aml === "high" || v.aml === "none";
  let designatedPoints = 0;
  if (v.hold === "long") { designatedPoints++; o.reasons.push("Money is held for more than 3 months, which suits a designated account."); }
  if (v.interest === "yes") { designatedPoints++; o.reasons.push("Interest is owed to individual clients, which is simpler to attribute in designated accounts."); }
  if (v.fscs === "often") { designatedPoints++; o.reasons.push("Large client balances are common. Designated accounts make FSCS attribution clearer."); }
  if (v.clients === "few") designatedPoints++;

  let mode;
  if (forceDesignated) {
    mode = "designated";
    if (v.data === "no") o.reasons.push("You can't supply underlying client data on request, so a pooled account isn't available. Pooled accounts depend on the bank being able to see who the money belongs to.");
    if (v.aml === "high" || v.aml === "none") o.reasons.push("Your AML risk is high or not yet assessed, so designated accounts only until that changes.");
  } else if (designatedPoints >= 2 && v.clients !== "few") {
    mode = "hybrid";
  } else if (designatedPoints >= 2) {
    mode = "designated";
  } else {
    mode = "pooled";
    if (v.clients !== "few") o.reasons.push("Many clients with shorter holds suit one pooled real account.");
    if (v.aml === "low" || v.aml === "medium") o.reasons.push("Your AML risk profile and ability to supply client data support a pooled account.");
  }

  if (mode === "designated") {
    o.rec = ["rd"];
    o.verdict = "Real designated client accounts, one per client";
  }
  if (mode === "hybrid") {
    o.rec = ["rp", "vp", "rd"];
    o.verdict = "Pooled real account for day-to-day money, plus designated accounts for large or long-held sums";
    o.reasons.push("Volume favours pooling, but large or long-held balances are better in designated accounts.");
  }
  if (mode === "pooled") {
    o.rec = v.clients === "few" ? ["rp"] : ["rp", "vp"];
    o.verdict = v.clients === "few" ? "One real pooled client account" : "Real pooled client account, with a virtual account number per client or matter for matching";
    if (v.clients !== "few") o.reasons.push("Virtual account numbers let receipts match automatically. They're identifiers on the real account, not separate protection.");
  }

  if (v.fscs !== "no") o.also.push("Spread large balances across banking licences. Temporary high balance cover (up to £1.4m for six months) applies to qualifying events such as house sale proceeds. The bank can supply beneficiary data for the FSCS single customer view, with client consent.");
  if (v.fraud === "yes" && (regime === "sra" || regime === "icaew")) o.also.push("Consider a third-party managed account (via a TPMA partner) for the riskiest completions or settlements. The firm then isn't holding that client money, and the funds still sit at the bank.");
  if (v.fraud === "yes") o.also.push("Payee check and account verification on every high-value payment, with dual approval above a value threshold.");
  if (regime === "sra" && (v.interest === "yes" || mode !== "pooled")) o.flags.push("ILCA (proposed): 75% of pooled and 50% of designated interest would go to the MoJ. The structure choice may change the interest outcome.");
  if (regime === "cass7" && v.hold === "long") o.also.push("Notice or term deposits within CASS 7 limits on unbreakable deposits, for better rates on long-held balances.");
  if (regime === "cmp") o.also.push("The bank issues a CMP-ready trust acknowledgement and no set-off letter, which is what CMP schemes ask for.");

  o.pooled = o.rec.includes("rp");
  return o;
}
