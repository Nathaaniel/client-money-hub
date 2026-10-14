import { useState } from "react";
import { COMMITMENTS, JOURNEY, JOURNEY_HEAD } from "../data/journey.js";
import { LensNote, PageHead, Section } from "../components/ui.jsx";

function Row({ label, cells, stage }) {
  const cellClass = (i, text) => [i === stage ? "on" : "", text === "None" ? "none" : ""].join(" ").trim() || undefined;
  return (
    <tr>
      <th scope="row">{label}</th>
      {cells.map((text, i) => <td key={i} className={cellClass(i, text)}>{text}</td>)}
    </tr>
  );
}

export default function Journey({ sector, go }) {
  const [stage, setStage] = useState(5); // "Run"
  const software = JOURNEY.software[sector];
  const rules = JOURNEY.rules[sector];
  const current = JOURNEY.stages[stage];

  return (
    <section className="panel">
      <PageHead {...JOURNEY_HEAD} />

      <Section title="Six commitments behind the end state">
        <div className="grid g3">
          {COMMITMENTS.map(c => (
            <div className="card commit" key={c.k}>
              <span className="k">{c.k}</span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Service blueprint">
        <LensNote sector={sector} text="Change the sector in the header to see its software and rules." />
        <div className="table-wrap">
          <table className="blueprint">
            <colgroup>
              <col style={{ width: 120 }} />
              {JOURNEY.stages.map((_, i) => <col key={i} />)}
            </colgroup>
            <thead>
              <tr>
                <th>Stage</th>
                {JOURNEY.stages.map((st, i) => (
                  <th key={st.name} className={i === stage ? "on" : undefined}>
                    <button type="button" className="stage-btn" aria-pressed={i === stage} onClick={() => setStage(i)}>
                      <span>{i + 1}</span>{st.name}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <Row label="Firm does" cells={JOURNEY.firm} stage={stage} />
              <Row label="Bank does" cells={JOURNEY.bank} stage={stage} />
              <Row label="Software does" cells={software} stage={stage} />
              <Row label="Rule it meets" cells={rules} stage={stage} />
              <tr>
                <th scope="row">See it</th>
                {JOURNEY.stages.map((st, i) => (
                  <td key={st.name} className={i === stage ? "on" : undefined}>
                    <button type="button" className="linkbtn" onClick={() => go(st.page)}>{st.screen}</button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card section">
          <div className="toolbar">
            <h3 style={{ margin: 0 }}>Stage {stage + 1} · {current.name}</h3>
            <button type="button" className="btn primary sm" onClick={() => go(current.page)}>Open {current.screen}</button>
          </div>
          <p>{current.good}</p>
          <div className="grid g2">
            <div><h4>Software does</h4><p>{software[stage]}</p></div>
            <div><h4>Rule it meets</h4><p>{rules[stage]}</p></div>
          </div>
        </div>
      </Section>
    </section>
  );
}
