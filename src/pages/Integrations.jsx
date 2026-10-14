import { CONFIG } from "../config.js";
import { INTEGRATIONS, INTEGRATIONS_HEAD, PATTERN, VENDOR_MAP } from "../data/integrations.js";
import { LensNote, PageHead, Pill, Section, Table } from "../components/ui.jsx";

export default function Integrations({ sector }) {
  const data = INTEGRATIONS[sector];
  return (
    <section className="panel">
      <PageHead {...INTEGRATIONS_HEAD} />

      <div className="pattern">
        <div className="box">
          <h4>{PATTERN.software.title}</h4>
          <p className="small">{PATTERN.software.text}</p>
        </div>
        <div className="arrows">
          {PATTERN.arrows.map(a => <div key={a}>{a}</div>)}
        </div>
        <div className="box bank">
          <h4>{CONFIG.bankName} client money layer</h4>
          <p className="small">{PATTERN.bankText}</p>
        </div>
      </div>

      <div className="section">
        <LensNote sector={sector} />
        <p className="small muted"><b>Vendors:</b> {data.vendors}</p>
        <Table
          head={["Trigger", "Direction", "Where", "What happens", "Priority"]}
          rows={data.points.map(([trigger, direction, where, what, priority]) => [
            trigger,
            <span className="nowrap">{direction}</span>,
            where,
            what,
            <Pill tone={priority === "High" ? "brand" : ""}>{priority}</Pill>
          ])}
        />
      </div>

      <Section title="Vendor map" intro="Where banking integration would most improve the end-to-end outcome.">
        <Table head={["Sector", "Category", "Example vendors", "Integration value"]} rows={VENDOR_MAP} />
      </Section>
    </section>
  );
}
