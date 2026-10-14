import { CONFIG, sectorLabel } from "../config.js";
import { HOME, PRIORITIES } from "../data/home.js";
import { Callout, PageHead, Pill, Section } from "../components/ui.jsx";
import Heatmap, { HeatLegend } from "../components/Heatmap.jsx";

export default function Home({ go }) {
  return (
    <section className="panel">
      <PageHead {...HOME.head} />

      <div className="hero-row">
        <div className="card hero">
          <h4>Ambition</h4>
          <p className="statement">{HOME.ambition}</p>
        </div>
        <div className="decision">
          <span className="k">Decision sought</span>
          <span className="v">{CONFIG.decision}</span>
          <span className="small">{CONFIG.decisionOwner} · {CONFIG.decisionDate}</span>
        </div>
      </div>

      <Section title="Why now">
        <div className="grid g3">
          {HOME.whyNow.map(w => (
            <div className="card" key={w.title}>
              <div className="toolbar">
                <b>{w.title}</b>
                <Pill tone={w.tone}>{w.status}</Pill>
              </div>
              <p className="small muted" style={{ marginTop: 6 }}>{w.text}</p>
            </div>
          ))}
        </div>
        <p className="small">
          <button type="button" className="linkbtn" onClick={() => go("regulation")}>See the full regulatory timeline</button>
        </p>
      </Section>

      <Section title="Where to play" intro={HOME.whereToPlayIntro}>
        <div className="grid g5">
          {PRIORITIES.map((p, i) => (
            <div className={i === 0 ? "card play first" : "card play"} key={p.sector}>
              <span className="rank">{i + 1}</span>
              <h3>{sectorLabel(p.sector)}</h3>
              <p>{p.why}</p>
              <p><b className="ink">Wedge:</b> {p.wedge}</p>
              <p><b className="ink">Risk:</b> {p.risk}</p>
              <button type="button" className="btn sm" onClick={() => go("journey", p.sector)}>
                Open {sectorLabel(p.sector)}
              </button>
            </div>
          ))}
        </div>
        <Callout tone="brand" title="Biggest strategic choice">{HOME.strategicChoice}</Callout>
      </Section>

      <div className="card section">
        <div className="toolbar">
          <h3 style={{ margin: 0 }}>How providers compare against the end state</h3>
          <HeatLegend />
        </div>
        <div style={{ overflowX: "auto" }}>
          <Heatmap />
        </div>
        <p className="small muted">
          {HOME.heatmapNote} Fill in the {CONFIG.bankName} row from internal data.{" "}
          <button type="button" className="linkbtn" onClick={() => go("scorecard")}>Open the scorecard</button>
        </p>
      </div>

      <Section title="Deep dives">
        <div className="grid g4">
          {HOME.deepDives.map(d => (
            <div className="card play" key={d.page}>
              <h3>{d.title}</h3>
              <p>{d.text}</p>
              <button type="button" className="btn sm" onClick={() => go(d.page)}>Open</button>
            </div>
          ))}
        </div>
      </Section>
    </section>
  );
}
