import { useCallback, useEffect, useState } from "react";
import { CONFIG } from "./config.js";
import { LOGO } from "./brand.js";
import { SELECTOR } from "./data/selector.js";
import { Chips, PageHead } from "./components/ui.jsx";
import Selector from "./pages/Selector.jsx";
import Journeys from "./pages/Journeys.jsx";

const VIEWS = [{ key: "selector", label: "Selector" }, { key: "journeys", label: "Journeys" }];
const viewFromHash = () => (window.location.hash.slice(1) === "journeys" ? "journeys" : "selector");

export default function App() {
  const [view, setView] = useState(viewFromHash);
  const [channel, setChannel] = useState("public");
  const [sector, setSector] = useState(CONFIG.defaultSector);

  // Opens a view (and optionally switches channel), keeping a shareable #view link.
  const go = useCallback((nextView, nextChannel) => {
    if (nextChannel) setChannel(nextChannel);
    setView(nextView);
    try { window.history.replaceState(null, "", `#${nextView}`); } catch { /* not available in some viewers */ }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const onHashChange = () => setView(viewFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const current = SELECTOR.channels.find(c => c.key === channel);

  return (
    <>
      <header className="masthead">
        <div className="wrap">
          {LOGO ? <img className="logo-img" src={LOGO} alt={CONFIG.bankName} /> : <div className="logo" aria-hidden="true">Logo</div>}
          <div className="titles">
            <h1>{CONFIG.productName}</h1>
            <p>Prototype of {CONFIG.bankName}'s client money account selector, in three versions</p>
          </div>
          <span className="proto">Prototype · illustrative data</span>
          {CONFIG.classification && <span className="classification">{CONFIG.classification}</span>}
        </div>
      </header>

      <nav className="tabbar" aria-label="Views">
        <div className="wrap navrow">
          <div className="groups">
            {VIEWS.map(v => (
              <button key={v.key} type="button" className="tab" aria-current={v.key === view ? "page" : undefined} onClick={() => go(v.key)}>
                {v.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="wrap">
        {view === "selector" ? (
          <section className="panel sel-page">
            <PageHead eyebrow={current.label} title={SELECTOR.head.title} keyMessage={current.keyMessage}>
              <p>Illustrative logic, not legal advice.</p>
            </PageHead>
            <div className="channel-bar no-print">
              <span className="channel-label">Version</span>
              <Chips items={SELECTOR.channels} value={channel} onChange={setChannel} />
              <span className="muted small">{current.who}</span>
            </div>
            <Selector channel={channel} sector={sector} setSector={setSector} go={go} />
          </section>
        ) : (
          <Journeys onTry={key => go("selector", key)} />
        )}
      </main>

      <footer>
        <div className="wrap">
          {CONFIG.productName} · {CONFIG.footer}
          {CONFIG.classification && <> · {CONFIG.classification}</>}
        </div>
      </footer>
    </>
  );
}
