/* Public website: a firm that doesn't bank with us yet. Anonymous, so nothing is known up front
   and the register is only checked if they apply. */
import { SELECTOR } from "../../data/selector.js";
import { Announce, Ask, DemoBar, Icon, PossiblePanel, ProgressBar, QUESTIONS, Sentence, useQuestionFlow } from "../../components/selector.jsx";
import CustomerResult from "./CustomerResult.jsx";

const START = { register: "clean" };

export default function PublicSelector({ sector, setSector, go }) {
  const flow = useQuestionFlow(START, QUESTIONS);
  const { answers, active, open, complete, fill, restart } = flow;

  return (
    <>
      <DemoBar sector={sector} onSector={setSector} onFill={() => fill(SELECTOR.presets[sector])} />

      <div className={complete ? "sel is-complete" : "sel"}>
        <div className="card sel-main">
          <div className="sel-head">
            <span className="sel-kicker">{complete ? "About your firm · select any underlined answer to change it" : "Find the right client account · about 2 minutes"}</span>
            {complete && (
              <button type="button" className="btn sm no-print" onClick={() => window.confirm("Clear all your answers and start again?") && restart()}>
                <Icon name="reset" /> Start again
              </button>
            )}
          </div>
          {!complete && <ProgressBar answers={answers} questions={QUESTIONS} />}
          <Sentence answers={answers} active={active} onPick={open} />
          <Ask flow={flow} questions={QUESTIONS} />
          {!complete && <p className="muted small">We only use your answers to suggest an account. Nothing is saved or sent.</p>}
        </div>
        {!complete && <PossiblePanel answers={answers} />}
      </div>

      {complete && <Announce answers={answers} audience="customer" />}
      {complete && (
        <CustomerResult answers={answers} fields={SELECTOR.fields} go={go}
          primary={{ label: "Apply for this account", note: "When you apply, we'll check your firm on its regulator's register and confirm the account with you." }} />
      )}
    </>
  );
}
