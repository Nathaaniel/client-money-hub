/* Relationship manager: bank staff, with or for a client. Every question is on one screen,
   the bank's own data is shown, and the wording is the bank's. */
import { useMemo, useRef, useState } from "react";
import { SELECTOR } from "../../data/selector.js";
import { possibleOutcomes, whatIf } from "../../logic/selector.js";
import { Announce, ChangeList, DemoBar, Icon, IconList, Matrix, QUESTIONS, StopCard, decide, optionLabel } from "../../components/selector.jsx";

const RISK = { low: "Low", medium: "Medium", high: "High" };

export default function ManagerSelector({ sector, setSector, go }) {
  const known = SELECTOR.known[sector];
  const start = { register: "clean", regime: known.regime };
  const [answers, setAnswers] = useState(start);
  const set = (id, value) => setAnswers(a => ({ ...a, [id]: value }));
  const toAsk = QUESTIONS.filter(f => !answers[f.id]);
  const complete = toAsk.length === 0;

  return (
    <>
      <DemoBar sector={sector} onSector={setSector} onFill={() => setAnswers(a => ({ ...a, ...SELECTOR.presets[sector] }))}
        register={answers.register} onRegister={v => set("register", v)} />

      <div className="rm-client card">
        <div className="rm-id">
          <span className="sel-kicker">Client</span>
          <b>{known.firm}</b>
          <span className="muted small">{known.number} · with us since {known.since} · {known.products.join(", ")}</span>
        </div>
        <dl className="rm-facts">
          <div><dt>Register</dt><dd className={answers.register === "clean" ? "is-ok" : "is-bad"}>
            <Icon name={answers.register === "clean" ? "check" : "warn"} /> {optionLabel(SELECTOR.fields.find(f => f.demo), answers.register)}
            <span>{known.register} · {known.registerRef} · checked today</span>
          </dd></div>
          <div><dt>Bank risk rating</dt><dd>{RISK[known.bankRisk]}<span>Internal only</span></dd></div>
          <div><dt>Relationship manager</dt><dd>{known.rm}</dd></div>
        </dl>
      </div>

      <div className="rm">
        <form className="card rm-form" onSubmit={e => e.preventDefault()} aria-label="Client answers">
          <div className="rm-form-head">
            <h3>Client answers</h3>
            <span className="muted small">{complete ? "All answered" : `${toAsk.length} to ask`}</span>
            <button type="button" className="btn sm" onClick={() => setAnswers(start)}><Icon name="reset" /> Clear</button>
          </div>
          {QUESTIONS.map(f => <Row key={f.id} field={f} value={answers[f.id]} onChange={v => set(f.id, v)} fromRegister={f.id === "regime" && answers.regime === known.regime} />)}
        </form>

        <div className="rm-out">
          {complete || answers.register !== "clean"
            ? <Outcome answers={answers} known={known} onApply={set} go={go} />
            : <Possible answers={answers} toAsk={toAsk} />}
        </div>
      </div>
      {complete && <Announce answers={answers} audience="staff" />}
    </>
  );
}

