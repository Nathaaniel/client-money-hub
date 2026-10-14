import { useState } from "react";
import { CONFIG, sectorLabel } from "../config.js";
import { SCORECARD } from "../data/scorecard.js";
import { EQUAL_WEIGHTS, hasAllScores, weightedScore } from "../logic/scoring.js";
import { Callout, Chips, PageHead, Section } from "../components/ui.jsx";

function Mini({ value }) {
  return (
    <span className="mini" title={`${value} of 5`}>
      {[1, 2, 3, 4, 5].map(i => <i key={i} className={i <= value ? "on" : ""} />)}
    </span>
  );
}

export default function Scorecard({ sector }) {
  const { dims, providers, ourScores } = SCORECARD;
  const [mode, setMode] = useState("sector");
  const [selected, setSelected] = useState(providers[0].name);

  const weights = mode === "equal" ? EQUAL_WEIGHTS : SCORECARD.weights[sector];
  const rows = providers.map(p => ({ p, score: weightedScore(p.s, weights, dims), selectable: true }));
  if (hasAllScores(ourScores, dims)) {
    rows.push({ p: { name: `${CONFIG.bankName} today`, type: "Us", s: ourScores }, score: weightedScore(ourScores, weights, dims), selectable: false });
  }
  rows.sort((a, b) => b.score - a.score);
  const detail = providers.find(p => p.name === selected);

  const select = (row, e) => {
    if (!row.selectable) return;
    if (e.type === "keydown" && e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    setSelected(row.p.name);
  };

  return (
    <section className="panel">
      <PageHead {...SCORECARD.head} />

      <div className="toolbar">
        <span className="lens-note">
          {mode === "equal" ? "Equal weights across the six commitments." : <>Weighted for <b>{sectorLabel(sector)}</b>, the sector selected in the header.</>}
        </span>
        <Chips items={[{ key: "sector", label: "Weight by sector" }, { key: "equal", label: "Equal weights" }]} value={mode} onChange={setMode} />
      </div>

      <div className="table-wrap">
        <table className="data">
          <thead>
            <tr><th>Provider</th><th>Type</th><th>Weighted score</th><th>{dims.map(d => d.short).join(" · ")}</th></tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr
                key={row.p.name}
                className={row.p.name === selected ? "score-row is-on" : "score-row"}
                tabIndex={row.selectable ? 0 : undefined}
                onClick={e => select(row, e)}
                onKeyDown={e => select(row, e)}
              >
                <td>{row.p.name}</td>
                <td className="muted">{row.p.type}</td>
                <td>
                  <div className="wbar">
                    <div className="bar-track"><div className="bar-fill" style={{ width: `${(row.score / 5) * 100}%` }} /></div>
                    <span className="num">{row.score.toFixed(1)}</span>
                  </div>
                </td>
                <td className="nowrap">{dims.map(d => <Mini key={d.key} value={row.p.s[d.key]} />)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card grid g3">
        <div>
          <h4>{detail.name}</h4>
          {dims.map(d => <div className="toolbar small" key={d.key}><span>{d.label}</span><Mini value={detail.s[d.key]} /></div>)}
        </div>
        <div>
          <h4>Biggest strength</h4><p>{detail.strength}</p>
          <h4>Biggest gap</h4><p>{detail.gap}</p>
        </div>
        <div><h4>What it tells us</h4><p>{detail.learn}</p></div>
      </div>

      <Section title="How to win, by bank type">
        <div className="grid g3">
          {SCORECARD.plans.map(plan => (
            <div className="card" key={plan.title}>
              <h3 style={{ marginBottom: 2 }}>{plan.title}</h3>
              <p className="small muted">{plan.sub}</p>
              <ol className="list">{plan.steps.map(step => <li key={step}>{step}</li>)}</ol>
            </div>
          ))}
        </div>
        <Callout title="Common to all">{SCORECARD.commonToAll}</Callout>
      </Section>

      <p className="small muted">Scores are judgements from public material, not verified benchmarks. {SCORECARD.notScored}</p>
    </section>
  );
}
