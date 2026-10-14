import { useState } from "react";
import { ASSURANCE, ASSURANCE_HEAD, BEYOND, BOUNDARY } from "../data/assurance.js";
import { Callout, LensNote, List, PageHead, Pill, Section, Table } from "../components/ui.jsx";

export default function Assurance({ sector }) {
  const data = ASSURANCE[sector];
  const [fixed, setFixed] = useState([]);
  const [pack, setPack] = useState(null);

  const isHealthy = i => data.controls[i][2] || fixed.includes(i);
  const healthyCount = data.controls.filter((_, i) => isHealthy(i)).length;
  const score = Math.round((healthyCount / data.controls.length) * 100);

  const generatePack = () => {
    const stamp = new Date().toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    const open = data.controls.length - healthyCount;
    setPack({ stamp, items: [...data.pack, `Open exceptions: ${open}`] });
  };

  return (
    <section className="panel">
      <PageHead {...ASSURANCE_HEAD} />
      <LensNote sector={sector} />

      <div className="grid g2">
        <div className="card section">
          <div className="health">
            <div>
              <div className="gauge">{score}%</div>
              <div className="small muted">controls healthy</div>
            </div>
            <p className="small muted" style={{ flex: 1, minWidth: 200, margin: 0 }}>
              Each control shows where its data comes from. Fix an exception to see the score update.
            </p>
          </div>
          <div>
            {data.controls.map(([label, source, , detail, fixLabel], i) => {
              const healthy = isHealthy(i);
              return (
                <div className="control" key={label}>
                  <div>
                    <div>{label}</div>
                    <div className="meta">{fixed.includes(i) ? "Resolved in this session" : detail} · Source: {source}</div>
                  </div>
                  <div className="act">
                    <Pill tone={healthy ? "ok" : "warn"}>{healthy ? "Healthy" : "Needs attention"}</Pill>
                    {!healthy && (
                      <button type="button" className="btn sm" onClick={() => setFixed(f => [...f, i])}>{fixLabel}</button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid" style={{ alignContent: "start" }}>
          <div className="card section">
            <div className="toolbar">
              <h3 style={{ margin: 0 }}>Evidence pack</h3>
              <button type="button" className="btn primary sm" onClick={generatePack}>Generate pack</button>
            </div>
            {pack ? (
              <div className="small">
                <p>Pack generated {pack.stamp}. Contents:</p>
                <List items={pack.items} />
              </div>
            ) : (
              <p className="small muted">Generates the contents of an auditor or regulator pack for this sector.</p>
            )}
          </div>
          <Callout title="Responsibility boundary">{BOUNDARY}</Callout>
        </div>
      </div>

      <Section title="Who supplies the data" intro="Vendors hold workflow data and the bank holds money data. The value is in joining them.">
        <Table head={["Vendor", "Provides", "Bank adds back"]} rows={data.vendors} />
      </Section>

      <Section title="Beyond banking">
        <div className="grid g3">
          {BEYOND.map(([title, text]) => (
            <div className="card" key={title}><h4>{title}</h4><p className="small">{text}</p></div>
          ))}
        </div>
      </Section>
    </section>
  );
}