/* One question as a compact row: a dropdown for the regime (eight options), segmented buttons otherwise. */
function Row({ field, value, onChange, fromRegister }) {
  const id = `rm-${field.id}`;
  return (
    <div className={value ? "rm-row" : "rm-row is-open"}>
      <div className="rm-label">
        <span id={`${id}-label`}>{field.staffLabel}</span>
        {fromRegister && <span className="pill">From register</span>}
        {!value && <span className="pill warn">Ask client</span>}
      </div>
      {field.options.length > 5 ? (
        <select aria-labelledby={`${id}-label`} value={value ?? ""} onChange={e => onChange(e.target.value)}>
          {!value && <option value="" disabled>Choose…</option>}
          {field.options.map(([v, label, detail]) => <option key={v} value={v}>{label}{detail ? ` · ${detail}` : ""}</option>)}
        </select>
      ) : (
        <div className="seg" role="radiogroup" aria-labelledby={`${id}-label`} style={{ "--n": field.options.length }}>
          {field.options.map(([v, label]) => (
            <label key={v} className={v === value ? "seg-opt is-on" : "seg-opt"}>
              <input type="radio" name={id} value={v} checked={v === value} onChange={() => onChange(v)} />
              {label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

/* Before every question is answered: the outcomes still possible, in the bank's terms. */
function Possible({ answers, toAsk }) {
  const now = useMemo(() => possibleOutcomes(answers, SELECTOR.fields), [answers]);
  return (
    <div className="card rm-possible">
      <h3>{now.length === 1 ? "Outcome" : `${now.length} possible outcomes`}</h3>
      <ul className="ilist arrow">
        {now.map(({ key, outcome }) => (
          <li key={key}><Icon name={outcome.stop ? "stop" : "arrow"} /><span>{outcome.stop ? SELECTOR.stops[outcome.stop].staff[0] : outcome.verdict}</span></li>
        ))}
      </ul>
      <h4>Still to ask</h4>
      <div className="chips">{toAsk.map(f => <span key={f.id} className="chip is-static">{f.short ?? "Regime"}</span>)}</div>
    </div>
  );
}

function Outcome({ answers, known, onApply, go }) {
  const [status, setStatus] = useState("");
  const textRef = useRef(null);
  const o = decide(answers);

  if (o.stop) {
    return (
      <>
        <StopCard stop={o.stop} audience="staff" />
        <div className="rm-actions">
          <button type="button" className="btn primary" onClick={() => setStatus(`Prototype: this would refer ${known.firm} to financial crime and record the register result as evidence.`)}>Refer to financial crime</button>
        </div>
        {status && <p className="rm-status" role="status">{status}</p>}
      </>
    );
  }

  const regime = SELECTOR.regimes[o.regime];
  const bankDuties = [...regime.bank, ...SELECTOR.bankCommon, ...(o.pooled ? [SELECTOR.pooledBank] : [])];
  const provide = [...regime.provide, ...(o.pooled ? [SELECTOR.pooledProvide] : [])];
  const groups = whatIf(answers, SELECTOR.fields);
  const mismatch = RISK[answers.aml] && answers.aml !== known.bankRisk;
  const insights = [
    ...(mismatch ? [`The client rates its own AML risk ${answers.aml}; the bank rates it ${known.bankRisk}. Discuss before applying.`] : []),
    ...o.flags
  ];
  const rationale = [
    `${known.firm} (${known.number}).`,
    `Recommended structure: ${o.verdict}.`,
    `Regime: ${regime.name}. Register: ${optionLabel(SELECTOR.fields.find(f => f.demo), answers.register)} on the ${known.register} (${known.registerRef}), checked [date].`,
    `Client's answers: ${QUESTIONS.map(f => `${f.short ?? "Regime"}: ${optionLabel(f, answers[f.id])}`).join("; ")}.`,
    `Reasons: ${o.reasons.join(" ")}`,
    ...(insights.length ? [`Points to note: ${insights.join(" ")}`] : []),
    `Bank risk rating: ${RISK[known.bankRisk]}. Prepared by ${known.rm}, [date].`
  ].join("\n");

  const copy = () => {
    const done = () => setStatus("Rationale copied.");
    const fallback = () => { textRef.current?.select(); setStatus("Rationale selected. Press Ctrl+C or Cmd+C to copy."); };
    try { navigator.clipboard.writeText(rationale).then(done, fallback); } catch { fallback(); }
  };

  return (
    <>
      <div className="card rm-verdict">
        <span className="sel-kicker">Recommended structure · {regime.name}</span>
        <p className="v-title">{o.verdict}</p>
        <Matrix rec={o.rec} />
      </div>

      {insights.map(text => <div className="flag" key={text}><Icon name="warn" /><span>{text}</span></div>)}

      <div className="grid g2">
        <div className="card"><h3>Why</h3><IconList items={o.reasons} icon="check" /></div>
        <div className="card could-change">
          <h3>What would change this</h3>
          {groups.length ? <ChangeList groups={groups} onApply={onApply} audience="staff" /> : <p className="small">No single answer would change it.</p>}
        </div>
      </div>

      <div className="card rm-rationale">
        <div className="rm-form-head">
          <h3>Rationale for the file</h3>
          <button type="button" className="btn sm" onClick={copy}><Icon name="copy" /> Copy</button>
        </div>
        <textarea ref={textRef} readOnly value={rationale} rows={8} aria-label="Rationale for the file" />
      </div>

      <div className="rm-actions no-print">
        <button type="button" className="btn primary" onClick={() => setStatus(`Prototype: this would send the answers to ${known.firm} in online banking to confirm, then pre-fill the application.`)}>
          Send to client to confirm
        </button>
        <button type="button" className="btn" onClick={() => go("journeys")}>Start application <Icon name="arrow" /></button>
      </div>
      {status && <p className="rm-status" role="status">{status}</p>}

      {o.also.length > 0 && <details className="card more-card"><summary>Also consider</summary><IconList items={o.also} icon="arrow" /></details>}
      <details className="card more-card">
        <summary>What the client provides</summary>
        <IconList items={provide} icon="arrow" />
      </details>
      <details className="card more-card">
        <summary>Staying compliant under {regime.name}</summary>
        <div className="split">
          <div><h4>The firm</h4><IconList items={regime.biz} icon="check" /></div>
          <div><h4>The bank</h4><IconList items={bankDuties} icon="check" /></div>
        </div>
      </details>
    </>
  );
}
