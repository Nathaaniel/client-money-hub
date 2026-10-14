import { useEffect, useRef, useState } from "react";
import { SELECTOR } from "../data/selector.js";
import { decide, outcomeKey, whatIf } from "../logic/selector.js";
import { PageHead } from "../components/ui.jsx";
import { sectorLabel } from "../config.js";

/* The questions the firm answers, in order. The register check is run by the bank, so isn't asked. */
const QUESTIONS = SELECTOR.fields.filter(f => !f.demo);
const REGISTER = SELECTOR.fields.find(f => f.demo);
const START = { register: "clean" };
const fieldOf = id => SELECTOR.fields.find(f => f.id === id);
const optionLabel = (field, value) => field.options.find(([v]) => v === value)[1];

/* Small inline icons; they take the text colour. */
const ICONS = {
  check: <path d="M4 10.5l4 4 8-9" />,
  arrow: <path d="M4 10h11M10.5 5.5L15 10l-4.5 4.5" />,
  back: <path d="M16 10H5M9.5 5.5L5 10l4.5 4.5" />,
  warn: <path d="M10 3l8 14H2L10 3zM10 8.5v3.5M10 14.5v.1" />,
  stop: <path d="M10 2.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15zM4.7 4.7l10.6 10.6" />,
  reset: <path d="M4 10a6 6 0 106-6H7M7 1.5L4.5 4 7 6.5" />,
  print: <path d="M10 3v10M5.5 8.5L10 13l4.5-4.5M4 17h12" />
};
function Icon({ name }) {
  return (
    <svg className="icon" viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name]}
    </svg>
  );
}

function IconList({ items, icon }) {
  return (
    <ul className={`ilist ${icon}`}>
      {items.map((item, i) => <li key={i}><Icon name={icon} /><span>{item}</span></li>)}
    </ul>
  );
}

/* The sentence about the firm. Answered parts are buttons that reopen their question;
   the question being asked shows its prompt; questions still to come aren't shown. */
function Sentence({ answers, active, onPick }) {
  return (
    <p className="sentence">
      {QUESTIONS.map(f => {
        const { before, after, prompt, phrases } = f.say;
        const value = answers[f.id];
        // Keep punctuation straight after the answer on the same line as it.
        const [, stuck, rest] = after.match(/^([,.]?)(.*)$/);
        let answer;
        if (f.id === active) {
          answer = <mark className="slot">{value ? phrases[value] : prompt}</mark>;
        } else if (value) {
          answer = (
            <button type="button" className="phrase" onClick={() => onPick(f.id)} aria-label={`${phrases[value]}. Change: ${f.label}`}>
              {phrases[value]}
            </button>
          );
        } else {
          return null;
        }
        return <span key={f.id}>{before} <span className="nobr">{answer}{stuck}</span>{rest} </span>;
      })}
    </p>
  );
}

function Progress({ answers }) {
  return (
    <ol className="progress" aria-label="Progress">
      {SELECTOR.groups.map((g, i) => {
        const qs = QUESTIONS.filter(f => f.group === g.id);
        const done = qs.filter(f => answers[f.id]).length;
        return (
          <li key={g.id} className={done === qs.length ? "is-done" : ""}>
            <span className="bar"><span style={{ width: `${(done / qs.length) * 100}%` }} /></span>
            {i + 1} · {g.title}
          </li>
        );
      })}
    </ol>
  );
}

