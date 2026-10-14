/* The suggested account, as a customer sees it (public website and online banking). */
import { useState } from "react";
import { SELECTOR } from "../../data/selector.js";
import { whatIf } from "../../logic/selector.js";
import { ChangeList, Icon, IconList, StopCard, decide, outcomeKey, plainName } from "../../components/selector.jsx";

/* primary: { label, note } for the main next step; the prototype opens the Journey page. */
export default function CustomerResult({ answers, fields, primary, go }) {
  const [talk, setTalk] = useState(false);
  const o = decide(answers);
  if (o.stop) return <div className="result"><StopCard stop={o.stop} audience="customer" /></div>;

  const regime = SELECTOR.regimes[o.regime];
  const provide = [...regime.provide, ...(o.pooled ? [SELECTOR.pooledProvide] : [])];
  const weDo = [...regime.bank, ...SELECTOR.bankCommon, ...(o.pooled ? [SELECTOR.pooledBank] : [])];
  const groups = whatIf(answers, fields);

  return (
    <div className="result">
      <div className="result-top">
        <div className="verdict-card wide" key={outcomeKey(o)}>
          <div className="v-main">
            <div className="v-eyebrow"><span className="pulse" aria-hidden="true" /> Suggested account</div>
            <p className="v-title">{plainName(o)}</p>
            <p className="v-text">{o.verdict}.</p>
            {o.reasons[0] && <p className="v-text">{o.reasons[0]}</p>}
            <div className="v-actions no-print">
              <button type="button" className="btn v-primary" onClick={() => go("journeys")}>{primary.label} <Icon name="arrow" /></button>
              <button type="button" className="btn v-ghost" onClick={() => setTalk(t => !t)} aria-expanded={talk}>Talk to us</button>
              <button type="button" className="btn v-ghost" onClick={() => window.print()}><Icon name="print" /> Save as PDF</button>
            </div>
            {talk && <p className="v-text small">Call [phone number], Monday to Friday, or book a call with a client money specialist at [link].</p>}
            {primary.note && <p className="v-text small">{primary.note}</p>}
          </div>
          <MiniPlain o={o} />
        </div>
        {groups.length > 0 && (
          <div className="card could-change">
            <h3>Your suggestion would change if</h3>
            <p className="muted small">To change an answer, select it in the sentence above.</p>
            <ChangeList groups={groups} name={plainName} />
          </div>
        )}
      </div>

      <p className="notice">
        <Icon name="warn" />
        <span>This is a suggestion based on your answers, not advice. We'll confirm the right account after our checks when you apply. We don't keep your answers unless you apply.</span>
      </p>

      {o.flags.length > 0 && (
        <div className="card">
          <h3>Things to check</h3>
          <IconList items={o.flags} icon="warn" />
        </div>
      )}

      <div className="grid g2">
        <div className="card"><h3>Why we suggest this</h3><IconList items={o.reasons} icon="check" /></div>
        <div className="card"><h3>What you'll get</h3><IconList items={SELECTOR.receiveCommon} icon="arrow" /></div>
      </div>

      <details className="card more-card">
        <summary>What you'll need to apply</summary>
        <IconList items={provide} icon="arrow" />
      </details>
      <details className="card more-card">
        <summary>Keeping your clients' money safe: what you do and what we do</summary>
        <div className="split">
          <div><h4>You</h4><IconList items={regime.biz} icon="check" /></div>
          <div><h4>Us</h4><IconList items={weDo} icon="check" /></div>
        </div>
      </details>
      {o.also.length > 0 && (
        <details className="card more-card">
          <summary>Also worth knowing</summary>
          <IconList items={o.also} icon="arrow" />
        </details>
      )}
    </div>
  );
}

/* A simple picture of the suggested structure: one shared account, reference numbers, separate accounts. */
function MiniPlain({ o }) {
  const parts = [
    ["rp", "Shared client account", "Holds the money for many clients"],
    ["vp", "Reference numbers", "One per client, so payments match"],
    ["rd", "Separate accounts", "One per client"]
  ].filter(([id]) => o.rec.includes(id));
  return (
    <ul className="plain-parts" aria-label="What the account is made of">
      {parts.map(([id, name, text]) => (
        <li key={id}><b>{name}</b><span>{text}</span></li>
      ))}
    </ul>
  );
}
