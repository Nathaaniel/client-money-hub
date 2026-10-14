import { JOURNEYS } from "../data/journeys.js";
import { SELECTOR } from "../data/selector.js";
import { PageHead } from "../components/ui.jsx";

/* One journey as a map: a column per stage, with rows for where it happens, the firm and the bank. */
function JourneyMap({ channel, onTry }) {
  const { key, label } = channel;
  const { summary, stages } = JOURNEYS[key];
  const handoffLabel = k => SELECTOR.channels.find(c => c.key === k).label;
  return (
    <section className="journey card" aria-labelledby={`j-${key}`}>
      <div className="journey-head">
        <div>
          <h3 id={`j-${key}`}>{label}</h3>
          <p className="muted">{summary}</p>
        </div>
        <button type="button" className="btn" onClick={() => onTry(key)}>Try it in the selector</button>
      </div>
      <div className="jmap-wrap" tabIndex={0} aria-label={`${label} journey map`}>
        <ol className="jmap" style={{ "--n": stages.length }}>
          {stages.map((s, i) => (
            <li key={s.name} className={s.selector ? "jstage is-sel" : "jstage"}>
              <div className="jstage-head">
                <span className="jnum">{i + 1}</span>
                <b>{s.name}</b>
              </div>
              <div className="jwhere">{s.where}{s.selector && s.where !== "Selector" && <span className="pill brand">Selector</span>}</div>
              <div className="jlane"><span className="jlane-label">The firm</span>{s.firm}</div>
              <div className="jlane bank"><span className="jlane-label">The bank</span>{s.bank}</div>
              {s.handoff && <div className="jhandoff">Continues in {handoffLabel(s.handoff)}</div>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function Journeys({ onTry }) {
  return (
    <section className="panel">
      <PageHead {...JOURNEYS.head} />

      <div className="table-wrap">
        <table className="compare">
          <caption className="sr-only">The three journeys compared</caption>
          <thead>
            <tr><th scope="col"><span className="sr-only">Topic</span></th>{SELECTOR.channels.map(c => <th scope="col" key={c.key}>{c.label}</th>)}</tr>
          </thead>
          <tbody>
            {JOURNEYS.compare.map(([topic, ...cells]) => (
              <tr key={topic}><th scope="row">{topic}</th>{cells.map((c, i) => <td key={i}>{c}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>

      {SELECTOR.channels.map(c => <JourneyMap key={c.key} channel={c} onTry={onTry} />)}
    </section>
  );
}
