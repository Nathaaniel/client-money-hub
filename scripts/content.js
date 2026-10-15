/* Builds a readable Markdown document of everything in the selector: the questions, how the
   recommendation is decided, the wording for each outcome, the example firms and the journeys.
   It reads the same data and logic as the app, so it stays accurate after edits.
   Used by `npm run export` (scripts/export-content.js) and checked by `npm test`. */
import { CONFIG, SECTORS } from "../src/config.js";
import { SELECTOR } from "../src/data/selector.js";
import { JOURNEYS } from "../src/data/journeys.js";
import { decide, outcomeKey, possibleOutcomes, whatIf } from "../src/logic/selector.js";

const QUESTIONS = SELECTOR.fields.filter(f => !f.demo);
const REGISTER = SELECTOR.fields.find(f => f.demo);
const fieldOf = id => SELECTOR.fields.find(f => f.id === id);
const optionLabel = (field, value) => field.options.find(([v]) => v === value)?.[1];
const plainName = o => (o.regime === "cass15" ? SELECTOR.plainCass15 : SELECTOR.plain[o.rec.join(",")]);
const stopTitle = (stop, audience) => SELECTOR.stops[stop][audience][0];
const outcomeName = o => (o.stop ? stopTitle(o.stop, "customer") : plainName(o));

