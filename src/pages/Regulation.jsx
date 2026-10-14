import { REGULATION as R } from "../data/regulation.js";
import { Callout, List, PageHead, Pill, Section, Table } from "../components/ui.jsx";

export default function Regulation() {
  return (
    <section className="panel">
      <PageHead {...R.head} />

      <Section title="Why now">
        <Table
          head={["Driver", "Status", "What it means for the proposition"]}
          rows={R.whyNow.map(([driver, status, tone, meaning]) => [driver, <Pill tone={tone}>{status}</Pill>, meaning])}
        />
      </Section>

      <div className="grid g2">
        <Section title="Regulatory timeline" intro="Newest first, as at October 2026.">
          <ul className="timeline">
            {R.timeline.map(item => (
              <li key={item.when + item.what}>
                <div className="when">{item.when} <Pill tone={item.tone}>{item.status}</Pill></div>
                <div className="what">{item.what}</div>
                <div className="impact">{item.impact}</div>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="FSCS and client money">
          <div className="card"><List items={R.fscs} /></div>
          <Callout tone="brand" title="Opportunity">{R.fscsOpportunity}</Callout>
          <header><h3>Corrections made during review</h3></header>
          <Table head={["Topic", "Resolution"]} rows={R.corrections} />
        </Section>
      </div>

      <Section title="Types of client money account" intro={R.accountTypesIntro}>
        <Table head={["Account type", "Main users", "Governing rules", "Key features"]} rows={R.accountTypes} />
      </Section>

      <Section title="Automated regulatory register checks" intro={R.registerIntro}>
        <Table head={["Register", "What to check", "How it can be automated"]} rows={R.registerChecks} />
        <p className="small muted">{R.registerNote}</p>
      </Section>

      <Section title="Case study: Axiom Ince" intro={R.axiom.intro}>
        <div className="grid g2">
          <div className="card">
            <h4>What happened</h4>
            <ul className="list small">
              {R.axiom.happened.map(([when, text]) => <li key={when}><b>{when}:</b> {text}</li>)}
            </ul>
          </div>
          <div className="card">
            <h4>Why it matters for a bank</h4>
            <ul className="list small">
              {R.axiom.matters.map(text => <li key={text}>{text}</li>)}
            </ul>
          </div>
        </div>
      </Section>
    </section>
  );
}
