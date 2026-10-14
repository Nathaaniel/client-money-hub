/* Run with `npm test`. Checks the data hangs together and the logic still works
   after edits, before you rebuild the HTML file. */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { CONFIG, PAGE_IDS, SECTORS } from "../src/config.js";
import { PRIORITIES } from "../src/data/home.js";
import { SEGMENTS } from "../src/data/segments.js";
import { JOURNEY } from "../src/data/journey.js";
import { SELECTOR } from "../src/data/selector.js";
import { CONSOLE } from "../src/data/console.js";
import { INTEGRATIONS } from "../src/data/integrations.js";
import { ASSURANCE } from "../src/data/assurance.js";
import { SCORECARD } from "../src/data/scorecard.js";
import { INTERNAL } from "../src/data/internal.js";
import { decide, outcomeKey, whatIf } from "../src/logic/selector.js";
import { nextEvent, startLedger, summarise } from "../src/logic/ledger.js";
import { EQUAL_WEIGHTS, weightedScore } from "../src/logic/scoring.js";

const sectorKeys = SECTORS.map(s => s.key);

test("every sector has data on every sector-driven page", () => {
  for (const key of sectorKeys) {
    assert.ok(CONSOLE[key], `console data missing for "${key}"`);
    assert.ok(INTEGRATIONS[key], `integrations data missing for "${key}"`);
    assert.ok(ASSURANCE[key], `assurance data missing for "${key}"`);
    assert.ok(SELECTOR.presets[key], `selector preset missing for "${key}"`);
    assert.ok(SCORECARD.weights[key], `scorecard weights missing for "${key}"`);
    assert.equal(JOURNEY.software[key]?.length, JOURNEY.stages.length, `journey software row for "${key}" needs one entry per stage`);
    assert.equal(JOURNEY.rules[key]?.length, JOURNEY.stages.length, `journey rules row for "${key}" needs one entry per stage`);
    assert.ok(SEGMENTS.some(s => s.lens === key), `no segment profile belongs to sector "${key}"`);
  }
  assert.ok(sectorKeys.includes(CONFIG.defaultSector), "CONFIG.defaultSector must be a key from SECTORS");
});

test("references between data files are valid", () => {
  for (const s of SEGMENTS) assert.ok(sectorKeys.includes(s.lens), `segment "${s.key}" has unknown sector "${s.lens}"`);
  for (const p of PRIORITIES) assert.ok(sectorKeys.includes(p.sector), `priority has unknown sector "${p.sector}"`);
  for (const st of JOURNEY.stages) assert.ok(PAGE_IDS.includes(st.page), `journey stage "${st.name}" links to unknown page "${st.page}"`);
  assert.equal(JOURNEY.firm.length, JOURNEY.stages.length);
  assert.equal(JOURNEY.bank.length, JOURNEY.stages.length);
});

test("every page in STRUCTURE has a component", () => {
  const index = readFileSync(new URL("../src/pages/index.js", import.meta.url), "utf8");
  for (const id of PAGE_IDS) assert.match(index, new RegExp(`\\b${id}:`), `src/pages/index.js has no component for page "${id}"`);
});

test("selector presets use valid answers", () => {
  for (const [sector, preset] of Object.entries(SELECTOR.presets)) {
    for (const field of SELECTOR.fields) {
      const allowed = field.options.map(([value]) => value);
      assert.ok(allowed.includes(preset[field.id]), `preset "${sector}" has invalid ${field.id}: "${preset[field.id]}"`);
    }
  }
});

test("selector recommendations", () => {
  const base = SELECTOR.presets.lettings;
  assert.ok(decide({ ...base, register: "restricted" }).stop, "a register restriction must stop onboarding");
  assert.ok(decide({ ...base, regime: "none" }).stop, "no regime must not get a client account");
  assert.deepEqual(decide(base).rec, ["rp", "vp"], "a typical letting agent gets pooled plus virtual accounts");
  assert.deepEqual(decide({ ...base, data: "no" }).rec, ["rd"], "no client data means designated only");
  assert.deepEqual(decide(SELECTOR.presets.payments).rec, ["rp", "vp"], "payment firms get a pooled safeguarding account");
  assert.ok(decide(SELECTOR.presets.wealth).rec.includes("rd"), "long holds with interest owed include designated accounts");
  for (const preset of Object.values(SELECTOR.presets)) {
    const o = decide(preset);
    assert.ok(o.stop || SELECTOR.regimes[o.regime], `no regime text for "${o.regime}"`);
  }
});

test("every selector question reads in the sentence for every answer", () => {
  for (const field of SELECTOR.fields.filter(f => !f.demo)) {
    assert.ok(field.say, `question "${field.id}" has no sentence wording`);
    for (const [value] of field.options) assert.ok(field.say.phrases[value], `question "${field.id}" has no phrase for "${value}"`);
  }
});

test("selector what-if only lists answers that change the outcome", () => {
  for (const preset of Object.values(SELECTOR.presets)) {
    const base = outcomeKey(decide(preset));
    for (const group of whatIf(preset, SELECTOR.fields)) {
      assert.notEqual(group.key, base);
      for (const { field, value } of group.changes) {
        assert.ok(!SELECTOR.fields.find(f => f.id === field).fixed, `fixed field "${field}" listed`);
        assert.equal(outcomeKey(decide({ ...preset, [field]: value })), group.key);
      }
    }
  }
  const lettings = whatIf(SELECTOR.presets.lettings, SELECTOR.fields);
  assert.ok(lettings.some(g => g.key === "rd" && g.changes.some(c => c.field === "data" && c.value === "no")), "no client data moves lettings to designated");
});

test("every console scenario reconciles once all events have played", () => {
  for (const key of sectorKeys) {
    const data = CONSOLE[key];
    let state = startLedger(data);
    for (let i = 0; i < data.events.length; i++) state = nextEvent(state, data);
    const { diff, exceptions } = summarise(state, data);
    assert.equal(diff, 0, `"${key}" ends with a reconciliation difference of ${diff}`);
    assert.equal(state.sus, 0, `"${key}" ends with unallocated money`);
    assert.equal(exceptions, 0, `"${key}" ends with open exceptions`);
    for (const ev of data.events) {
      for (const id of Object.keys(ev.ch || {})) {
        assert.ok(data.rows.some(r => r.id === id), `"${key}" event changes unknown ledger row "${id}"`);
      }
    }
  }
});

test("scores are between 0 and 5", () => {
  for (const p of SCORECARD.providers) {
    for (const d of SCORECARD.dims) {
      const v = p.s[d.key];
      assert.ok(typeof v === "number" && v >= 0 && v <= 5, `${p.name} ${d.key} score must be 0–5`);
    }
    const w = weightedScore(p.s, EQUAL_WEIGHTS, SCORECARD.dims);
    assert.ok(w >= 0 && w <= 5);
  }
  for (const d of SCORECARD.dims) {
    const v = SCORECARD.ourScores[d.key];
    assert.ok(v === null || (typeof v === "number" && v >= 0 && v <= 5), `ourScores.${d.key} must be null or 0–5`);
  }
});

test("internal details rows have three columns", () => {
  for (const row of INTERNAL) assert.equal(row.length, 3, `internal row "${row[0]}" needs [topic, position, source]`);
});
