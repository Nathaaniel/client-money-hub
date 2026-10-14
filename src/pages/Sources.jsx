import { CONFIG } from "../config.js";
import { INTERNAL } from "../data/internal.js";
import { CAVEATS, CHANGES, SOURCE_LIST, SOURCES_HEAD } from "../data/sources.js";
import { isPlaceholder } from "../logic/format.js";
import { List, PageHead, Pill, Section, Table } from "../components/ui.jsx";

export default function Sources() {
  return (
    <section className="panel">
      <PageHead {...SOURCES_HEAD} />

      <Section title="Our position today" intro="Internal details to confirm. Edit them in src/data/internal.js.">
        <Table
          head={["Topic", "Our position", "Source"]}
          rows={INTERNAL.map(([topic, position, source]) => [
            topic,
            isPlaceholder(position) ? <Pill tone="warn">{position}</Pill> : position,
            <span className="muted">{source}</span>
          ])}
        />
      </Section>

      <div className="grid g2">
        {CONFIG.showChangeHistory && (
          <div className="card section">
            <h3>What changed</h3>
            {CHANGES.map(c => (
              <div key={c.title}>
                <h4>{c.title}</h4>
                <List items={c.items} />
              </div>
            ))}
          </div>
        )}
        <div className="card section">
          <h3>Caveats</h3>
          <List items={CAVEATS} />
        </div>
      </div>

      <Section title="Sources referenced">
        <Table plain head={["Type", "Sources"]} rows={SOURCE_LIST} />
      </Section>
    </section>
  );
}
