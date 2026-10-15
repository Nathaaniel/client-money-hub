/* Run with `npm test`. Checks the data hangs together and the selector logic still works
   after edits, before you rebuild the HTML file. */
import test from "node:test";
import assert from "node:assert/strict";

import { CONFIG, SECTORS } from "../src/config.js";
import { SELECTOR } from "../src/data/selector.js";
import { JOURNEYS } from "../src/data/journeys.js";
import { decide, outcomeKey, possibleOutcomes, whatIf } from "../src/logic/selector.js";
import { buildContent } from "../scripts/content.js";

const sectorKeys = SECTORS.map(s => s.key);
const channelKeys = SELECTOR.channels.map(c => c.key);

test("every example firm has selector data", () => {
  for (const key of sectorKeys) {
    assert.ok(SELECTOR.presets[key], `selector preset missing for "${key}"`);
    assert.ok(SELECTOR.known[key], `selector known-customer data missing for "${key}"`);
  }
  assert.ok(sectorKeys.includes(CONFIG.defaultSector), "CONFIG.defaultSector must be a key from SECTORS");
});

test("every selector version has a journey", () => {
  for (const key of channelKeys) {
    const journey = JOURNEYS[key];
    assert.ok(journey?.stages?.length, `no journey for "${key}"`);
    assert.ok(journey.stages.some(s => s.selector), `the "${key}" journey never reaches the selector`);
    for (const s of journey.stages) {
      for (const part of ["name", "where", "firm", "bank"]) assert.ok(s[part], `"${key}" stage "${s.name}" has no ${part}`);
      if (s.handoff) assert.ok(channelKeys.includes(s.handoff), `"${key}" stage "${s.name}" hands off to unknown version "${s.handoff}"`);
    }
  }
  for (const row of JOURNEYS.compare) assert.equal(row.length, channelKeys.length + 1, `comparison row "${row[0]}" needs one cell per version`);
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
    assert.ok(field.staffLabel, `question "${field.id}" has no staff label`);
    for (const [value] of field.options) assert.ok(field.say.phrases[value], `question "${field.id}" has no phrase for "${value}"`);
  }
});

test("selector possible outcomes narrow as questions are answered", () => {
  const all = possibleOutcomes({ register: "clean" }, SELECTOR.fields);
  for (const { key, outcome } of all) {
    if (outcome.stop) assert.ok(SELECTOR.stops[outcome.stop]?.customer && SELECTOR.stops[outcome.stop]?.staff, `no stop wording for "${outcome.stop}"`);
    else if (outcome.regime !== "cass15") assert.ok(SELECTOR.plain[key], `no plain-English name for structure "${key}"`);
  }
  const lettings = SELECTOR.presets.lettings;
  assert.deepEqual(possibleOutcomes(lettings, SELECTOR.fields).map(p => p.key), [outcomeKey(decide(lettings))], "a full set of answers has one outcome");
  const partial = { register: "clean", regime: "cmp", clients: "mid" };
  const some = possibleOutcomes(partial, SELECTOR.fields).map(p => p.key);
  assert.ok(some.length > 1 && some.length < all.length, "a partial set of answers narrows the outcomes");
  assert.ok(some.includes(outcomeKey(decide(lettings))), "the eventual outcome is among the possible ones");
});

test("selector known-customer data matches the sector", () => {
  for (const key of sectorKeys) assert.equal(SELECTOR.known[key].regime, SELECTOR.presets[key].regime, `known regime for "${key}" differs from its preset`);
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

test("the Copilot export covers every question, structure and journey", () => {
  const text = buildContent({ date: "2026-01-01" });
  for (const f of SELECTOR.fields.filter(f => !f.demo)) assert.ok(text.includes(f.label), `export is missing question "${f.id}"`);
  for (const name of [...Object.values(SELECTOR.plain), SELECTOR.plainCass15]) assert.ok(text.includes(name), `export is missing structure "${name}"`);
  for (const c of SELECTOR.channels) for (const s of JOURNEYS[c.key].stages) assert.ok(text.includes(s.firm), `export is missing a "${c.key}" journey stage`);
  assert.ok(!text.includes("Varies:"), "the rules table has a cell the logic doesn't settle; rewrite combinations() in scripts/content.js");
});