/* Markdown helpers. */
const cell = text => String(text ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
const table = (head, rows) => [
  `| ${head.map(cell).join(" | ")} |`,
  `| ${head.map(() => "---").join(" | ")} |`,
  ...rows.map(r => `| ${r.map(cell).join(" | ")} |`)
].join("\n");
const bullets = items => items.map(i => `- ${i}`).join("\n");

/* The sentence about the firm, as the customer versions show it once every question is answered. */
const sentence = answers => QUESTIONS.map(f => `${f.say.before} ${f.say.phrases[answers[f.id]]}${f.say.after}`).join(" ");

/* A firm with no risk factors, used as the starting point when showing what single answers do. */
const BASE = { register: "clean", regime: "cmp", clients: "mid", hold: "short", interest: "no", fscs: "no", data: "yes", aml: "low", fraud: "no" };

function versions() {
  return [
    "## The three versions",
    "The selector comes in three versions. They share one set of questions and rules.",
    table(["Version", "Who it's for", "What it does"], SELECTOR.channels.map(c => [c.label, c.who, c.keyMessage]))
  ].join("\n\n");
}

function questions() {
  const out = ["## The questions", "Asked in this order. The online banking version skips the first question, because the regulator is already known from the register."];
  QUESTIONS.forEach((f, i) => {
    out.push(`### ${i + 1}. ${f.label}`);
    const facts = [`Relationship manager version shows: ${f.staffLabel}`];
    if (f.hint) facts.push(`Hint: ${f.hint}`);
    facts.push(`In the sentence about the firm: "${f.say.before} [answer]${f.say.after}"`);
    out.push(bullets(facts));
    out.push(table(["Answer", "Detail", "Reads in the sentence as"], f.options.map(([v, label, detail]) => [label, detail ?? "", f.say.phrases[v]])));
  });
  out.push("### Register check (not asked)");
  out.push(`The bank checks the firm's register entry itself. The possible results are: ${REGISTER.options.map(([, l]) => l).join(", ")}. The public website version only checks when the firm applies; the online banking and relationship manager versions check before any questions.`);
  return out.join("\n\n");
}

/* Every answer that, on its own, stops the firm being offered an account. */
function stops() {
  const rows = [];
  for (const f of [REGISTER, fieldOf("regime")]) {
    for (const [v, label] of f.options) {
      const o = decide({ ...BASE, [f.id]: v });
      if (o.stop) rows.push([`${f.id === "register" ? "Register check" : "Rules"}: ${label}`, SELECTOR.stops[o.stop].customer.join(". "), SELECTOR.stops[o.stop].staff.join(". ")]);
    }
  }
  return ["### When no account is offered", table(["Trigger", "What customers see", "What staff see"], rows)].join("\n\n");
}

/* Single answers that settle the structure whatever else the firm says, for every regime that gets an account. */
function settlers() {
  const regimes = fieldOf("regime").options.map(([v]) => v).filter(r => !decide({ ...BASE, regime: r }).stop);
  const rows = [];
  // Regimes whose structure is fixed by the regime alone.
  for (const r of regimes) {
    const found = possibleOutcomes({ register: "clean", regime: r }, SELECTOR.fields).filter(p => !p.outcome.stop);
    if (found.length === 1) rows.push([`Rules: ${optionLabel(fieldOf("regime"), r)}`, outcomeName(found[0].outcome), "Always, whatever the other answers"]);
  }
  const flexible = regimes.filter(r => possibleOutcomes({ register: "clean", regime: r }, SELECTOR.fields).filter(p => !p.outcome.stop).length > 1);
  for (const f of QUESTIONS.filter(q => q.id !== "regime")) {
    for (const [v, label] of f.options) {
      const keys = new Set();
      let outcome;
      for (const r of flexible) {
        for (const p of possibleOutcomes({ register: "clean", regime: r, [f.id]: v }, SELECTOR.fields)) { keys.add(p.key); outcome = p.outcome; }
      }
      if (keys.size === 1) rows.push([`${f.short}: ${label}`, outcomeName(outcome), `For any rules except ${regimes.filter(r => !flexible.includes(r)).map(r => optionLabel(fieldOf("regime"), r)).join(", ")}`]);
    }
  }
  return ["### Answers that decide the structure on their own", table(["Answer", "Structure", "When"], rows)].join("\n\n");
}

/* How clients and the long-term factors combine, for a firm with no answer that decides it on its own.
   Every combination is checked, so the table is exact. */
function combinations() {
  const factors = [["hold", "long"], ["interest", "yes"], ["fscs", "often"]];
  const factorText = factors.map(([id, v]) => `${fieldOf(id).short}: ${optionLabel(fieldOf(id), v)}`).join("; ");
  const counts = [0, 1, 2, 3];
  const rows = fieldOf("clients").options.map(([cv, cl]) => {
    const byCount = counts.map(() => new Set());
    const names = counts.map(() => new Map());
    for (const [hv] of fieldOf("hold").options) for (const [iv] of fieldOf("interest").options) for (const [fv] of fieldOf("fscs").options) {
      const a = { ...BASE, clients: cv, hold: hv, interest: iv, fscs: fv };
      const k = factors.filter(([id, v]) => a[id] === v).length;
      const o = decide(a);
      byCount[k].add(outcomeKey(o));
      names[k].set(outcomeKey(o), outcomeName(o));
    }
    return [`Clients: ${cl}`, ...counts.map(k => (byCount[k].size === 1 ? [...names[k].values()][0] : `Varies: ${[...names[k].values()].join(" or ")}`))];
  });
  return [
    "### How the other answers combine",
    `For a firm that can supply client data and whose AML risk is low or medium, the structure depends on how many clients it holds money for, and how many of these long-term factors apply: ${factorText}.`,
    table(["", "None of the factors", "1 factor", "2 factors", "All 3 factors"], rows)
  ].join("\n\n");
}

function structures() {
  // Per regime, as two regimes can give the same cells with different names (CASS 15 safeguarding).
  const all = fieldOf("regime").options.flatMap(([r]) => possibleOutcomes({ register: "clean", regime: r }, SELECTOR.fields)).filter(p => !p.outcome.stop);
  const seen = new Set();
  const rows = [];
  for (const { outcome } of all) {
    const id = `${outcome.regime === "cass15" ? "cass15:" : ""}${outcome.rec.join(",")}`;
    if (seen.has(id)) continue;
    seen.add(id);
    rows.push([plainName(outcome), outcome.verdict, outcome.rec.map(c => SELECTOR.cells[c][0]).join(", ")]);
  }
  return [
    "### The structures",
    "Customers see the plain-English name; relationship managers see the bank's name and the parts it's made of.",
    table(["Customer name", "Bank name", "Made of"], rows),
    "### The parts",
    table(["Part", "What it is"], Object.values(SELECTOR.cells))
  ].join("\n\n");
}

function regimes() {
  const out = ["## What each regime needs",
    `Everyone receives:\n\n${bullets(SELECTOR.receiveCommon)}`,
    `The bank always does:\n\n${bullets(SELECTOR.bankCommon)}`,
    `For a pooled account, the firm also provides: ${SELECTOR.pooledProvide}. The bank also does: ${SELECTOR.pooledBank}.`];
  for (const r of Object.values(SELECTOR.regimes)) {
    out.push(`### ${r.name}`);
    out.push(`What the firm provides:\n\n${bullets(r.provide)}`);
    out.push(`How the firm stays compliant:\n\n${bullets(r.biz)}`);
    out.push(`How the bank stays compliant:\n\n${bullets(r.bank)}`);
  }
  return out.join("\n\n");
}

function examples() {
  const out = ["## Example firms", "Fictional firms used in the prototype. Bracketed values are placeholders."];
  for (const { key, label } of SECTORS) {
    const answers = SELECTOR.presets[key];
    const known = SELECTOR.known[key];
    const o = decide(answers);
    out.push(`### ${label}: ${known.firm}`);
    out.push(bullets([
      `Existing customer details: ${known.number}; ${known.registerRef} on the ${known.register}; with the bank since ${known.since}; ${known.products.join(", ")}`,
      `Bank's own risk rating (staff only): ${known.bankRisk}`
    ]));
    out.push(`Answers, as the sentence reads: "${sentence(answers)}"`);
    if (o.stop) { out.push(`Outcome: ${stopTitle(o.stop, "staff")}`); continue; }
    out.push(`Suggested account: **${plainName(o)}** (bank name: ${o.verdict}).`);
    out.push(`Why:\n\n${bullets(o.reasons)}`);
    if (o.flags.length) out.push(`Points to check:\n\n${bullets(o.flags)}`);
    if (o.also.length) out.push(`Also consider:\n\n${bullets(o.also)}`);
    const changes = whatIf(answers, SELECTOR.fields);
    if (changes.length) {
      out.push(`What would change it:\n\n${bullets(changes.map(g => `${outcomeName(g.outcome)}, if ${g.changes.map(c => `${fieldOf(c.field).short}: ${optionLabel(fieldOf(c.field), c.value)}`).join(" or ")}`))}`);
    }
  }
  return out.join("\n\n");
}

function journeys() {
  const out = ["## Journeys", JOURNEYS.head.keyMessage,
    table(["", ...SELECTOR.channels.map(c => c.label)], JOURNEYS.compare)];
  for (const c of SELECTOR.channels) {
    const j = JOURNEYS[c.key];
    out.push(`### ${c.label}`);
    out.push(j.summary);
    out.push(table(["#", "Stage", "Where", "The firm", "The bank", "In the selector"], j.stages.map((s, i) => [
      i + 1, s.name, s.where, s.firm, s.bank + (s.handoff ? ` Continues in ${SELECTOR.channels.find(x => x.key === s.handoff).label}.` : ""), s.selector ? "Yes" : ""
    ])));
  }
  return out.join("\n\n");
}

export function buildContent({ date = new Date().toISOString().slice(0, 10) } = {}) {
  return [
    `# ${CONFIG.productName}: content`,
    `${CONFIG.bankName}'s client money account selector prototype, as a single readable document. Generated from the prototype's data and rules on ${date}; run \`npm run export\` again after any edit. The logic is illustrative, not legal advice.`,
    versions(),
    questions(),
    "## How the recommendation is decided",
    stops(),
    settlers(),
    combinations(),
    structures(),
    regimes(),
    examples(),
    journeys()
  ].join("\n\n") + "\n";
}