/* One question as radio cards. */
function Question({ field, value, onChange, headingRef }) {
  const cols = field.options.length > 4 ? 4 : field.options.length;
  return (
    <fieldset className="question">
      <legend>
        <span className="q-count">Question {QUESTIONS.indexOf(field) + 1} of {QUESTIONS.length}</span>
        <span className="q-label" ref={headingRef} tabIndex={-1}>{field.label}</span>
      </legend>
      {field.hint && <p className="hint">{field.hint}</p>}
      <div className="opts" style={{ "--cols": cols }}>
        {field.options.map(([v, label, detail]) => (
          <label key={v} className={v === value ? "opt is-on" : "opt"}>
            <input type="radio" name={`sel-${field.id}`} value={v} checked={v === value} onChange={() => onChange(v)} />
            <span className="dot" aria-hidden="true" />
            <span className="opt-label">{label}</span>
            {detail && <span className="opt-detail">{detail}</span>}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/* The 2×2 grid in miniature: rd, rp / vd, vp. */
function MiniMatrix({ rec }) {
  return (
    <div className="mini-matrix" role="list" aria-label="Account structures">
      {["rd", "rp", "vd", "vp"].map(id => {
        const [title] = SELECTOR.cells[id];
        const [row, col] = title.split(" ");
        const state = rec.includes(id) ? "is-rec" : id === "vd" ? "is-na" : "";
        return (
          <div role="listitem" key={id} className={`mm ${state}`}>
            <span>{row[0].toUpperCase() + row.slice(1)}</span>
            <b>{id === "vd" ? "Not offered" : col[0].toUpperCase() + col.slice(1)}{state === "is-rec" && " ✓"}</b>
          </div>
        );
      })}
    </div>
  );
}

/* Answers that would give a different outcome, grouped by that outcome. */
function ChangeList({ groups, onApply }) {
  return groups.map(g => (
    <div className="change" key={g.key}>
      <div className="change-to">
        <Icon name={g.outcome.stop ? "stop" : "arrow"} />
        <span>{g.outcome.stop ? g.outcome.stop[0] : g.outcome.verdict}, if:</span>
      </div>
      <div className="chips">
        {g.changes.map(({ field, value }) => {
          const f = fieldOf(field);
          const text = <>{f.short}: <b>{optionLabel(f, value)}</b></>;
          return onApply
            ? <button type="button" className="chip" key={field + value} onClick={() => onApply(field, value)}>{text}</button>
            : <span className="chip is-static" key={field + value}>{text}</span>;
        })}
      </div>
    </div>
  ));
}

function StopCard({ o }) {
  return (
    <div className="verdict-card is-stop">
      <div className="v-eyebrow"><Icon name="stop" /> No account offered</div>
      <p className="v-title">{o.stop[0]}</p>
      <p className="v-text">{o.stop[1]}</p>
      <p className="v-text muted">{SELECTOR.registerExplainer}</p>
    </div>
  );
}

/* While answering: the recommendation so far, with unanswered questions assumed typical for the sector. */
function SoFar({ answers, sector }) {
  const filled = { ...SELECTOR.presets[sector], ...answers };
  const o = decide(filled);
  const open = QUESTIONS.filter(f => !answers[f.id]);
  const answered = QUESTIONS.length - open.length;
  const groups = whatIf(filled, open.map(f => ({ ...f, fixed: false })));

  return (
    <aside className="so-far" aria-label="Recommendation so far">
      {o.stop ? <StopCard o={o} /> : (
        <div className="verdict-card" key={outcomeKey(o)}>
          <div className="v-eyebrow"><span className="pulse" aria-hidden="true" /> Recommendation so far</div>
          <p className="v-title">{o.verdict}</p>
          <MiniMatrix rec={o.rec} />
          <div className="meter">
            <div><span>Based on {answered} of {QUESTIONS.length} answers</span><span>{Math.round((answered / QUESTIONS.length) * 100)}%</span></div>
            <span className="bar"><span style={{ width: `${(answered / QUESTIONS.length) * 100}%` }} /></span>
          </div>
        </div>
      )}
      <div className="card could-change">
        <h3>Could still change</h3>
        {open.length > 0 && <p className="muted small">Questions not yet answered assume the {sectorLabel(sector)} example.</p>}
        {groups.length ? <ChangeList groups={groups} /> : <p className="small">Nothing left to answer would change this.</p>}
      </div>
    </aside>
  );
}

/* Once every question is answered. */
function Result({ answers, onApply, go }) {
  const o = decide(answers);
  if (o.stop) return <div className="result"><StopCard o={o} /></div>;

  const regime = SELECTOR.regimes[o.regime];
  const provide = [...regime.provide, ...(o.pooled ? [SELECTOR.pooledProvide] : [])];
  const bankDuties = [...regime.bank, ...SELECTOR.bankCommon, ...(o.pooled ? [SELECTOR.pooledBank] : [])];
  const groups = whatIf(answers, SELECTOR.fields);

  return (
    <div className="result">
      <div className="result-top">
        <div className="verdict-card wide" key={outcomeKey(o)}>
          <div className="v-main">
            <div className="v-eyebrow"><span className="pulse" aria-hidden="true" /> Our recommendation · {regime.name}</div>
            <p className="v-title">{o.verdict}</p>
            {o.reasons[0] && <p className="v-text">{o.reasons[0]}</p>}
            <div className="v-actions no-print">
              <button type="button" className="btn v-primary" onClick={() => go("journey")}>See the onboarding journey <Icon name="arrow" /></button>
              <button type="button" className="btn v-ghost" onClick={() => window.print()}><Icon name="print" /> Save as PDF</button>
            </div>
          </div>
          <MiniMatrix rec={o.rec} />
        </div>
        {groups.length > 0 && (
          <div className="card could-change">
            <h3>What would change this</h3>
            <ChangeList groups={groups} onApply={onApply} />
          </div>
        )}
      </div>

      {o.flags.map(flag => <div className="flag" key={flag}><Icon name="warn" /><span>{flag}</span></div>)}

      <div className="grid g3">
        <div className="card"><h3>Why this fits</h3><IconList items={o.reasons} icon="check" /></div>
        <div className="card"><h3>You'll provide</h3><IconList items={provide} icon="arrow" /></div>
        <div className="card"><h3>You'll receive</h3><IconList items={SELECTOR.receiveCommon} icon="arrow" /></div>
      </div>

      {o.also.length > 0 && <div className="card"><h3>Also consider</h3><IconList items={o.also} icon="arrow" /></div>}

      <div className="card">
        <h3>Staying compliant under {regime.name}</h3>
        <div className="split">
          <div><h4>Your firm</h4><IconList items={regime.biz} icon="check" /></div>
          <div><h4>The bank</h4><IconList items={bankDuties} icon="check" /></div>
        </div>
      </div>
    </div>
  );
}

export default function Selector({ sector, go }) {
  const [answers, setAnswers] = useState(START);
  const [active, setActive] = useState(QUESTIONS[0].id); // the question open below the sentence, or null
  const headingRef = useRef(null);
  const moved = useRef(false);

  const complete = QUESTIONS.every(f => answers[f.id]);
  const field = active && fieldOf(active);
  const set = (id, value) => setAnswers(a => ({ ...a, [id]: value }));
  const open = id => { moved.current = true; setActive(id); };

  // Next unanswered question after this one, wrapping round; null once all are answered.
  const nextAfter = id => {
    const i = QUESTIONS.findIndex(f => f.id === id);
    const order = [...QUESTIONS.slice(i + 1), ...QUESTIONS.slice(0, i)];
    return order.find(f => !answers[f.id])?.id ?? null;
  };
  const prevOf = id => QUESTIONS[QUESTIONS.findIndex(f => f.id === id) - 1]?.id;

  // Move focus to the question when the user moves to another one.
  useEffect(() => {
    if (moved.current && headingRef.current) headingRef.current.focus();
    moved.current = false;
  }, [active]);

  const verdict = decide({ ...SELECTOR.presets[sector], ...answers });
  const announce = verdict.stop ? verdict.stop[0] : `${complete ? "Recommended" : "Recommendation so far"}: ${verdict.verdict}`;

  return (
    <section className="panel">
      <PageHead {...SELECTOR.head}>
        <p>Illustrative logic, not legal advice.</p>
      </PageHead>

      <div className={complete ? "sel is-complete" : "sel"}>
        <div className="card sel-main">
          <div className="sel-head">
            <span className="sel-kicker">About your firm{complete && " · select any underlined answer to change it"}</span>
            {complete ? (
              <button type="button" className="btn sm no-print" onClick={() => { setAnswers(START); open(QUESTIONS[0].id); }}>
                <Icon name="reset" /> Start again
              </button>
            ) : (
              <Progress answers={answers} />
            )}
          </div>

          <Sentence answers={answers} active={active} onPick={open} />

          <div className="register no-print">
            <label htmlFor="sel-register">{REGISTER.label}</label>
            <select id="sel-register" value={answers.register} onChange={e => set("register", e.target.value)}>
              {REGISTER.options.map(([v, label]) => <option key={v} value={v}>{label}</option>)}
            </select>
          </div>

          {field && (
            <div className="ask no-print">
              <Question field={field} value={answers[field.id]} onChange={v => set(field.id, v)} headingRef={headingRef} />
              <div className="ask-actions">
                {complete ? (
                  <button type="button" className="btn primary" onClick={() => setActive(null)}>Done</button>
                ) : (
                  <>
                    {prevOf(field.id) && (
                      <button type="button" className="btn" onClick={() => open(prevOf(field.id))}><Icon name="back" /> Back</button>
                    )}
                    <button type="button" className="btn primary" disabled={!answers[field.id]} onClick={() => open(nextAfter(field.id))}>
                      {nextAfter(field.id) ? "Continue" : "See my recommendation"} <Icon name="arrow" />
                    </button>
                    <span className="muted small ask-left">
                      {QUESTIONS.filter(f => !answers[f.id]).length} left ·{" "}
                      <button type="button" className="linkbtn" onClick={() => { setAnswers({ ...SELECTOR.presets[sector] }); setActive(null); }}>
                        fill in the {sectorLabel(sector)} example
                      </button>
                    </span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {!complete && <SoFar answers={answers} sector={sector} />}
      </div>

      <p className="sr-only" aria-live="polite">{announce}</p>
      {complete && <Result answers={answers} onApply={set} go={go} />}
    </section>
  );
}
