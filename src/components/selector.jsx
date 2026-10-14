/* Building blocks shared by the three versions of the account selector (src/pages/selector/). */
import { useEffect, useMemo, useRef, useState } from "react";
import { SELECTOR } from "../data/selector.js";
import { decide, outcomeKey, possibleOutcomes } from "../logic/selector.js";
import { SECTORS } from "../config.js";

/* The questions, in order. The register check is run by the bank, so is never asked. */
export const QUESTIONS = SELECTOR.fields.filter(f => !f.demo);
export const REGISTER = SELECTOR.fields.find(f => f.demo);
export const fieldOf = id => SELECTOR.fields.find(f => f.id === id);
export const optionLabel = (field, value) => field.options.find(([v]) => v === value)?.[1];

/* Plain-English name of a recommended structure, for customers. */
export const plainName = o => (o.regime === "cass15" ? SELECTOR.plainCass15 : SELECTOR.plain[o.rec.join(",")]);

/* Small inline icons; they take the text colour. */
const ICONS = {
  check: <path d="M4 10.5l4 4 8-9" />,
  arrow: <path d="M4 10h11M10.5 5.5L15 10l-4.5 4.5" />,
  back: <path d="M16 10H5M9.5 5.5L5 10l4.5 4.5" />,
  warn: <path d="M10 3l8 14H2L10 3zM10 8.5v3.5M10 14.5v.1" />,
  stop: <path d="M10 2.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15zM4.7 4.7l10.6 10.6" />,
  reset: <path d="M4 10a6 6 0 106-6H7M7 1.5L4.5 4 7 6.5" />,
  print: <path d="M10 3v10M5.5 8.5L10 13l4.5-4.5M4 17h12" />,
  lock: <path d="M5.5 9V6.5a4.5 4.5 0 019 0V9M4 9h12v8H4z" />,
  copy: <path d="M7 7V3.5h9.5V13H13M3.5 7H13v9.5H3.5z" />,
  x: <path d="M5 5l10 10M15 5L5 15" />
};
export function Icon({ name }) {
  return (
    <svg className="icon" viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name]}
    </svg>
  );
}

export function IconList({ items, icon }) {
  return (
    <ul className={`ilist ${icon}`}>
      {items.map((item, i) => <li key={i}><Icon name={icon} /><span>{item}</span></li>)}
    </ul>
  );
}

/* Answer state for a one-question-at-a-time flow over `questions`.
   active is the question open below the sentence, or null. */
export function useQuestionFlow(start, questions) {
  const [answers, setAnswers] = useState(start);
  const [active, setActive] = useState(questions[0].id);
  const headingRef = useRef(null);
  const moved = useRef(false);

  const complete = questions.every(f => answers[f.id]);
  const set = (id, value) => setAnswers(a => ({ ...a, [id]: value }));
  const open = id => { moved.current = true; setActive(id); };
  const nextAfter = id => {
    const i = questions.findIndex(f => f.id === id);
    const order = [...questions.slice(i + 1), ...questions.slice(0, i)];
    return order.find(f => !answers[f.id])?.id ?? null;
  };
  const prevOf = id => questions[questions.findIndex(f => f.id === id) - 1]?.id;
  const fill = values => { setAnswers(a => ({ ...a, ...values })); setActive(null); };
  const restart = () => { setAnswers(start); open(questions[0].id); };

  // Move focus to the question when the user moves to another one.
  useEffect(() => {
    if (moved.current && headingRef.current) headingRef.current.focus();
    moved.current = false;
  }, [active]);

  return { answers, set, active, setActive, open, nextAfter, prevOf, complete, fill, restart, headingRef };
}

/* The sentence about the firm. Answered parts are buttons that reopen their question; the question
   being asked shows its prompt; questions still to come aren't shown. Fields in `known` came from
   the bank's records: they show with a lock and can't be changed here. */
