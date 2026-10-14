import { MARKET } from "../data/market.js";
import { List, PageHead, Pill, Section, Table } from "../components/ui.jsx";

export default function Market() {
  return (
    <section className="panel">
      <PageHead {...MARKET.head} />

      <div className="grid g3">
        {MARKET.headlines.map(h => (
          <div className="card" key={h.figure}>
            <div className="fig">{h.figure}</div>
            <p className="small" style={{ marginTop: 6 }}>{h.text}</p>
            <Pill tone={h.evidence.tone}>{h.evidence.label}</Pill>
          </div>
        ))}
      </div>

      <Section title="Best capabilities today" intro="Who shows each capability most clearly. Mostly from providers' own material.">
        <details className="more">
          <summary>Show all {MARKET.capabilities.length} capabilities</summary>
          <Table
            head={["Capability", "Best current example", "Evidence"]}
            rows={MARKET.capabilities.map(([capability, leader, evidence]) => [
              capability, leader, <Pill tone={evidence.tone}>{evidence.label}</Pill>
            ])}
          />
        </details>
      </Section>

      <Section title="Provider landscape" intro="Three groups: relationship-led high-street banks, rate- and digital-led challengers, and API-first fintech banks and platforms.">
        <details className="more">
          <summary>Show all {MARKET.providers.length} providers</summary>
          <Table head={["Provider", "Group", "Client money offer", "Target", "Notable"]} rows={MARKET.providers} />
        </details>
        <p className="small muted">{MARKET.notVerified}</p>
      </Section>

      <Section title="Reported gaps">
        <Table head={["Gap", "Evidence"]} rows={MARKET.gaps} />
      </Section>

      <div className="grid g2">
        <div className="card section">
          <header>
            <h3>Customer sentiment</h3>
            <p className="small">{MARKET.cmaNote}</p>
          </header>
          <div className="bars">
            {MARKET.cma.map(([name, value], i) => (
              <div className="bar-row" key={name}>
                <span>{name}</span>
                <div className="bar-track"><div className={i > 4 ? "bar-fill alt" : "bar-fill"} style={{ width: `${value}%` }} /></div>
                <span className="num">{value}%</span>
              </div>
            ))}
            <div className="axis"><span /><span><i>0%</i><i>50%</i><i>100%</i></span><span /></div>
          </div>
        </div>
        <div className="card section">
          <header><h3>Market gaps</h3></header>
          <List items={MARKET.marketGaps} />
        </div>
      </div>
    </section>
  );
}
