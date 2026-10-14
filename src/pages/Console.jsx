import { useState } from "react";
import { CONSOLE, CONSOLE_HEAD } from "../data/console.js";
import { nextEvent, startLedger, summarise } from "../logic/ledger.js";
import { gbp } from "../logic/format.js";
import { LensNote, PageHead, Pill } from "../components/ui.jsx";

export default function Console({ sector }) {
  const data = CONSOLE[sector];
  const [state, setState] = useState(() => startLedger(data));
  const { ledger, diff, checks, exceptions } = summarise(state, data);
  const upcoming = data.events[state.step];

  const kpis = [
    ["Held at bank", gbp(state.bank)],
    ["Client ledger total", gbp(ledger)],
    ["Difference", gbp(diff)],
    ["Unallocated", gbp(state.sus)],
    ["Open exceptions", String(exceptions)]
  ];

  return (
    <section className="panel">
      <PageHead {...CONSOLE_HEAD} />

      <div className="toolbar">
        <LensNote as="span" sector={sector} />
        <div className="chips">
          <button type="button" className="btn" onClick={() => setState(startLedger(data))}>Reset</button>
          <button type="button" className="btn primary" disabled={!upcoming} onClick={() => setState(s => nextEvent(s, data))}>Next event</button>
        </div>
      </div>
      <p className="next">
        {upcoming ? <>Next: <b>{upcoming.t}</b></> : "All events played. Select Reset to start again, or change the sector in the header."}
      </p>
      <div className="small muted">{data.firm}</div>

      <div className="kpis">
        {kpis.map(([label, value]) => (
          <div className="kpi" key={label}><div className="l">{label}</div><div className="v">{value}</div></div>
        ))}
      </div>

      <div className="grid g2">
        <div className="section">
          <h3>Client ledger</h3>
          <div className="table-wrap">
            <table className="data plain">
              <thead><tr><th>Client / matter</th><th className="num">Balance</th></tr></thead>
              <tbody>
                {state.rows.map(r => (
                  <tr key={r.id}><td>{r.name}</td><td className={r.bal < 0 ? "num neg" : "num"}>{gbp(r.bal)}</td></tr>
                ))}
                {state.sus !== 0 && <tr><td><Pill tone="warn">Unallocated</Pill></td><td className="num">{gbp(state.sus)}</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
        <div className="section">
          <h3>Compliance checks</h3>
          <div className="card">
            <ul className="checks">
              {checks.map(([label, ok]) => (
                <li key={label}><span>{label}</span><Pill tone={ok ? "ok" : "warn"}>{ok ? "OK" : "Attention"}</Pill></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Event log</h3>
        <div className="card">
          <ul className="log">
            {state.log.length === 0 && <li><Pill>Ready</Pill><span>No events yet. Select Next event to start.</span></li>}
            {state.log.map((ev, i) => (
              <li key={state.log.length - i}>
                <Pill tone={ev.blocked ? "bad" : ev.src === "Bank" ? "brand" : ""}>
                  {ev.blocked ? "Blocked" : ev.src === "Bank" ? "From bank" : "From software"}
                </Pill>
                <span>{ev.t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
