/* Client money console maths. Pure functions, tested in test/logic.test.js. */

export function startLedger(sectorData) {
  const rows = sectorData.rows.map(r => ({ ...r }));
  return { rows, sus: 0, bank: rows.reduce((total, r) => total + r.bal, 0), step: 0, log: [] };
}

export function nextEvent(state, sectorData) {
  const ev = sectorData.events[state.step];
  if (!ev) return state;

  const rows = state.rows.map(r => ({ ...r }));
  let sus = state.sus;
  let bank = state.bank;

  if (!ev.blocked && !ev.info) {
    let moved = 0;
    for (const [id, delta] of Object.entries(ev.ch || {})) {
      rows.find(r => r.id === id).bal += delta;
      moved += delta;
    }
    if (ev.sus) {
      sus += ev.sus;
      moved += ev.sus;
    }
    bank += moved + (ev.bank || 0);
  }

  return { rows, sus, bank, step: state.step + 1, log: [ev, ...state.log] };
}

export function summarise(state, sectorData) {
  const ledger = state.rows.reduce((total, r) => total + r.bal, 0) + state.sus;
  const diff = state.bank - ledger;
  const checks = [
    ["Acknowledgement letter countersigned and on file", true],
    ["Bank balance reconciles to client ledger", Math.abs(diff) < 0.5],
    ["No unallocated receipts", state.sus === 0],
    ["No client ledger in debit", state.rows.every(r => r.bal >= 0)],
    [sectorData.extra.label, sectorData.extra.check(state)]
  ];
  return { ledger, diff, checks, exceptions: checks.filter(([, ok]) => !ok).length };
}