export function Sentence({ answers, active, onPick, known = [] }) {
  return (
    <p className="sentence">
      {QUESTIONS.map(f => {
        const { before, after, prompt, phrases } = f.say;
        const value = answers[f.id];
        // Keep punctuation straight after the answer on the same line as it.
        const [, stuck, rest] = after.match(/^([,.]?)(.*)$/);
        let answer;
        if (known.includes(f.id) && value) {
          answer = <span className="phrase is-known" title="From your profile">{phrases[value]}<Icon name="lock" /></span>;
        } else if (f.id === active) {
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

/* One question as radio cards. */
export function Question({ field, value, onChange, headingRef, number, total }) {
  const cols = field.options.length > 5 ? 4 : field.options.length;
  return (
    <fieldset className="question">
      <legend>
        <span className="q-count">Question {number} of {total}</span>
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

/* The open question with Back / Continue, or Done once every question is answered. */
export function Ask({ flow, questions }) {
  const { answers, set, active, setActive, open, nextAfter, prevOf, complete, headingRef } = flow;
  if (!active) return null;
  const field = fieldOf(active);
  const left = questions.filter(f => !answers[f.id]).length;
  return (
    <div className="ask no-print">
      <Question field={field} value={answers[field.id]} onChange={v => set(field.id, v)} headingRef={headingRef}
        number={questions.indexOf(field) + 1} total={questions.length} />
      <div className="ask-actions">
        {complete ? (
          <button type="button" className="btn primary" onClick={() => setActive(null)}>Done</button>
        ) : (
          <>
            {prevOf(field.id) && <button type="button" className="btn" onClick={() => open(prevOf(field.id))}><Icon name="back" /> Back</button>}
            <button type="button" className="btn primary" disabled={!answers[field.id]} onClick={() => open(nextAfter(field.id))}>
              {nextAfter(field.id) ? "Continue" : "See your suggested account"} <Icon name="arrow" />
            </button>
            <span className="muted small ask-left">{left} {left === 1 ? "question" : "questions"} left</span>
          </>
        )}
      </div>
    </div>
  );
}

/* A thin progress bar for the questions answered so far. */
export function ProgressBar({ answers, questions }) {
  const done = questions.filter(f => answers[f.id]).length;
  return (
    <div className="progress-bar" role="progressbar" aria-label="Questions answered" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={done}>
      <span style={{ width: `${(done / questions.length) * 100}%` }} />
    </div>
  );
}

/* While answering, on the customer versions: the accounts that could still suit the firm,
   narrowing as answers come in. Nothing is assumed about unanswered questions. */
export function PossiblePanel({ answers }) {
  const all = useMemo(() => possibleOutcomes({ register: "clean" }, SELECTOR.fields), []);
  const now = useMemo(() => possibleOutcomes(answers, SELECTOR.fields), [answers]);
  const names = list => [...new Set(list.filter(p => !p.outcome.stop).map(p => plainName(p.outcome)))];
  const allNames = names(all);
  const nowNames = names(now);
  const onlyStop = nowNames.length === 0 && now[0]?.outcome.stop;

  if (onlyStop) return <aside className="so-far"><StopCard stop={now[0].outcome.stop} audience="customer" /></aside>;

  const title = nowNames.length === 1 ? "Your answers point to" : nowNames.length === allNames.length ? "Accounts that could suit you" : `${nowNames.length} accounts could still suit you`;
  return (
    <aside className="so-far" aria-label="Accounts that could suit you">
      <div className="verdict-card possible" key={nowNames.join("|")}>
        <div className="v-eyebrow"><span className="pulse" aria-hidden="true" /> {title}</div>
        <ul className="possible-list">
          {allNames.map(name => {
            const live = nowNames.includes(name);
            return (
              <li key={name} className={live ? (nowNames.length === 1 ? "is-pick" : "") : "is-out"}>
                <Icon name={live ? (nowNames.length === 1 ? "check" : "arrow") : "x"} />
                <span>{name}</span>
                {!live && <span className="sr-only"> (ruled out)</span>}
              </li>
            );
          })}
        </ul>
        <p className="v-text small">
          {nowNames.length === 1 ? "Answer the rest so we can tell you what you'll need." : "This narrows as you answer. Nothing is assumed about questions you haven't reached."}
        </p>
      </div>
    </aside>
  );
}

/* The 2×2 grid in miniature: rd, rp / vd, vp. */
export function MiniMatrix({ rec }) {
  return (
    <div className="mini-matrix" role="list" aria-label="Account structures">
      {["rd", "rp", "vd", "vp"].map(id => {
        const [row, col] = SELECTOR.cells[id][0].split(" ");
        const state = rec.includes(id) ? "is-rec" : id === "vd" ? "is-na" : "";
        return (
          <div role="listitem" key={id} className={`mm ${state}`}>
            <span>{row}</span>
            <b>{id === "vd" ? "Not offered" : col[0].toUpperCase() + col.slice(1)}{state === "is-rec" && " ✓"}</b>
          </div>
        );
      })}
    </div>
  );
}

/* The full 2×2 grid with descriptions, for staff. */
export function Matrix({ rec }) {
  return (
    <div className="matrix" role="list" aria-label="Account structures">
      {["rd", "rp", "vd", "vp"].map(id => {
        const [title, text] = SELECTOR.cells[id];
        const state = rec.includes(id) ? "is-rec" : id === "vd" ? "is-na" : "is-off";
        return (
          <div role="listitem" key={id} className={`cell ${state}`}>
            <div className="cell-top"><b>{title}</b>{state === "is-rec" && <span className="tick"><Icon name="check" /></span>}</div>
            <p>{text}</p>
          </div>
        );
      })}
    </div>
  );
}

/* Answers that would give a different outcome, grouped by that outcome. With onApply, each is a button. */
export function ChangeList({ groups, onApply, name = o => o.verdict, audience = "customer" }) {
  return groups.map(g => (
    <div className="change" key={g.key}>
      <div className="change-to">
        <Icon name={g.outcome.stop ? "stop" : "arrow"} />
        <span>{g.outcome.stop ? SELECTOR.stops[g.outcome.stop][audience][0] : name(g.outcome)}, if:</span>
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

export function StopCard({ stop, audience }) {
  const [title, text] = SELECTOR.stops[stop][audience];
  return (
    <div className="verdict-card is-stop">
      <div className="v-eyebrow"><Icon name="stop" /> {audience === "staff" ? "No account offered" : "Next step"}</div>
      <p className="v-title">{title}</p>
      <p className="v-text">{text}</p>
      {audience === "staff" && <p className="v-text muted">{SELECTOR.registerExplainer}</p>}
    </div>
  );
}

/* Controls for presenting the prototype, kept apart from the design itself. */
export function DemoBar({ sector, onSector, onFill, register, onRegister }) {
  return (
    <div className="demo-bar no-print" role="group" aria-label="Prototype controls">
      <span className="demo-tag">Prototype controls</span>
      <label className="demo-field">
        Example firm
        <select value={sector} onChange={e => onSector(e.target.value)}>
          {SECTORS.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
        </select>
      </label>
      <button type="button" className="btn sm" onClick={onFill}>Fill in its answers</button>
      {onRegister && (
        <label className="demo-field">
          Register check result
          <select value={register} onChange={e => onRegister(e.target.value)}>
            {REGISTER.options.map(([v, label]) => <option key={v} value={v}>{label}</option>)}
          </select>
        </label>
      )}
    </div>
  );
}

/* Announces the current outcome to screen readers when it changes. */
export function Announce({ answers, audience }) {
  const o = decide(answers);
  const text = o.stop ? SELECTOR.stops[o.stop][audience][0] : audience === "staff" ? o.verdict : plainName(o);
  return <p className="sr-only" aria-live="polite">{text}</p>;
}

export { decide, outcomeKey };
