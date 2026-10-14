/* Home page heatmap: every provider's score on the six commitments, plus our own row. */
import { CONFIG } from "../config.js";
import { SCORECARD } from "../data/scorecard.js";
import { EQUAL_WEIGHTS, heatClass, weightedScore } from "../logic/scoring.js";

function Cell({ score }) {
  if (score === null || score === undefined) return <td className="unk">?</td>;
  return <td className={heatClass(score)}>{score}</td>;
}

export function HeatLegend() {
  return (
    <span className="legend" aria-hidden="true">
      0 {[1, 2, 3, 4, 5].map(n => <i key={n} style={{ background: `var(--heat-${n})` }} />)} 5
    </span>
  );
}

export default function Heatmap() {
  const { dims, providers, ourScores } = SCORECARD;
  const ranked = [...providers].sort(
    (a, b) => weightedScore(b.s, EQUAL_WEIGHTS, dims) - weightedScore(a.s, EQUAL_WEIGHTS, dims)
  );
  return (
    <table className="heat">
      <thead>
        <tr>
          <th>Provider</th>
          {dims.map(d => <th key={d.key}>{d.label}</th>)}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{CONFIG.bankName} today</td>
          {dims.map(d => <Cell key={d.key} score={ourScores[d.key]} />)}
        </tr>
        {ranked.map(p => (
          <tr key={p.name}>
            <td>{p.name}</td>
            {dims.map(d => <Cell key={d.key} score={p.s[d.key]} />)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
