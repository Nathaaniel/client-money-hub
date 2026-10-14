/* Account selector logic: answers in, recommendation out.
   Illustrative only, not legal advice. Tested in test/logic.test.js.

   Returns:
     stop     a key into SELECTOR.stops when the firm can't be offered an account
              (restricted, notfound or noregime); the wording for customers and staff is there
     regime   the regime key used (unsure → cass7, the strictest case)
     rec      recommended cells of the 2×2 grid: rd, rp, vp (vd is never offered)
     verdict, reasons, also, flags   text for the result
     pooled   true when a pooled real account is recommended */
export function decide(v) {
  const o = { stop: null, rec: [], verdict: "", reasons: [], also: [], flags: [], pooled: false };

  if (v.register === "restricted" || v.register === "notfound") {
    o.stop = v.register;
    return o;
  }
  if (v.regime === "none") {
    o.stop = "noregime";
    return o;
  }

  const regime = v.regime === "unsure" ? "cass7" : v.regime;
  if (v.regime === "unsure") o.flags.push("Regime unclear: treated as the strictest case (CASS 7) until confirmed.");
  o.regime = regime;
  if (v.aml === "unsure") o.flags.push("AML risk assessment not confirmed: the bank asks to see it before confirming the account.");

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

/* Identifies an outcome, so two sets of answers can be compared. */
export const outcomeKey = o => (o.stop ? `stop:${o.stop}` : o.rec.join(","));

/* "What would change this": tries every other answer to each question, one at a time,
   and groups the answers that give a different outcome by that outcome.
   Fields marked fixed (facts about the firm) are left out.
   Returns [{ key, outcome, changes: [{ field, value }] }] in field order. */
export function whatIf(answers, fields) {
  const base = outcomeKey(decide(answers));
  const groups = new Map();
  for (const field of fields) {
    if (field.fixed) continue;
    for (const [value] of field.options) {
      if (value === answers[field.id]) continue;
      const outcome = decide({ ...answers, [field.id]: value });
      const key = outcomeKey(outcome);
      if (key === base) continue;
      if (!groups.has(key)) groups.set(key, { key, outcome, changes: [] });
      groups.get(key).changes.push({ field: field.id, value });
    }
  }
  return [...groups.values()];
}

/* Every outcome still possible given the answers so far: tries every combination of
   answers to the unanswered fields (demo fields must already be in answers).
   Returns [{ key, outcome }] in the order first found. */
export function possibleOutcomes(answers, fields) {
  const open = fields.filter(f => !f.demo && answers[f.id] === undefined);
  const found = new Map();
  const walk = (i, v) => {
    if (i === open.length) {
      const outcome = decide(v);
      const key = outcomeKey(outcome);
      if (!found.has(key)) found.set(key, { key, outcome });
      return;
    }
    for (const [value] of open[i].options) walk(i + 1, { ...v, [open[i].id]: value });
  };
  walk(0, answers);
  return [...found.values()];
}
