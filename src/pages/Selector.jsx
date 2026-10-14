import { useState } from "react";
import { SELECTOR } from "../data/selector.js";
import { decide } from "../logic/selector.js";
import { Callout, LensNote, List, PageHead } from "../components/ui.jsx";

/* One cell of the real/virtual × designated/pooled grid. */
function Cell({ id, rec }) {
  const [title, text] = SELECTOR.cells[id];
  const recommended = rec.includes(id);
  const className = ["cell", recommended ? "is-rec" : "", id === "vd" ? "is-na" : ""].join(" ").trim();
  return (
    <div className={className}>
      <b>{title}</b>
      {text}
      {recommended && <span className="tag pill brand">Recommended</span>}
    </div>
  );
}

function Result({ o }) {
  if (o.stop) {
    return (
      <>
        <div className="stop">
          <strong>{o.stop[0]}</strong>
          <p style={{ marginTop: 6 }}>{o.stop[1]}</p>
        </div>
        <Callout title="Why the bank checks first">{SELECTOR.registerExplainer}</Callout>
      </>
    );
  }

  const regime = SELECTOR.regimes[o.regime];
  const provide = [...regime.provide, ...(o.pooled ? [SELECTOR.pooledProvide] : [])];
  const bankDuties = [...regime.bank, ...SELECTOR.bankCommon, ...(o.pooled ? [SELECTOR.pooledBank] : [])];

  return (
    <>
      <div className="card section">
        <h4>Recommended structure</h4>
        <p className="verdict">{o.verdict}</p>
        <div className="matrix">
          <span />
          <span className="mh">Designated</span>
          <span className="mh">Pooled</span>
          <span className="mh row">Real</span>
          <Cell id="rd" rec={o.rec} />
          <Cell id="rp" rec={o.rec} />
          <span className="mh row">Virtual</span>
          <Cell id="vd" rec={o.rec} />
          <Cell id="vp" rec={o.rec} />
        </div>
        {o.reasons.length > 0 && <div><h4>Why</h4><List items={o.reasons} /></div>}
        {o.also.length > 0 && <div><h4>Also consider</h4><List items={o.also} /></div>}
        {o.flags.map(flag => <Callout tone="warn" key={flag}>{flag}</Callout>)}
      </div>
      <div className="grid g2">
        <div className="card"><h4>You provide</h4><List items={provide} /></div>
        <div className="card"><h4>You receive</h4><List items={SELECTOR.receiveCommon} /></div>
      </div>
      <div className="grid g2">
        <div className="card"><h4>How your firm stays compliant ({regime.name})</h4><List items={regime.biz} /></div>
        <div className="card"><h4>How the bank stays compliant</h4><List items={bankDuties} /></div>
      </div>
    </>
  );
}

export default function Selector({ sector }) {
  const [answers, setAnswers] = useState(() => ({ ...SELECTOR.presets[sector] }));
  const result = decide(answers);

  return (
    <section className="panel">
      <PageHead {...SELECTOR.head}>
        <p>
          <LensNote as="span" sector={sector} text="Answers are preset for this sector; change any to see the recommendation move." />{" "}
          Illustrative logic, not legal advice.
        </p>
      </PageHead>

      <div className="selector">
        <div className="card">
          <h3>About your firm</h3>
          <div className="fields">
            {SELECTOR.fields.map(f => (
              <div className="field" key={f.id}>
                <label htmlFor={`sel-${f.id}`}>{f.label}</label>
                <select
                  id={`sel-${f.id}`}
                  value={answers[f.id]}
                  onChange={e => setAnswers(a => ({ ...a, [f.id]: e.target.value }))}
                >
                  {f.options.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
                {f.hint && <span className="hint">{f.hint}</span>}
              </div>
            ))}
          </div>
        </div>
        <div className="grid" id="sel-output">
          <Result o={result} />
        </div>
      </div>
    </section>
  );
}
