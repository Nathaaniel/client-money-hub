/* Online banking: an existing business customer, signed in. The bank already knows the firm,
   its regulator and its register entry, so those aren't asked and the register is checked up front. */
import { SELECTOR } from "../../data/selector.js";
import { Announce, Ask, DemoBar, Icon, PossiblePanel, ProgressBar, QUESTIONS, Sentence, StopCard, fieldOf, optionLabel, useQuestionFlow } from "../../components/selector.jsx";
import CustomerResult from "./CustomerResult.jsx";

const ASKED = QUESTIONS.filter(f => f.id !== "regime");

export default function OnlineSelector({ sector, setSector, go }) {
  const known = SELECTOR.known[sector];
  const flow = useQuestionFlow({ register: "clean", regime: known.regime }, ASKED);
  const { answers, set, active, open, complete, fill, restart } = flow;
  const stopped = answers.register !== "clean";
  const regimeName = optionLabel(fieldOf("regime"), known.regime);

  return (
    <>
      <DemoBar sector={sector} onSector={setSector} onFill={() => fill(SELECTOR.presets[sector])}
        register={answers.register} onRegister={v => set("register", v)} />

      <div className="ob-frame">
        <div className="ob-bar">
          <span className="ob-brand">[Bank] Business Online</span>
          <span className="ob-user">Signed in · <b>{known.firm}</b></span>
        </div>

        <div className="known card">
          <div className="known-head">
            <h3>What we already know about {known.firm}</h3>
            <button type="button" className="linkbtn small">Something wrong? Update your profile</button>
          </div>
          <dl className="known-list">
            <div><dt>Firm</dt><dd>{known.firm}<span>{known.number}</span></dd></div>
            <div><dt>Regulated under</dt><dd>{regimeName}<span>{known.registerRef}</span></dd></div>
            <div>
              <dt>Register check</dt>
              <dd className={stopped ? "is-bad" : "is-ok"}>
                <Icon name={stopped ? "warn" : "check"} /> {stopped ? "Needs a conversation" : `Confirmed on the ${known.register} today`}
              </dd>
            </div>
            <div><dt>With us since</dt><dd>{known.since}<span>{known.products.join(" · ")}</span></dd></div>
          </dl>
          <p className="muted small">We've already checked your identity and ownership, so you won't need to send those documents again.</p>
        </div>

        {stopped ? <StopCard stop={answers.register} audience="customer" /> : (
          <>
            <div className={complete ? "sel is-complete" : "sel"}>
              <div className="card sel-main">
                <div className="sel-head">
                  <span className="sel-kicker">
                    {complete ? "About your firm · select any underlined answer to change it" : `Add a client money account · ${ASKED.length} questions`}
                  </span>
                  {complete && (
                    <button type="button" className="btn sm no-print" onClick={() => window.confirm("Clear your answers and start again?") && restart()}>
                      <Icon name="reset" /> Start again
                    </button>
                  )}
                </div>
                {!complete && <ProgressBar answers={answers} questions={ASKED} />}
                <Sentence answers={answers} active={active} onPick={open} known={["regime"]} />
                <Ask flow={flow} questions={ASKED} />
              </div>
              {!complete && <PossiblePanel answers={answers} />}
            </div>

            {complete && <Announce answers={answers} audience="customer" />}
            {complete && (
              <CustomerResult answers={answers} fields={SELECTOR.fields} go={go}
                primary={{ label: "Open this account", note: "We'll fill in your application from your profile. You'll sign the acknowledgement letter here in online banking, and the account appears alongside your others." }} />
            )}
          </>
        )}
      </div>
    </>
  );
}
