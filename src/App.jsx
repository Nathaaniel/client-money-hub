import { useCallback, useEffect, useState } from "react";
import { CONFIG, PAGE_IDS, SECTORS, STRUCTURE } from "./config.js";
import { LOGO } from "./brand.js";
import { PAGES } from "./pages/index.js";

const pageFromHash = () => {
  const id = window.location.hash.slice(1);
  return PAGE_IDS.includes(id) ? id : "home";
};
const groupOf = pageId => STRUCTURE.find(g => g.pages.some(p => p.id === pageId));

export default function App() {
  const [page, setPage] = useState(pageFromHash);
  const [sector, setSector] = useState(CONFIG.defaultSector);
  const [lastPage, setLastPage] = useState({}); // last page viewed in each section

  // Opens a page (and optionally switches sector), keeping a shareable #page link.
  const go = useCallback((pageId, newSector) => {
    if (newSector) setSector(newSector);
    setPage(pageId);
    try { window.history.replaceState(null, "", `#${pageId}`); } catch { /* not available in some viewers */ }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const onHashChange = () => setPage(pageFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const group = groupOf(page);
  useEffect(() => {
    setLastPage(prev => ({ ...prev, [group.key]: page }));
  }, [group.key, page]);

  const Page = PAGES[page];

  return (
    <>
      <header className="masthead">
        <div className="wrap">
          {LOGO ? <img className="logo-img" src={LOGO} alt={CONFIG.bankName} /> : <div className="logo" aria-hidden="true">Logo</div>}
          <div className="titles">
            <h1>{CONFIG.productName}</h1>
            <p>Target end state and prototype for {CONFIG.bankName}'s client money proposition</p>
          </div>
          <span className="proto">Prototype · illustrative data</span>
          {CONFIG.classification && <span className="classification">{CONFIG.classification}</span>}
        </div>
      </header>

      <nav className="tabbar" aria-label="Sections">
        <div className="wrap navrow">
          <div className="groups">
            {STRUCTURE.map(g => (
              <button
                key={g.key}
                type="button"
                className="tab"
                aria-current={g.key === group.key ? "page" : undefined}
                onClick={() => go(lastPage[g.key] ?? g.pages[0].id)}
              >
                {g.label}
              </button>
            ))}
          </div>
          <div className="lens">
            <label htmlFor="lens">Sector</label>
            <select id="lens" value={sector} onChange={e => setSector(e.target.value)}>
              {SECTORS.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
            </select>
          </div>
        </div>
        {group.pages.length > 1 && (
          <div className="subnav">
            <div className="wrap">
              {group.pages.map(p => (
                <button
                  key={p.id}
                  type="button"
                  className="subtab"
                  aria-current={p.id === page ? "page" : undefined}
                  onClick={() => go(p.id)}
                >
                  {p.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="wrap">
        {/* Keyed by page and sector, so each page starts fresh when either changes. */}
        <Page key={`${page}-${sector}`} sector={sector} go={go} />
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
