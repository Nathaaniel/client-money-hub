import { useState } from "react";
import { SECTORS, sectorLabel } from "../config.js";
import { SEGMENT_PAGE, SEGMENTS } from "../data/segments.js";
import { Callout, List, PageHead, Pill, Section, Table } from "../components/ui.jsx";

export default function Segments({ sector }) {
  const [segKey, setSegKey] = useState(() => (SEGMENTS.find(s => s.lens === sector) ?? SEGMENTS[0]).key);
  const s = SEGMENTS.find(x => x.key === segKey);

  return (
    <section className="panel">
      <PageHead {...SEGMENT_PAGE.head} />

      <Section title="Two axes" intro={SEGMENT_PAGE.axisIntro}>
        <Table head={["Segment", "Tier", "Fraud / AML risk", "Balance profile", "Operational complexity"]} rows={SEGMENT_PAGE.axisRows} />
      </Section>

      <Section title="The common ideal journey" intro="Every segment needs the same eight stages, with different emphasis.">
        <ol className="steps">
          {SEGMENT_PAGE.idealJourney.map(([title, text]) => (
            <li key={title}><b>{title}</b><span>{text}</span></li>
          ))}
        </ol>
      </Section>

      <Section title="Segment profiles" intro="Follows the sector selected in the header. Pick any segment to compare.">
        <div className="chips">
          {SECTORS.map(sec => {
            const segs = SEGMENTS.filter(x => x.lens === sec.key);
            if (!segs.length) return null;
            return (
              <span className="seg-group" key={sec.key}>
                <span className="small muted">{sec.label}:</span>
                {segs.map(x => (
                  <button
                    key={x.key}
                    type="button"
                    className={x.key === segKey ? "chip is-on" : "chip"}
                    aria-pressed={x.key === segKey}
                    onClick={() => setSegKey(x.key)}
                  >
                    {x.name}
                  </button>
                ))}
              </span>
            );
          })}
        </div>

        <div className="card section">
          <div className="toolbar">
            <h3 style={{ margin: 0 }}>{s.name}</h3>
            <span className="chips">
              <Pill tone="brand">{s.regime}</Pill>
              <Pill>Tier {s.tier}</Pill>
              <Pill>{sectorLabel(s.lens)}</Pill>
            </span>
          </div>
          <div className="profile">
            <div><h4>To comply</h4><List items={s.comply} /></div>
            <div className="grid" style={{ gap: 14 }}>
              <div><h4>Concerns</h4><p>{s.concerns}</p></div>
              <div><h4>Desires (hypothesis)</h4><p>{s.desires}</p></div>
              <div><h4>How a bank helps</h4><p>{s.helps}</p></div>
            </div>
            <div>
              <h4>How they pay</h4>
              <dl className="dl">
                <div><dt>Money in</dt><dd>{s.pay.in}</dd></div>
                <div><dt>Money out</dt><dd>{s.pay.out}</dd></div>
                <div><dt>Rails</dt><dd>{s.pay.rails}</dd></div>
                <div><dt>Controls</dt><dd>{s.pay.controls}</dd></div>
              </dl>
            </div>
          </div>
          {s.note && <Callout tone="warn">{s.note}</Callout>}
        </div>
      </Section>

      <Section title="What payment preferences mean for a bank" intro={SEGMENT_PAGE.paymentsIntro}>
        <div className="grid g3">
          {SEGMENT_PAGE.paymentImplications.map(([title, text], i) => (
            <div className="card" key={title}>
              <h4>{i + 1} · {title}</h4>
              <p className="small">{text}</p>
            </div>
          ))}
        </div>
      </Section>
    </section>
  );
}
